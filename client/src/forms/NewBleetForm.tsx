import {useState} from 'react';
import {Stack, TextField, Button, Typography} from '@mui/material';
import {BLEET_MAX_LEN} from '../config';

const NewBleetForm = () => {
  const [bleet, setBleet] = useState('');

  return <Stack direction="column" spacing={0} sx={{alignItems: 'flex-end'}}>
    <TextField
      id="bleet"
      type="text"
      fullWidth
      variant="outlined"
      placeholder="What's Happening?"
      multiline
      error={bleet.length > BLEET_MAX_LEN}
      helperText={bleet.length > BLEET_MAX_LEN ? "Please, we can't think *that* fast" : ' '}
      value={bleet}
      onChange={evt => setBleet(evt.target.value)}/>
    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
      <Typography variant="subtitle2">{bleet.length}/{BLEET_MAX_LEN}</Typography>
      <Button
        onClick={() => {}}
        variant="contained">
        Bleet
      </Button>
    </Stack>
  </Stack>;
};

export default NewBleetForm;
