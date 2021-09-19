import mongoose from 'mongoose';

export interface User {
  _id: string,
  createdAt: number,
  email: string,
  username: string,
  pwdHash: string,
  token: string,
};

export const userSchema = new mongoose.Schema<User>({
  createdAt:  {type: Number, required: true},
  email:      {type: String, required: true},
  username:   {type: String, required: true},
  pwdHash:    {type: String, required: true},
  token:      {type: String, required: true},
});
