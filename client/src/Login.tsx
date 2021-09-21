import {useState, useContext, createContext, useEffect} from 'react';
import {Box, Button, ButtonProps} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Portal} from '@mui/core';
import {useCreateUser, useLoginUser} from './gql/hooks';
import {User} from './gql/gql-interface';

import LoginForm from './forms/LoginForm'

interface LoginContextType {
  jwt?: string;
  user?: User;

  LoginUserButton: (props: {sx?: ButtonProps['sx']}) => JSX.Element;
  CreateUserButton: (props: {sx?: ButtonProps['sx']}) => JSX.Element;
  LogoutUserButton: (props: {sx?: ButtonProps['sx']}) => JSX.Element;
};

const LoginContext = createContext<LoginContextType>({} as any);

export const useLoginContext = () =>
  useContext(LoginContext);

export const LoginProvider = ({children}) => {
  const [jwt, setJwt] = useState<string|undefined>(undefined);
  const [user, setUser] = useState<User|undefined>(undefined);

  const [loginFormOpen, setLoginFormOpen] = useState(false)

  const [loginUser, loginOpState] = useLoginUser();;

  const LoginUserButton = (props) => {
    return (
      <LoadingButton
        onClick={() => setLoginFormOpen(true)}
        sx={props.sx}
        variant="outlined">
        Login
      </LoadingButton>
    );
  };
  const CreateUserButton = (props) => {
    const [createUser, {data, loading, error}] = useCreateUser();
    return (
      <LoadingButton
        onClick={() => {
          console.log('create user');
          createUser({
            username: "dart200",
            name: "Nick",
            email: "dart200@gmail.com",
            password: "weak-password",
          })
        }}
        loading={loading}
        sx={props.sx}
        variant="outlined">
        Sign Up
      </LoadingButton>
    );
  };
  const LogoutUserButton = (props) => (
    <Button sx={props.sx} variant="outlined">Logout</Button>
  );

  return <>
    <LoginContext.Provider value={{jwt, user, LoginUserButton, CreateUserButton, LogoutUserButton}}>
      {children}
    </LoginContext.Provider>
    <LoginForm 
      open={loginFormOpen}
      onClose={() => setLoginFormOpen(false)}
      onSubmit={(email, password) => loginUser({email, password})}
      submitLoading={loginOpState.loading}
    />
  </>;
};
