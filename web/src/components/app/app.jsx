import * as React from 'react';
import './app.scss';
import theme from '../../material-ui-theme';
import {ThemeProvider} from '@material-ui/core/styles';
import RouteHandler from "../route-handler/route-handler";

function App() {

    return (
        <ThemeProvider theme={theme}>
                <RouteHandler/>
        </ThemeProvider>
    );
}

export default App;
