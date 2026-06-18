import jwt from 'jsonwebtoken';
import {env} from '../../src/config/env';
import {IUser} from "../modules/user/user.interface"
export const generateAccessToken = (user: IUser) => {

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};




export const generateRefreshToken = (user: IUser) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};