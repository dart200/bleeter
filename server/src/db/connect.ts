import mongoose from 'mongoose';
import {DB_STRING} from '../config';
import {User, userSchema} from './schema/user';
import {Post, postSchema} from './schema/post';

/** Mongoose Connection **/
mongoose.connect(DB_STRING);

const db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Users = mongoose.model<User>('users', userSchema);
const Posts = mongoose.model<Post>('posts', postSchema);

export {Users, Posts};
