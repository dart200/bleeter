
import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email:      {type: String},
  userName:   {type: String},
  firstName:  {type: String},
  lastName:   {type: String},
  createdAt:  {type: Number},
});