import {useQuery, useMutation, gql} from "@apollo/client";
import {CreateUserArgs, UserRsp} from './gql-interface';

const CREATE_USER = gql`
  mutation Mutation($args:CreateUserArgs) {
    createUser(args:$args) {
      user {_id email username createdAt},
      token,
    }
  }
`;
export const useCreateUser = () => useMutation<UserRsp, {args: CreateUserArgs}>(CREATE_USER);

export const LOGIN_USER = gql`
  mutation LoginUserMutation($login:LoginInput!) {
    loginUser(login:$login) {
      user {_id email username createdAt}
      token
    }
  }
`;

export {useQuery, useMutation};