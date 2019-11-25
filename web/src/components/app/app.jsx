import * as React from 'react';
import './app.scss';
import theme from '../../material-ui-theme';
import {ThemeProvider} from '@material-ui/core/styles';
import store from '../../store/store';
import {Provider} from "react-redux";
import RouteHandler from "../route-handler/route-handler";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <RouteHandler/>
            </Provider>
        </ThemeProvider>
    );
}
