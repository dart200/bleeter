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

  type UserRsp {
    token: ID
    user: User
  }

	input CreateUserArgs {
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
		createUser(args: CreateUserArgs): UserRsp
    loginUser(login:LoginInput!): UserRsp
		changeUsername(token:ID, username: String): User
		createPost(post:PostInput): Post
	}
`;