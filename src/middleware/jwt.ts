require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token: string = <string>req.headers['authorization'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const newToken: string = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET);
  res.setHeader('token', newToken);
  next();
};
