import * as React from 'react';
import './app.scss';
import logo from '../../assets/logo.svg';

export class App extends React.Component {

    public render(): React.ReactNode {
        return (
            <div className="app">
                <img src={logo} className="app-logo" alt="logo"/>
            </div>
        );
    }
}

export default App;
