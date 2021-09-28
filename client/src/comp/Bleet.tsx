import _ from 'lodash';
import {useState} from 'react';
import dayjs from 'dayjs'
import {Stack, Typography, Divider, IconButton, Collapse, Link as MuiLink} from '@mui/material';
import {ChatBubbleOutline, Autorenew} from '@mui/icons-material';
import {useHistory, Link} from "react-router-dom";

import NewBleetForm from '../forms/NewBleetForm';
import {Post, User} from '../gql/gql-interface';
import {useCreatePost} from '../gql/hooks'
import {UserMap, PostMap} from '../types';
import {useLoginContext} from '../login';

const Bleet = (
  {post, threadId, userMap, postMap}:
  {post: Post, threadId?: string, userMap: UserMap, postMap: PostMap}
) => {
  const history = useHistory();
  const {user, jwt} = useLoginContext();
  const [createPost, {data, loading, error}] = useCreatePost();
  const [showComment, setShowComment] = useState(false);

  const postUser = userMap[post.userId];

  const displayPost = post.retweet ? postMap[post.retweet] : post;
  const displayPostUser = userMap[displayPost.userId];
  const isThreadOp = threadId === post._id;

  const onShowComment = evt => {
    evt.stopPropagation();
    setShowComment(cur => !cur);
  };

  const onBleetSuccess = () => setShowComment(false);

  const onReBleet = evt => {
    evt.stopPropagation();
    if (!jwt) return

    createPost({
      token: jwt,
      retweet: post.retweet || post._id,
    });
  };

  const onClickBleet = () => {
    if (!isThreadOp)
      history.push(`/${displayPostUser?.username}/${displayPost._id}`)
  };

  const replyingTo = !!displayPost.replyTo?.length
    && _(displayPost.replyTo)
      .uniq()
      .map(replyPost => '@'+userMap[postMap[replyPost].userId].username)
      .join(', ')

  return <>
    <Stack 
      sx={{
        position: 'relative',
        padding: '3.5%',
        textDecoration: 'unset',
        color: 'unset',
        ...!isThreadOp && {
          cursor: 'pointer',
          '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.04)'},
          transition: ['background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'],
        },
      }}
      spacing={1}
      onClick={onClickBleet}>
      { post.retweet &&
        <Typography variant="meta">{postUser.name} Rebleeted</Typography>
      }
      {replyingTo && !!replyingTo?.length && 
        <Typography variant="meta">Replying to: {replyingTo}</Typography>
      }
      <Stack direction="row" spacing={1}>
        <MuiLink 
          component={Link} 
          to={'/'+displayPostUser?.username}
          onClick={evt => evt.stopPropagation()}>
          <Typography variant="name">{displayPostUser?.name}</Typography> <Typography variant="info">@{displayPostUser?.username}</Typography>
        </MuiLink>
        <Typography variant="info">{dayjs(displayPost.at).format('MMM D, YYYY')}</Typography>
      </Stack>
      <Typography>{displayPost.text}</Typography>
      {user && <>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={onShowComment} color='primary'>
            <ChatBubbleOutline/>
          </IconButton>
          <IconButton color="success" onClick={onReBleet}>
            <Autorenew />
          </IconButton>
        </Stack>
        <Collapse in={showComment} sx={{width: '100%'}}>
          <NewBleetForm 
            replyTo={_.uniq([displayPost._id].concat(...displayPost.replyTo || []))}
            onSuccess={onBleetSuccess}/>
        </Collapse>
      </>}
    </Stack>
    <Divider />
  </>
};

export default Bleet;