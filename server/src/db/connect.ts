import mongoose from 'mongoose';
import {environment} from '../config/app';
import {User, userSchema} from './schema/user';
import {Post, postSchema} from './schema/post';
const env = process.env.NODE_ENV || "development";

/** Mongoose Connection **/
mongoose.connect(environment[env].dbString);

const db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Users = mongoose.model<User>('users', userSchema);
const Posts = mongoose.model<Post>('posts', postSchema);

export {Users, Posts};
