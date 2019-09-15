import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ReactComponent as Logo} from '../../assets/donation.svg';
import './tab-bar.scss';
import DonationOverview from '../donation-overview/donation-overview';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TabBar() {
    const [value, setValue] = React.useState(0);
    const trigger = useScrollTrigger();

    function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
        setValue(newValue);
    }

    function handleChangeIndex(index: number) {
        setValue(index);
    }

    return (
        <React.Fragment>
                <AppBar position="fixed" color="default">
                    <Slide appear={false} direction="down" in={!trigger}>
                        <div className="tab-nav" style={{padding: '.5em 1em 0 1em'}}>
                            <Logo style={{width: '30px', paddingRight: '1em'}}/>
                            <span style={{fontWeight: 'bold', fontSize: '20px', verticalAlign: 'super'}}>Help-Educate</span>
                        </div>
                    </Slide>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Item One" {...a11yProps(0)}/>
                        <Tab label="Item Two" {...a11yProps(1)}/>
                        <Tab label="Item Three" {...a11yProps(2)}/>
                    </Tabs>
                </AppBar>
            <Toolbar/>
            <SwipeableViews
                index={value}
                style={{height: '100%', width: '100%'}}
                containerStyle={{height: '100%', width: '100%'}}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0}>
                    <DonationOverview/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
        </React.Fragment>
    );
}
