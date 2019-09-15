import * as React from 'react';
import './app.scss';
import TabBar from '../tab-bar/tab-bar';
import BottomNav from '../bottom-nav/bottom-nav';

export default function App(): React.ReactNode {

    return (
        <React.Fragment>
            <TabBar/>
            <div className="fixed-bottom">
                <BottomNav/>
            </div>
        </React.Fragment>
    );
}
