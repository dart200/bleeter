import {gql} from 'apollo-server-express';

export const typeDefs = gql`
	type User {
		_id:ID
		email: String
		username:String
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
		email: String!
		username:String!
    password: String!
	}

  input LoginInput {
    email: String
    username: String
    password: String!
  }

	type Query {
		getUsers:[User]
		findAPost(id:ID): Post
	}

  type CurUser {
    user: User
    token: ID
  }

	type Mutation{
		createUser(user:UserInput): CurUser
    loginUser(login:LoginInput!): CurUser
		changeUsername(token:ID, username: String): User
		createPost(post:PostInput): Post
	}
`;