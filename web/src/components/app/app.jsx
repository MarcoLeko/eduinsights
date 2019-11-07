import * as React from 'react';
import './app.scss';
import TabBar from '../tab-bar/tab-bar';
import theme from '../../material-ui-theme';
import {ThemeProvider} from '@material-ui/core/styles';
import store from '../../store/store';
import { Provider } from "react-redux";
import socket from "../../socket-io-client";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <TabBar socket={socket}/>
            </Provider>
        </ThemeProvider>
    );
}
