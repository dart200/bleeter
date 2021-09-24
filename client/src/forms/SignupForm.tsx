import {useEffect, useState} from 'react';
import {DialogContent, Typography, TextField, Button, Stack} from "@mui/material";
import {useCreateUser} from '../gql/hooks';
import FullScreenDialog from "../comp/FullScreenDialog";

const SignupForm = ({open, onClose, onSuccess}) => {
  const [createUser, {data, loading, error}] = useCreateUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    createUser({
      name,
      username,
      email,
      password,
    });
  };

  useEffect(() => {
    if (data) {
      const {user, token} = data;
      onSuccess(user, token);
    }
  }, [data]);

  return (
    <FullScreenDialog
      open={open}
      onClose={onClose}>
      <DialogContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Stack 
          spacing={3}
          sx={{
            width: '100%',
            maxWidth: 400,
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: '10px',
            padding: '20px',
          }}
        > 
          <Typography>
            Don't let life pass you by.
          </Typography>
          <TextField
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={evt => setName(evt.target.value)}/>
          <TextField
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={evt => setEmail(evt.target.value)}/>
          <TextField
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={evt => setUsername(evt.target.value)}/>
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={evt => setPassword(evt.target.value)}/>
          <Stack direction="row" spacing={2} sx={{justifyContent: 'flex-end'}}>
            <Button
              onClick={onSubmit}
              variant="outlined">
              Submit
            </Button>
            <Button
              onClick={onClose}
              variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </FullScreenDialog>
  );
};

export default SignupForm;
