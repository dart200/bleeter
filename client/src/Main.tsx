import {useEffect, useState} from 'react';
import {Stack, Typography, Divider, CircularProgress, IconButton} from '@mui/material';
import {ArrowBackIosNew} from '@mui/icons-material';
import {useRouteMatch, useHistory, Link} from "react-router-dom";

import {useLoginContext} from './login';
import {Post, User} from './gql/gql-interface';
import {useGetPosts} from './gql/hooks';
import UserBar from './comp/UserBar';
import Bleet from './comp/Bleet';

const StatusBar = ({title}) => {
  const history = useHistory();

  return <>
    <Stack 
      direction="row"
      spacing={3}
      sx={{
        maxHeight: '100px',
        padding: '3.5%',
        alignItems: 'center',
      }}>
      <IconButton
        onClick={history.length > 2 ? history.goBack : undefined}
        component={history.length === 2 ? Link as any : undefined}
        to="/">
        <ArrowBackIosNew />
      </IconButton>
      <Typography>{title}</Typography>
    </Stack>
    <Divider />
  </>;
};

type UserMap = {[id: string]: User};
type PostMap = {[id: string]: Post};
type URLParams = {username: string, postId: string}

const Main = () => {
  const {user, jwt} = useLoginContext();

  // handle profile routes
  const profileMatch = useRouteMatch<URLParams>({
    path: "/:username",
    exact: true,
  });
  const profileUsername = profileMatch?.params?.username;

  // handle post routes
  const postMatch = useRouteMatch<URLParams>({
    path: "/:username/:postId",
    exact: true,
  });
  const postId = postMatch?.params?.postId;

  const {data, loading, error} = useGetPosts({
    ...jwt && {token: jwt},
    ...profileUsername && {username: profileUsername},
    ...postId && {postId},
  });
  
  const [posts, setPosts] = useState<PostMap>({});
  const [users, setUsers] = useState<UserMap>({});

  useEffect(() => {
    if (!data) return;
    const userMap:UserMap = {};
    data.users.map(u => userMap[u._id] = u);
    setUsers(userMap);
  }, [data]);

  return (
    <Stack sx={{flex: 1, minHeight: '100vh', maxWidth: 650}}>
      {profileMatch ? 
        <StatusBar title="Profile"/>
      : postMatch ?
        <StatusBar title="Bleet"/>
      : <>
        <UserBar />
        <Divider />
      </>}
      {loading ?
        <Stack sx={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress />
        </Stack>
      : 
        data?.posts?.map(p => 
          <Bleet key={p._id} post={p} postUser={users[p.userId]} curUser={user}/>
        )
      }
    </Stack>
  )
};

export default Main;
