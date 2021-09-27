import {Box, Divider, Typography, Link as MuiLink} from '@mui/material';
import {Link} from 'react-router-dom';

import {useLoginContext} from '../login';
import NewBleetForm from '../forms/NewBleetForm';

const UserBar = () => {
  const {user, LoginUserButton, CreateUserButton, LogoutUserButton} = useLoginContext();
  
  return <>
    <Box sx={{
      maxHeight: '100px',
      padding:'3.5%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: !user ? 'flex-end' : 'space-between',
      alignItems: 'center',
    }}>
      {!user ? <>
        <CreateUserButton sx={{marginRight: '5%'}} />
        <LoginUserButton />
      </> : <>
        <Box>
          <Typography>{user.name}</Typography>
          <MuiLink component={Link} to={'/'+user.username}>@{user.username}</MuiLink>
        </Box>
        <LogoutUserButton />
      </>}
    </Box>
    {user && <>
      <Divider />
      <Box sx={{padding:'5%'}}>
        <NewBleetForm />
      </Box>
    </>}
  </>;
};

export default UserBar;
