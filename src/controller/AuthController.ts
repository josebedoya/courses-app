require('dotenv').config();
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import config from '../config/config';

class AuthController {
  static signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: 'Email & password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });

      user.checkPassword(password).then(result => {
        if (result) {
          const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10h' })
          res.json({ accessToken, refreshToken });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      })
    } catch (err) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

  };

  static refreshToken = async(req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(403).json({ message: 'User not authenticated' });
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'User not authenticated' });
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        res.json({ accessToken });
      });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
}

export default AuthController;
