export interface User { 
  _id: string,
  email: string,
  name: string,
  username: string,
  createdAt: Number,
};

export interface CreateUserArgs {
  name: string,
  email: string,
  username: string,
  password: string,
};

export type LoginUserArgs = {
  email?: string,
  username?: string,
  password: string,
};

export interface UserRsp {
  token: string,
  user: User,
};

export interface Post {
  _id: string,
  at: number,
  userID: string,
  text: string,
  replyTo?: string,
};

export interface CreatePostArgs {
  token: string,
  text: string,
};
