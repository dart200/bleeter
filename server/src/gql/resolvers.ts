import {Users,Posts} from '../db/connect';
import {CreateUserArgs, UserRsp, User, LoginUserArgs} from './gql-interface';
import {getPwdHash, cmpPwd, genJwt, verifyJwt} from '../pwd';
import * as log from '../log';

export const resolvers = {
  Query:{
    getUsers: async (root) => Users.find().exec(),
    getPosts: async (root) => Posts.find().sort({at: 'desc'}).exec(),
    findAPost: (root,{id}) => Posts.findOne({_id:id}).exec(),
  },
  Mutation:{
    createUser: async (root, {args}: {args: CreateUserArgs}): Promise<UserRsp> => {
      const oldFriend = await Users.findOne({$or: [
        {email: args.email},
        {username: args.username},
      ]});
      if (oldFriend?.email === args.email)
        throw Error("Email already exists. Please login instead.");
      if (oldFriend?.username === args.username)
        throw Error("Username in use. Please choose another.");
      
      const newFriend = new Users({
        ...args,
        createdAt: Date.now(),
      });

      const {pwdHash} = await getPwdHash(args.password);
      newFriend.pwdHash = pwdHash;

      const token = await genJwt(newFriend);
      newFriend.token = token;

      await newFriend.save();
      return {user: newFriend, token};
    },

    loginUser: async (root, {args}: {args: LoginUserArgs}): Promise<UserRsp> => {
      const errMsg = 'Username/Password not found';

      const user = await Users.findOne({$or: [
        ...args.email ? [{email: args.email}] : [],
        ...args.username ? [{username: args.username}] : [],
      ]});
      if (!user)
        throw Error(errMsg);

      const pwdSuccess = await cmpPwd(args.password, user);
      if (!pwdSuccess)
        throw Error(errMsg);

      const token = await genJwt(user);
      user.token = token;
      await user.save();

      return {user, token};
    },

    changeUsername: async (root, {token, username}): Promise<User> => {
      const errMsg = 'Invalid authentication';

      const {id} = await verifyJwt(token)
        .catch(err => {
          log.err(err);
          throw Error(errMsg);
        });

      const user = await Users.findById(id);
      if (!user)
        throw Error(errMsg);
      if (user.token !== token)
        throw Error(errMsg);

      user.username = username;
      await user.save();

      return user;
    },

    createPost: async (root,{post})=>{
      const newPost = new Posts({
        ...post,
        at: Date.now(),
      });      
      await newPost.save();
      return newPost;
    },
  },
};