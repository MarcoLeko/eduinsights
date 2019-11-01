import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './tab-bar.scss';
import SwipeableViews from 'react-swipeable-views';
import {Box} from '@material-ui/core';
import DonationsOverview from "../donations-overview/donations-overview";
import clsx from 'clsx';
import MapOverlay from "../donations-map/map-overlay";
import {connect} from "react-redux";
import ToggleableMenu from "./toggleable-menu";
import SideBar, {drawerWidth} from './side-bar';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    appBarShift: {
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: -drawerWidth,
    },
    content: {
        flexGrow: 1,
        height: '100%',
        width: '100%',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: 'relative',
        left: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        left: -drawerWidth,
    },
}));

function TabBar({canSwipe, isOpen}) {
    const classes = useStyles();

    const [tabIndex, setTabIndex] = React.useState(0);
    const [yOffset, setNavState] = React.useState(0);

    function handleChange(event, newValue) {
        setTabIndex(newValue);
    }

    function handleChangeIndex(index) {
        setTabIndex(index);
    }

    function transitionY() {
        const transitionYthreshold = 48;
        if (tabIndex === 1) {
            return transitionYthreshold;
        } else {
            return Math.min(transitionYthreshold, yOffset);
        }
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
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isOpen,
                }, "background")}
                style={{
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2)',
                    transition: 'transform .2s ease-out',
                    transform: `translateY(-${transitionY()}px)`
                }}
            >
                <ToggleableMenu/>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Home"/>
                    <Tab label="Donations"/>
                    <Tab label="Charities"/>
                </Tabs>
            </AppBar>
            <div
                className={clsx(classes.content, {
                    [classes.contentShift]: isOpen,
                })}
            >
                <SwipeableViews
                    index={tabIndex}
                    style={{
                        height: '100%',
                        width: '100%',
                        transition: 'transform .2s ease-out',
                        marginTop: tabIndex === 1 ? '-48px' : '0'
                    }}
                    containerStyle={{height: '100%', width: '100%'}}
                    onChangeIndex={handleChangeIndex}
                    enableMouseEvents={true}
                    disabled={canSwipe === false}
                    slideStyle={{overflow: 'hidden'}}
                >
                    <DonationsOverview/>
                    <MapOverlay/>
                    <Box p={3}>
                        Item Three
                    </Box>
                </SwipeableViews>
            </div>
            <SideBar/>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    canSwipe: state.canSwipe,
    isOpen: state.isOpen
});

export default connect(mapStateToProps)(TabBar);
