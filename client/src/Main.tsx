import {useEffect, useState} from 'react';
import {Stack, Box, Typography, Divider, CircularProgress} from '@mui/material';
import {useLoginContext} from './login';
import NewBleetForm from './forms/NewBleetForm';
import UserBar from './comp/UserBar';
import {useGetHome} from './gql/hooks';
import {Post, User} from './gql/gql-interface';

const Bleet = ({post, user}: {post: Post, user: User}) => <>
  <Stack sx={{margin: '5%'}}>
    <Stack direction="row" spacing={1}>
      <Typography>{user.name}</Typography>
      <Typography>@{user.username}</Typography>
      <Typography>{post.at}</Typography>
    </Stack>
    <Typography>{post.text}</Typography>
  </Stack>
  <Divider />
</>;

type UserMap = {[id: string]: User};

const Main = () => {
  const {user, jwt} = useLoginContext();

  const {data, loading, error} = useGetHome({...jwt && {token: jwt}});
  const posts = data?.posts;
  const [users, setUsers] = useState<UserMap>({});

  useEffect(() => {
    if (!data) return;
    const userMap:UserMap = {};
    data.users.map(u => userMap[u._id] = u);
    setUsers(userMap);
  }, [data]);

  return (
    <Stack sx={{flex: 1, minHeight: '100vh', maxWidth: 650}}>
      <UserBar />
      <Divider />
      {loading ?
        <Stack sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </Stack>
      : 
        data?.posts?.map(p => 
          <Bleet key={p._id} post={p} user={users[p.userId]}/>
        )
      }
    </Stack>
  )
};

export default Main;
