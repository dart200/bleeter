import {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {Box, Stack, Divider, Typography, Link as MuiLink} from '@mui/material';
import {Link} from 'react-router-dom';

import {useLoginContext} from '../login';
import NewBleetForm from '../forms/NewBleetForm';
import BleeterLogoBar from '../image/Bleeter-Logo.png';

const UserBar = () => {
  const {user, LoginUserButton, CreateUserButton, LogoutUserButton} = useLoginContext();
  const boxRef = useRef<any>(null);
  
  return <>
    <Stack 
      direction="row"
      sx={{maxHeight: '100px', padding:'3.5%', justifyContent: 'space-between', alignItems: 'center'}}
      ref={boxRef}>
      {!user ? <>
        <Box>
          <img 
            src={BleeterLogoBar}
            alt="Life just got quick"
            style={{
              display: !boxRef.current ? 'none' : 'block',
              maxHeight:`${boxRef.current?.offsetWidth/8}px`,
              width:'auto'
            }}/>
        </Box>
        <Stack direction="row" spacing={2}>
          <CreateUserButton />
          <LoginUserButton />
        </Stack>
      </> : <>
        <Box>
          <Typography>{user.name}</Typography>
          <MuiLink component={Link} to={'/'+user.username}>@{user.username}</MuiLink>
        </Box>
        <LogoutUserButton />
      </>}
    </Stack>
    {user && <>
      <Divider />
      <Box sx={{padding:'5%'}}>
        <NewBleetForm />
      </Box>
    </>}
  </>;
};

export default UserBar;
