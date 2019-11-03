import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#808080',
    }
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue'].join(','),
  },
});

export default theme;
