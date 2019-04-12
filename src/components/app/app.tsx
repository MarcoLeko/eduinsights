import * as React from 'react';
import './app.scss';
import {ReactComponent as Logo } from '../../assets/logo.svg';

export class App extends React.Component {

    public render(): React.ReactNode {
        return (
            <div className="app">
                <Logo className="app-logo"/>
            </div>
        );
    }
}

export default App;
