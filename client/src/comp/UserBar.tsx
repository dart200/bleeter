import {Box, Button, Divider, Typography} from '@mui/material';
import {useLoginContext} from '../Login';
import NewBleetForm from '../forms/NewBleetForm';

const UserBar = () => {
  const {user, LoginUserButton, CreateUserButton, LogoutUserButton} = useLoginContext();

  console.log(user);

  return <>
    <Box sx={{
      padding:'5%',
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
          <Typography> @{user.username}</Typography>
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
