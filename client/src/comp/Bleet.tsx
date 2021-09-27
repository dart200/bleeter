import {useState} from 'react';
import dayjs from 'dayjs'
import {Stack, Typography, Divider, IconButton, Collapse, Link as MuiLink} from '@mui/material';
import {ChatBubbleOutline, Autorenew} from '@mui/icons-material';
import {useHistory, Link} from "react-router-dom";

import NewBleetForm from '../forms/NewBleetForm';
import {Post, User} from '../gql/gql-interface';

const Bleet = (
  {post, postUser, curUser, threadId}:
  {post: Post, postUser?: User, curUser?: User, threadId?: string}
) => {
  const [showComment, setShowComment] = useState(false);
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
          component={Link} 
          to={'/'+postUser?.username}
          onClick={evt => evt.stopPropagation()}>
          {postUser?.name} @{postUser?.username}
        </MuiLink>
        <Typography>{dayjs(post.at).format('MMM D, YYYY')}</Typography>
      </Stack>
      <Typography>{post.replyTo}</Typography>

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