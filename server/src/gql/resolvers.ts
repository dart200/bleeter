import {Users,Posts} from '../db/connect';

/**
* GraphQL Resolvers 
**/

export const resolvers = {
  Query:{
    getUsers: async (root) => Users.find().exec(),
    findAPost: (root,{id}) => Posts.findOne({_id:id}).exec(),
  },
  Mutation:{
    createUser: async (root, {user}) => {
      const oldUser = await Users.findOne({$or: [
        {email: user.email},
        {username: user.username},
      ]});
      if (oldUser?.email === user.email)
        throw Error("Email already exists. Please login instead.");
      if (oldUser?.username === user.username)
        throw Error("Username in use. Please choose another");
      
      const newFriend = new Users({
        ...user,
        createdAt: Date.now(),
      });
      await newFriend.save();
      return newFriend;
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