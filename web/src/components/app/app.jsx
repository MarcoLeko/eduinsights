import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './app.scss';
import SwipeableViews from 'react-swipeable-views';
import Charities from '../charities/charities';
import clsx from 'clsx';
import MapOverlay from '../donations-map/map-overlay';
import { connect } from 'react-redux';
import ToggleableMenu from './toggleable-menu';
import SideBar from './side-bar';
import LiveDonations from '../live-donations/live-donations';
import { useScrollTrigger } from '@material-ui/core';
import EducationIcon from '@material-ui/icons/CastForEducation';
import CharitiesIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import MapIcon from '@material-ui/icons/MapRounded';
import Poll from "@material-ui/icons/PollOutlined";

import { useAppStyles } from './app-styles';
import DonationStatistics from '../statistics/donation-statistics';

function App({ canSwipe }) {
    const classes = useAppStyles();
    const trigger = useScrollTrigger({ threshold: 48 });
    const [tabIndex, setTabIndex] = React.useState(1);
    const [sideBarOpen, setSideBarOpen] = React.useState(false);

    function tab(icon, text, index, iconOnly) {
        return (
            <Tab
                classes={{
                    wrapper: classes.tabContent,
                    root: iconOnly && classes.iconTab
                }}
                key={index}
                label={
                    <>
                        <Hidden smDown={!iconOnly}>
                            <Box component="div"
                                className={classes.iconSpacing}>{icon}</Box>
                        </Hidden>
                        {text}
                    </>
                } />
        );
    }

    const labels = [
        tab(<MapIcon />, undefined, 0, true),
        tab(<EducationIcon />, 'Live', 1),
        tab(<CharitiesIcon />, 'Charities', 2),
        tab(<Poll />, 'Statistics', 3)
    ];

    function handleChange(event, newValue) {
        setTabIndex(newValue);
    }

    function handleChangeIndex(index) {
        setTabIndex(index);
    }

    function transitionY() {
        if (tabIndex === 0) {
            return 48;
        } else {
            if (!trigger) {
                return 0;
            } else {
                return 48;
            }
        }
    }

    return (
        <React.Fragment>
            <AppBar
                position="sticky"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: sideBarOpen,
                }, 'background')}
                style={{
                    transform: `translateY(-${transitionY()}px)`,
                }}
            >
                <ToggleableMenu
                    trigger={trigger}
                    tabIndex={tabIndex}
                    toggle={setSideBarOpen}
                    isOpen={sideBarOpen}
                />
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    classes={{ indicator: classes.indicator }}>
                    {
                        labels.map((tab) => tab)
                    }
                </Tabs>
            </AppBar>
            <SwipeableViews
                className={clsx(classes.content, {
                    [classes.contentShift]: sideBarOpen,
                })}
                index={tabIndex}
                style={
                    Object.assign({ height: '100%', width: '100%', },
                        tabIndex === 0 && { marginTop: '-48px', position: 'fixed' })
                }
                containerStyle={{ height: '100%', width: '100%' }}
                onChangeIndex={handleChangeIndex}
                disabled={!canSwipe}
                slideStyle={{ overflow: 'hidden' }}
            >
                <MapOverlay />
                <LiveDonations />
                <Charities />
                <DonationStatistics />
            </SwipeableViews>
            <SideBar isOpen={sideBarOpen} />
        </React.Fragment>
    );
}

const mapStateToProps = store => ({
    canSwipe: store.uiReducer.canSwipe,
});

export default connect(mapStateToProps)(App);
