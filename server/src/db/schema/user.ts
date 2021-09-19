
import mongoose from 'mongoose';

export interface User {
  createdAt: number,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
};

export const userSchema = new mongoose.Schema<User>({
  createdAt:  {type: Number, required: true},
  email:      {type: String, required: true},
  username:   {type: String, required: true},
  firstName:  {type: String, required: true},
  lastName:   {type: String, required: true},
});