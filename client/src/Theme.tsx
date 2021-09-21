import {Box, CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';

// declare module '@mui/material/Dialog' {
//   interface DialogProps {variant?: 'fullPage'}
// };

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {default: '#282C34'},
  },
  components: {
    // needs to be solved first: https://github.com/mui-org/material-ui/issues/19466
    // MuiDialog: {variants: [
    //   // full page variant with default background color
    //   {
    //     props: {variant: 'fullPage'},
    //     style: {
    //       backgroundColor: '#282c34'
    //     }
    //   }   
    // ]}
  }
});

export const ThemeProvider = ({children}) => (
  <MuiThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Box sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </Box>
  </MuiThemeProvider>
);
