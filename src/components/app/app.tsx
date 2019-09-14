import * as React from 'react';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './app.scss';
import TabBar from '../tab-bar/tab-bar';
import BottomNav from '../bottom-nav/bottom-nav';

export class App extends React.Component {

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <TabBar/>
                <div className="app">
                    <Logo className="app-logo"/>
                </div>
                <div className="fixed-bottom">
                    <BottomNav/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
