import {Users,Posts} from '../db/connect';
import {
  User, Post,
  GetPostsArgs, GetPostsRsp,
  CreateUserArgs, LoginUserArgs, UserRsp, CreatePostArgs} from './gql-interface';
import {getPwdHash, cmpPwd, genJwt, verifyJwt} from '../pwd';
import * as log from '../log';

export const resolvers = {
  Query:{
    getUsers: async (root): Promise<User[]> => Users.find().exec(),
    getPosts: async (root, {token, username, threadId}: GetPostsArgs): Promise<GetPostsRsp> => {
      // if set, will filter out posts by current user
      const curUserId = !username && !threadId && token 
        && await verifyJwt(token).then(ret => ret.id);

      // if set, will filter posts for a users profile
      const profileUser = !threadId && username && await Users.findOne({username});

      const [posts, users] = await Promise.all([
        Posts.find({
          ...curUserId && {
            userId: {$ne: curUserId},
          },
          ...profileUser && {
            userId: profileUser._id,
          },
          ...threadId ? {$or: [
            {_id: threadId},
            {replyTo: threadId},
          ]} : {
            replyTo: {$size: 0},
          },
        })
          .sort({at: threadId ? 'asc' : 'desc'})
          .exec(),
        Users.find().exec(),
      ]);

      // for any found posts, lookup retweet sources
      const retweets = (await Promise.all(
        posts.filter(p => p.retweet).map(p => Posts.findById(p.retweet))
      )).filter(ret => !!ret) as Post[];

      return {retweets, posts, users}
    },
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

    createPost: async (root,{args: {token, text, replyTo, retweet}}: {args: CreatePostArgs})=>{
      const userId = await verifyJwt(token).then(ret => ret.id)

      if (!text && !retweet)
        throw Error('Missing content!');

      console.log({text, replyTo, retweet})

      const newPost = new Posts({
        at: Date.now(),
        userId,
        text,
        replyTo,
        retweet, 
      });      
      await newPost.save();
      return newPost;
    },
  },
};