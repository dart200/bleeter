import {
  useQuery as apolloUseQuery,
  useMutation as apolloUseMutation,
  DocumentNode,
  gql,
} from "@apollo/client";
import { useEffect } from "react";
import {
  GetPostsArgs, GetPostsRsp,
  CreateUserArgs, LoginUserArgs, UserRsp,
  CreatePostArgs, Post,
} from './gql-interface';

function genUseQuery<RspType, ArgType>(
  statement: DocumentNode,
  funcName: string,
) {
  return (variables: ArgType) => {
    const {data, loading, error} = apolloUseQuery<RspType, ArgType>(
      statement,
      {...variables && {variables}}
    );
  
    useEffect(() => {
      if (error)
        console.log({error});
    }, [error]);

    return {
      loading,
      data: data ? data[funcName] as RspType : undefined,
      error
    } as const;
  };
};

function genUseMutation<RspType, ArgType>(
  statement: DocumentNode,
  funcName: string,
) {
  return () => {
    const [func, rsp] = apolloUseMutation<RspType, {args: ArgType}>(statement, {refetchQueries: [GET_POSTS]});
    if (rsp.data) rsp.data = rsp.data[funcName];
  
    return [
      (args: ArgType) => func({variables: {args}})
        .catch(err => {
          console.error(err);
          console.log({err});
        }),
      rsp,
    ] as const;
  };
};

const GET_POSTS = gql`
  query Query($token: ID, $username: ID, $threadId: ID) {
    getPosts(token:$token, username:$username, threadId:$threadId) {
      posts {_id at userId text replyTo retweet}
      retweets {_id at userId text replyTo retweet}
      users {_id name username}
    }
  }
`
export const useGetPosts = genUseQuery<GetPostsRsp, GetPostsArgs>(GET_POSTS, 'getPosts');

const CREATE_USER = gql`
  mutation Mutation($args:CreateUserArgs!) {
    createUser(args:$args) {
      user {_id email name username createdAt},
      token,
    }
  }
`;
export const useCreateUser = genUseMutation<UserRsp, CreateUserArgs>(CREATE_USER, 'createUser');

export const LOGIN_USER = gql`
  mutation LoginUserMutation($args:LoginUserArgs!) {
    loginUser(args:$args) {
      user {_id email name username createdAt}
      token
    }
  }
`;
export const useLoginUser = genUseMutation<UserRsp, LoginUserArgs>(LOGIN_USER, 'loginUser');

const CREATE_POST = gql`
  mutation Mutation($args:CreatePostArgs!) {
    createPost(args:$args) {
      _id at userId text replyTo, retweet,
    }
  }
`;
export const useCreatePost = genUseMutation<Post, CreatePostArgs>(CREATE_POST ,'createPost')
