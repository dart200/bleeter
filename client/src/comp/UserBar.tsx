import {Box, Button, Divider, Typography} from '@mui/material';
import {useLoginContext} from '../Login';
import NewBleetForm from '../forms/NewBleetForm';

const UserBar = () => {
  const {user, LoginUserButton, CreateUserButton, LogoutUserButton} = useLoginContext();

  return <>
    <Box sx={{
      padding:'5%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: !user ? 'flex-end' : 'space-between',
    }}>
      {!user ? <>
        <CreateUserButton sx={{marginRight: '5%'}} />
        <LoginUserButton />
      </> : <>
        <Typography>{user.name}</Typography>
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
