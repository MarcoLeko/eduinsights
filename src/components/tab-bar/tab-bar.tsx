import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ReactComponent as Logo} from '../../assets/donation.svg';
import './tab-bar.scss';
import SwipeableViews from 'react-swipeable-views';
import {Box, Toolbar} from '@material-ui/core';

export default function TabBar() {
    const [value, setValue] = React.useState(0);
    const [yOffset, setNavState] = React.useState(0);
    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }

    function handleChangeIndex(index: number) {
        setValue(index);
    }

    function transitionY() {
        const transitionYthreshold = 48;
        return Math.min(transitionYthreshold, yOffset);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        setNavState(window.pageYOffset);
    }

    return (
        <React.Fragment>
            <AppBar
                position="sticky"
                color="default"
                style={{
                    transition: 'all 0.1s',
                    transform: `translateY(-${transitionY()}px)`
                }}
            >
                <Toolbar style={{minHeight: '48px'}}>
                    <Logo style={{width: '30px', marginRight: '1em'}}/>
                    <span style={{fontWeight: 'bold', fontSize: '20px', verticalAlign: 'super'}}>Help-Educate</span>
                </Toolbar>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Home"/>
                    <Tab label="Live Donations"/>
                    <Tab label="About Us"/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={value}
                style={{height: '100%', width: '100%'}}
                containerStyle={{height: '100%', width: '100%'}}
                onChangeIndex={handleChangeIndex}
                enableMouseEvents={true}
            >
                <Box>
                    {
                        [...new Array(20)].map(() =>
                            `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus est Lorem ipsum dolor sit amet.`)
                            .join('\n')
                    }
                </Box>
                <div>
                    Item Two
                </div>
                <div>
                    Item Three
                </div>
            </SwipeableViews>
        </React.Fragment>
    );
}
