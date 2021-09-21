import {Dialog, DialogProps} from "@mui/material";
import {useTheme} from '@mui/material/styles';

const FullScreenDialog = (props: DialogProps) => {
  const theme = useTheme()
  return <Dialog
    fullScreen
    hideBackdrop
    PaperProps={{
      sx: {
        backgroundColor: theme.palette.background.default,
        backgroundImage: 'unset',
      }
    }}
    {...props}
  />
};

export default FullScreenDialog