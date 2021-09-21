import {useState} from 'react';
import {DialogContent, Typography, TextField, Button, Stack} from "@mui/material";
import {styled} from '@mui/material/styles';
import FullScreenDialog from "../comp/FullScreenDialog";

const LoginForm = ({open, onClose, onSubmit, submitLoading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

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
            border: '1px solid #F6F6F6',
            borderRadius: '10px',
            padding: '20px',
          }}
        > 
          <Typography>
            Life's about to get quick...
          </Typography>
          <TextField
            autoFocus
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
              onClick={() => onSubmit(email, password)}
              variant="outlined">
              Submit
            </Button>
            <Button
              onClick={() => onClose()}
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
