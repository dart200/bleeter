import mongoose from 'mongoose';

export interface Post {
  at: number,
  title: string,
  text: string,
  parent?: string,
};

export const postSchema = new mongoose.Schema({
  at:     {type: Number, required: true},
  title:  {type: String, required: true},
  text:   {type: String, required: true},
  parent: {type: String},
});