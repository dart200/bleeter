import {useEffect, useState} from 'react';
import dayjs from 'dayjs'
import {Stack, Typography, Divider, CircularProgress, IconButton, Collapse, Link as MuiLink} from '@mui/material';
import {ChatBubbleOutline, Autorenew, ArrowBackIosNew} from '@mui/icons-material';
import {useRouteMatch, useHistory, Link, NavLink} from "react-router-dom";

import {useLoginContext} from './login';
import NewBleetForm from './forms/NewBleetForm';
import UserBar from './comp/UserBar';
import {useGetPosts} from './gql/hooks';
import {Post, User} from './gql/gql-interface';

const Bleet = ({post, postUser, curUser}: {post: Post, postUser?: User, curUser?: User}) => {
  const [showComment, setShowComment] = useState(false);
  const history = useHistory();
  const isPostThread = history.location.pathname.match(post._id);

  const onShowComment = evt => {
    evt.stopPropagation();
    setShowComment(cur => !cur);
  }

  const onReBleet = evt => {
    evt.stopPropagation();
  };

  const onClickBleet = () => {
    if (!isPostThread)
      history.push(`/${postUser?.username}/${post._id}`)
  };

  return <>
    <Stack 
      sx={{
        position: 'relative',
        padding: '3.5%',
        textDecoration: 'unset',
        color: 'unset',
        ...!isPostThread && {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          transition: [
            'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          ],
        }
      }}
      spacing={1}
      onClick={onClickBleet}>
      <Stack direction="row" spacing={1}>
        <MuiLink 
          sx={{
            textDecoration: 'unset',
            color: 'unset',
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
          component={Link} 
          to={'/'+postUser?.username}
          onClick={evt => evt.stopPropagation()}>
          {postUser?.name} @{postUser?.username}
        </MuiLink>
        <Typography>{dayjs(post.at).format('MMM D, YYYY')}</Typography>
      </Stack>
      <Typography>{post.text}</Typography>
      {curUser && <>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={onShowComment} color='primary'>
            <ChatBubbleOutline/>
          </IconButton>
          <IconButton color="success" onClick={onReBleet}>
            <Autorenew />
          </IconButton>
        </Stack>
        <Collapse in={showComment} sx={{width: '100%'}}>
          <NewBleetForm replyTo={post._id}/>
        </Collapse>
      </>}
    </Stack>
    <Divider />
  </>
};

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
