import mongoose from 'mongoose';
import {environment} from '../config/app';
import {userSchema} from './schema/user';
import {postSchema} from './schema/post';
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
**/

mongoose.connect(environment[env].dbString);

const db = mongoose.connection;
db.on('error', () => {
    console.error("Error while connecting to DB");
});

const Users = mongoose.model('Users', userSchema);
const Posts = mongoose.model('Posts', postSchema);

export {Users, Posts};
