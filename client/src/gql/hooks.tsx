import {useQuery, useMutation as apolloUseMutation, DocumentNode, gql} from "@apollo/client";
import {CreateUserArgs, LoginUserArgs, UserRsp, Post, CreatePostArgs} from './gql-interface';

function useMutation<RspType, ArgType>(
  statement: DocumentNode,
  funcName: string,
) {
  const [func, rsp] = apolloUseMutation<RspType, {args: ArgType}>(statement);
  if (rsp.data) rsp.data = rsp.data[funcName];

  return [
    (args: ArgType) => func({variables: {args}})
      .catch(err => {
        console.error(err);
        console.log({err});
      }),
    rsp,
  ] as const
}

const CREATE_USER = gql`
  mutation Mutation($args:CreateUserArgs!) {
    createUser(args:$args) {
      user {_id email name username createdAt},
      token,
    }
  }
`;
export const useCreateUser = () => useMutation<UserRsp, CreateUserArgs>(CREATE_USER, 'createUser');

export const LOGIN_USER = gql`
  mutation LoginUserMutation($args:LoginUserArgs!) {
    loginUser(args:$args) {
      user {_id email name username createdAt}
      token
    }
  }
`;
export const useLoginUser = () => useMutation<UserRsp, LoginUserArgs>(LOGIN_USER, 'loginUser');

const CREATE_POST = gql`
  mutation Mutation($args:CreateUserArgs!) {
    createPost(args:$args) {
      _id at userID text replyTo,
    }
  }
`;
export const useCreatePost = () => useMutation<Post, CreatePostArgs>(CREATE_POST ,'createPost')

export {useQuery, useMutation};
