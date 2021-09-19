import {gql} from 'apollo-server-express';

export const typeDefs = gql`
	type User {
		_id:ID
		email: String
		userName:String
		firstName:String
		lastName:String
		createdAt: Float
	}

	type Post {
		_id:ID
		at: Float
		title:String
		text:String
		parent:ID!
	}

	enum Rating{
		ONE
		TWO
		THREE
	}

	enum Gender {
		MALE
		FEMALE
		OTHER
	}

	input PostInput {
		title: String,
    text: String,
    parent: ID,
	}

	input UserInput {
		firstName:String
		lastName:String
		userName:String
		email: String
	}

	type Query {
		getUsers:[User]
		findAPost(id:ID):Post
	}

	type Mutation{
		createUser(user:UserInput):User
		createPost(post:PostInput):Post
	}
`;