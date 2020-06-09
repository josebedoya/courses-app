import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token: string = <string>req.headers['x-auth-token'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const newToken: string = jwt.sign(jwtPayload, config.jwtSecret);
  res.setHeader('token', newToken);
  next();
};
