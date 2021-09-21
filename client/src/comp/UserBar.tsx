import {Box, Button, Typography} from '@mui/material';
import {useLoginContext} from '../Login';

const UserBar = () => {
  const {user, LoginUserButton, CreateUserButton} = useLoginContext();

  return (
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
        <Typography>{user}</Typography>
        <Button variant="outlined">Login</Button>
      </>}
    </Box>
  );
};

export default UserBar;
