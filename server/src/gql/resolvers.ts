import {Users,Posts} from '../db/connect';

/**
* GraphQL Resolvers 
**/

export const resolvers={
  Query:{
    getUsers:(root)=>{
      return new Promise((resolve,reject) => {
        Users.find((err,friends) => {
          if(err) reject(err);
          else resolve(friends);
        });
      });
    },
    findAPost:(root,{id}) => {
      return new Promise((resolve,reject) => {
        Posts.findOne({_id:id},(err,post) => {
          if(err) reject(err);
          else resolve(post);
        });
      });
    },
  },
  Mutation:{
    createUser: (root, {user}) => {
      const newFriend = new Users({
        id: user.userName,
        firstName : user.firstName,
        lastName : user.lastName,
        gender : user.gender,
        language : user.language,
        age : user.age,
        email : user.email,
        contacts:user.contacts
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve,reject) => {
        newFriend.save(err => {
          if(err) reject(err);
          else resolve(newFriend);
        });
      });
    },
    createPost:(root,{post})=>{
      const newSeries = new Posts({
        title:post.title,
        year:post.year,
        text:post.rating
      });
      
      newSeries.id = post._id;
      
      return new Promise((resolve,reject) => {
        newSeries.save(err => {
          if(err) reject(err);
          resolve(newSeries);
        });
      });
    },
  },
};