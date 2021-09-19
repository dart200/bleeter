import mongoose from 'mongoose';

export interface Post {
  _id: string,
  userId: string,
  at: number,
  title: string,
  text: string,
  parent?: string,
};

export const postSchema = new mongoose.Schema({
  at:     {type: Number, required: true},
  userId: {type: String, required: true},
  title:  {type: String, required: true},
  text:   {type: String, required: true},
  parent: {type: String},
});
