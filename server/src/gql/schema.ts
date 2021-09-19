import {gql} from 'apollo-server-express';

export const typeDefs = gql`
	type User{
		id:ID
		firstName:String
		lastName:String
		userName:String
		email: String
		createdAt: Float
	}

	type Contact{
  	firstName:String
		lastName:String
	}

	type Post {
		id:ID
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

	enum Gender{
		MALE
		FEMALE
		OTHER
	}

	input PostInput {
		id:ID
		at: Float
		year:Int
		rating:Rating
	}

	input UserInput {
		id:ID
		firstName:String
		lastName:String
		userName:String
		email: String
	}

	input ContactInput {
		firstName:String
		lastName:String
	}

	type Query{
		getUsers:[User]
		findAPost(id:ID):Post
	}

	type Mutation{
		createUser(user:UserInput):User
		createPost(post:PostInput):Post
	}
`;