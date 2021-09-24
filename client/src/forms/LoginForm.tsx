import {useState, useEffect} from 'react';
import {DialogContent, Typography, TextField, Button, Stack} from "@mui/material";
import {useLoginUser} from '../gql/hooks';
import FullScreenDialog from "../comp/FullScreenDialog";

const LoginForm = ({open, onClose, onSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, {data, loading, error}] = useLoginUser();

  const onSubmit = () => {
    loginUser({
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
            Life's about to get quick...
          </Typography>
          <TextField
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={evt => setEmail(evt.target.value)}/>
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


export default LoginForm;
