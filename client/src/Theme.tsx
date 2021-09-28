import {Box, CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    meta: React.CSSProperties;
    info: React.CSSProperties;
    name: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    meta?: React.CSSProperties;
    info: React.CSSProperties;
    name: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    meta: true,
    info: true,
    name: true,
  }
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {default: '#000000'},
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: {variant: 'meta'},
          style: {
            fontSize: '13px',
            fontWeight: 700,
            color: 'rgb(110 118 125)',
          }
        },
        {
          props: {variant: 'info'},
          style: {
            fontSize: '15px',
            fontWeight: 400,
            color: 'rgb(110 118 125)',
          }
        },
        {
          props: {variant: 'name'},
          style: {
            fontSize: '15px',
            fontWeight: 700,
          },
        },
      ]
    },
    MuiLink: {
      styleOverrides: {
        root: {textDecoration: 'unset', color: 'unset', '&:hover': {textDecoration: 'underline'}},
      }
    }
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
      minWidth: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </Box>
  </MuiThemeProvider>
);
