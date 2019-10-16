import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5f9ea0',
        }
    },
    typography: {
        fontFamily: ['Apple Chancery', 'cursive'].join(','),
    },
});

export default theme;
