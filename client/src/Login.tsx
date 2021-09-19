import {useState} from 'react';
import {Box, Typography, } from '@mui/material';

export const LoginProvider = ({children}) => {
  const [jwt, setJwt] = useState<string|undefined>(undefined);

  return <>{children}</>;
};
