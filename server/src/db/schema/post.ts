import mongoose from 'mongoose';

export interface Post {
  _id: string,
  userId: string,
  at: number,
  text?: string,
  replyTo?: string[],
  retweet?: string,
};

export const postSchema = new mongoose.Schema({
  at:     {type: Number, required: true},
  userId: {type: String, required: true},
  text:   {type: String},
  replyTo: [{type: String}],
  retweet: {type: String},
});
