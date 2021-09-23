import {useQuery, useMutation as apolloUseMutation, DocumentNode, gql, MutationTuple, MutationResult} from "@apollo/client";
import {CreateUserArgs, LoginUserArgs, UserRsp} from './gql-interface';

function useMutation<RspType, ArgType>(
  statement: DocumentNode,
  funcName: string,
) {
  const [func, rsp] = apolloUseMutation<RspType, {args: ArgType}>(statement);

  return [
    (args: ArgType) => func({variables: {args}})
      .catch(err => {
        console.error(err);
        console.log({err});
      }),
    {
      ...rsp,
      // unwrap data object to Rsp Type
      ...rsp.data && {data: rsp.data[funcName]}
    } as typeof rsp,
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

export {useQuery, useMutation};