import {useState} from 'react';
import {Stack, TextField, Button, Typography} from '@mui/material';
import {useCreatePost} from '../gql/hooks';
import {BLEET_MAX_LEN} from '../config';
import {useLoginContext} from '../login';

const NewBleetForm = ({replyTo}: {replyTo?: any}) => {
  const [text, setText] = useState('');
  const {jwt} = useLoginContext()
  const [createPost, {data, loading, error}] = useCreatePost();
  
  const submit = () => {
    if (!jwt || !text) return;

    createPost({token: jwt, text, replyTo});
    setText('');
  }

  return <Stack direction="column" spacing={0} sx={{alignItems: 'flex-end'}}>
    <TextField
      id="bleet"
      type="text"
      fullWidth
      variant="outlined"
      placeholder="What's Happening?"
      multiline
      error={text.length > BLEET_MAX_LEN}
      helperText={text.length > BLEET_MAX_LEN ? "Please, we can't think *that* fast" : ' '}
      value={text}
      onChange={evt => setText(evt.target.value)}/>
    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
      <Typography variant="subtitle2">{text.length}/{BLEET_MAX_LEN}</Typography>
      <Button
        onClick={submit}
        variant="contained">
        Bleet
      </Button>
    </Stack>
  </Stack>;
};

export default NewBleetForm;
