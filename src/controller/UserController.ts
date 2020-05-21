import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';

export class UserController {
  static getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await getRepository(User).find();
      return res.json(users);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user = await getRepository(User).findOne(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  static create = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    // validate
    const errors = await validate(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await getRepository(User).save(user);
    } catch (err) {
      return res.status(409).json({ message: 'User already exists' });
    }

    //
    res.json('User Created');
  };
}
