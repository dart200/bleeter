import {useEffect, useState, useRef} from 'react';
import {Stack, Typography, Divider, CircularProgress, IconButton} from '@mui/material';
import {ArrowBackIosNew} from '@mui/icons-material';
import {useRouteMatch, useHistory, Link} from "react-router-dom";

import {useLoginContext} from './login';
import {UserMap, PostMap} from './types';
import {Post} from './gql/gql-interface';
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
  
  const [posts, setPosts] = useState<Post[]>([]);
  const postMap = useRef<PostMap>({}).current;
  const userMap = useRef<UserMap>({}).current;

  useEffect(() => {
    if (!data) return;

    data.users.map(u => userMap[u._id] = u);
    data.posts.map(p => postMap[p._id] = p);

    setPosts(data.posts);
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
        posts?.map(p => 
          <Bleet
            key={p._id}
            post={p}
            threadId={postId}
            curUser={user}
            userMap={userMap}
            postMap={postMap}/>
        )
      }
    </Stack>
  )
};

export default Main;
