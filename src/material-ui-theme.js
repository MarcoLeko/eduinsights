import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.65)',
    }
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue'].join(','),
  },
});

export default theme;
