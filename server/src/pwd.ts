import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_KEY} from './config';
import {User} from './db/schema/user';

export const getPwdHash = async (pwd: string) => {
  const pwdSalt = await bcrypt.genSalt(10);
  const pwdHash = await bcrypt.hash(pwd,pwdSalt);
  return {pwdHash};
};

export const cmpPwd = async (pwd: string, user: User) =>
  bcrypt.compare(pwd, user.pwdHash);

interface JwtPayload {id: string};
export const genJwt = async (user: User) => 
  jwt.sign(
    {id: user._id},
    JWT_KEY,
    {expiresIn: "30d"}
  );

export const verifyJwt = async (token: string) => {
  return jwt.verify(token, JWT_KEY) as JwtPayload
};