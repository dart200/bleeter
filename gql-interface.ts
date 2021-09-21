export interface User { 
  _id: string,
  email: string,
  username: string,
  createdAt: Number,
};

export interface CreateUserArgs {
  name: string,
  email: string,
  username: string,
  password: string,
};

export interface UserRsp {
  token: string,
  user: User,
};