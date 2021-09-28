export interface PublicUser {
  _id: string,
  name: string,
  username: string,
  createdAt: Number,
}

export interface User extends PublicUser { 
  email: string,
};

export interface UserRsp {
  token: string,
  user: User,
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

export interface Post {
  _id: string,
  at: number,
  userId: string,
  text?: string,
  replyTo?: string[],
  retweet?: string,
};

export interface CreatePostArgs {
  token: string,
  text?: string,
  replyTo?: string[],
  retweet?: string,
};

export interface GetPostsArgs {
  token?: string,
  username?: string,
  threadId?: string,
};

export interface GetPostsRsp {
  posts: Post[],
  users: User[],
  retweets: Post[],
};
