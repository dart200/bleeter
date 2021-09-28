import {gql} from 'apollo-server-express';

export const typeDefs = gql`
	type User {
		_id:ID
		email: String
		name: String
		username:String
		createdAt: Float
	}

	type Post {
		_id:ID!
		at: Float!
		userId: ID!
		text:String!
		replyTo:[ID]
		replies:[ID]
	}

	type GetPostsRsp {
		posts:[Post],
		users:[User],
	}

	type Query {
		getUsers:[User]
		# if postId is set, get that post and any replies
		# if username is set, get all posts for user's profile
		# if token is set, and neither username or postId is set, response
		#		will not include logged in user's posts
		getPosts(token: ID, username: ID, postId: ID):GetPostsRsp
	}

	input CreateUserArgs {
		name: String!
		email: String!
		username:String!
    password: String!
	}

  input LoginUserArgs {
    email: String
    username: String
    password: String!
  }

	extend type User {
		email: String
	}

	type UserRsp {
    token: ID
    user: User
  }

	input CreatePostArgs {
		token: ID!,
    text: String!,
    replyTo: [ID],
	}

	type Mutation{
		createUser(args:CreateUserArgs!): UserRsp
    loginUser(args:LoginUserArgs!): UserRsp
		changeUsername(token:ID, username: String): User
		createPost(args:CreatePostArgs!): Post
	}
`;