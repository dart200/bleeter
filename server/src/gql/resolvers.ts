import {Users,Posts} from '../db/connect';

/**
* GraphQL Resolvers 
**/

export const resolvers = {
  Query:{
    getUsers: async (root) => Users.find().exec(),
    findAPost:(root,{id}) => Posts.findOne({_id:id}).exec(),
  },
  Mutation:{
    createUser: async (root, {user}) => {
      console.log(user);
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