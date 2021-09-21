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

	type Query {
		getUsers:[User]
		findAPost(id:ID): Post
		getPosts:[Post]
	}

  type CurUser {
    token: ID
    user: User
  }

	input UserInput {
		name: String!
		email: String!
		username:String!
    password: String!
	}

  input LoginInput {
    email: String
    username: String
    password: String!
  }

	input PostInput {
		title: String,
    text: String,
    parent: ID,
	}

	type Mutation{
		createUser(user:UserInput): CurUser
    loginUser(login:LoginInput!): CurUser
		changeUsername(token:ID, username: String): User
		createPost(post:PostInput): Post
	}
`;