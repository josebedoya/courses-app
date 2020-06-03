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
          const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10d' });
          res.json({ token });
        } else {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
      })
    } catch (err) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

  };
}

export default AuthController;
