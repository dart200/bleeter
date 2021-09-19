import mongoose from 'mongoose';

export const postSchema = new mongoose.Schema({
  at:     {type: Number},
  title:  {type: String},
  text:   {type: String},
  parent: {type: String},
});