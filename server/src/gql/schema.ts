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
		text:String
		replyTo:[ID]
		retweet: ID
	}

	type GetPostsRsp {
		# posts filtered for current query
		posts:[Post],
		# retweet sources
		retweets:[Post],
		# full list of users
		users:[User],
	}

	type Query {
		getUsers:[User]
		# general get posts query:
		#  @param postId - get that post and any replies
		#  @param username - get all posts for user's profile
		#  @param - response will not include logged in user's posts for home page
		getPosts(token: ID, username: ID, threadId: ID):GetPostsRsp
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
		retweet: ID,
	}

	type Mutation{
		createUser(args:CreateUserArgs!): UserRsp
    loginUser(args:LoginUserArgs!): UserRsp
		changeUsername(token:ID, username: String): User
		createPost(args:CreatePostArgs!): Post
	}
`;