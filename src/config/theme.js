import { createMuiTheme } from '@material-ui/core/styles';
const AppTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#67daff',
        main: '#03a9f4',
        dark: '#007ac1',
        contrastText: '#ffeb3b',
      },
      secondary: {
        light: '#ffff6b',
        main: '#fdd835',
        dark: '#c6a700',
        contrastText: '#212121',
      },
    },
  });
export default AppTheme;