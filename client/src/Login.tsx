import {useState, useContext, createContext, useEffect} from 'react';
import {Box, Button, ButtonProps} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useCreateUser, useLoginUser} from './gql/hooks';
import {User} from './gql/gql-interface';

import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';

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

  const [loginFormOpen, setLoginFormOpen] = useState(false);
  const [signupFormOpen, setSignupFormOpen] = useState(false);

  const onSuccess = (user, token) => {
    setUser(user);
    setJwt(token);
    setSignupFormOpen(false);
    setLoginFormOpen(false);
  };

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
    return (
      <LoadingButton
        onClick={() => setSignupFormOpen(true)}
        sx={props.sx}
        variant="outlined">
        Sign Up
      </LoadingButton>
    );
  };
  const LogoutUserButton = (props) => (
    <Button
      sx={props.sx}
      variant="outlined"
      onClick={() => {
        setUser(undefined);
        setJwt(undefined);
        console.log("omg");
      }}>
      Logout
    </Button>
  );

  return <>
    <LoginContext.Provider value={{jwt, user, LoginUserButton, CreateUserButton, LogoutUserButton}}>
      {children}
    </LoginContext.Provider>
    <LoginForm 
      open={loginFormOpen}
      onClose={() => setLoginFormOpen(false)}
      onSuccess={onSuccess}
    />
    <SignupForm 
      open={signupFormOpen}
      onClose={() => setSignupFormOpen(false)}
      onSuccess={onSuccess}
    />
  </>;
};
