import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utilits/catchAsync';

import { AuthRequest } from '../types/authRequest'; // Import the custom request type

const auth = () => {
  return catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;


    // if (!token) {
    //   throw new Error('You are not authorized!');
    // }

    // const decoded = jwt.verify(token, "secret") as JwtPayload;
    // const { role, email } = decoded;

    // const user = await User.findOne({ email });

    // if (!user) {
    //   throw new Error('This user is not found!');
    // }

    // if (user.userStatus === 'inactive') {
    //   throw new Error('This user is blocked!');
    // }

    // if (requiredRoles.length && !requiredRoles.includes(role)) {
    //   throw new Error('You are not authorized');
    // }

    // req.user = decoded; // Now TypeScript will recognize `req.user`
    next();
  });
};

export default auth;