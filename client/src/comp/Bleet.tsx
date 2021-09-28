import _ from 'lodash';
import {useState} from 'react';
import dayjs from 'dayjs'
import {Stack, Typography, Divider, IconButton, Collapse, Link as MuiLink} from '@mui/material';
import {ChatBubbleOutline, Autorenew} from '@mui/icons-material';
import {useHistory, Link} from "react-router-dom";

import NewBleetForm from '../forms/NewBleetForm';
import {Post, User} from '../gql/gql-interface';
import {UserMap, PostMap} from '../types';

const Bleet = (
  {post, curUser, threadId, userMap, postMap}:
  {post: Post, curUser?: User, threadId?: string, userMap: UserMap, postMap: PostMap}
) => {
  const [showComment, setShowComment] = useState(false);
  const postUser = userMap[post.userId];
  const history = useHistory();
  const isThreadOp = threadId === post._id;

  const onShowComment = evt => {
    evt.stopPropagation();
    setShowComment(cur => !cur);
  }

  const onReBleet = evt => {
    evt.stopPropagation();
  };

  const onClickBleet = () => {
    if (!isThreadOp)
      history.push(`/${postUser?.username}/${post._id}`)
  };

  const replyingTo = !!post.replyTo?.length
    && Object.keys(
      // produces filtered list of user replied to
      post.replyTo.reduce((acc, replyId) => {
        const replyUserId = postMap[replyId]?.userId
        const replyUser = userMap[replyUserId];
        if (replyUser)
          acc['@'+replyUser.username] = true;
        
        return acc;
      }, {} as {[id: string]:true})
    ).join(' ');

  return <>
    <Stack 
      sx={{
        position: 'relative',
        padding: '3.5%',
        textDecoration: 'unset',
        color: 'unset',
        ...!isThreadOp && {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
          transition: [
            'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          ],
        },
      }}
      spacing={1}
      onClick={onClickBleet}>
      {replyingTo && !!replyingTo?.length && 
        <Typography variant="meta">Replying to: {replyingTo}</Typography>
      }
      <Stack direction="row" spacing={1}>
        <MuiLink 
          component={Link} 
          to={'/'+postUser?.username}
          onClick={evt => evt.stopPropagation()}>
          <Typography variant="name">{postUser?.name}</Typography> <Typography variant="info">@{postUser?.username}</Typography>
        </MuiLink>
        <Typography variant="info">{dayjs(post.at).format('MMM D, YYYY')}</Typography>
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
          <NewBleetForm replyTo={[
            post._id,
            ...(threadId && !isThreadOp) ? [threadId] : [],
          ]}/>
        </Collapse>
      </>}
    </Stack>
    <Divider />
  </>
};

export default Bleet;