import {Box} from '@mui/material';
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {mode: 'dark'},
});

const ThemeProvider = ({children}) => (
  <MuiThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Box sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: '#282c34',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </Box>
  </MuiThemeProvider>
);

export default ThemeProvider;
