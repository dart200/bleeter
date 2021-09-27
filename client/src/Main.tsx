import {useEffect, useState} from 'react';
import dayjs from 'dayjs'
import {Stack, Box, Typography, Divider, CircularProgress, IconButton, Collapse} from '@mui/material';
import {ChatBubbleOutline, Autorenew} from '@mui/icons-material';

import {useLoginContext} from './login';
import NewBleetForm from './forms/NewBleetForm';
import UserBar from './comp/UserBar';
import {useGetHome} from './gql/hooks';
import {Post, User} from './gql/gql-interface';

const Bleet = ({post, postUser, curUser}: {post: Post, postUser: User, curUser?: User}) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  return <>
    <Stack sx={{margin: '3.5%'}} spacing={1}>
      <Stack direction="row" spacing={1}>
        <Typography>{postUser?.name}</Typography>
        <Typography>@{postUser?.username}</Typography>
        <Typography>{dayjs(post.at).format('MMM D, YYYY')}</Typography>
      </Stack>
      <Typography>{post.text}</Typography>
      {curUser && <>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => setShowComment(cur => !cur)} color='primary'>
            <ChatBubbleOutline/>
          </IconButton>
          <IconButton color="success" onClick={() => {}}>
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

type UserMap = {[id: string]: User};
type PostMap = {[id: string]: Post};


const Main = () => {
  const {user, jwt} = useLoginContext();

  const {data, loading, error} = useGetHome({...jwt && {token: jwt}});
  
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
      <UserBar />
      <Divider />
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
