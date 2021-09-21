import {Box, Button, Typography, Divider} from '@mui/material';
import {useLoginContext} from './Login';
import NewBleetForm from './forms/NewBleetForm';
import UserBar from './comp/UserBar';

const Main = () => {
  const {user} = useLoginContext();
  // const [posts] = useQuery();

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: '100vh',
        maxWidth: 650,
      }}>
      <UserBar />
      <Divider />
    </Box>
  )
};

export default Main;