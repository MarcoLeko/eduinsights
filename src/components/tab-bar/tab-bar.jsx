import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './tab-bar.scss';
import SwipeableViews from 'react-swipeable-views';
import {Box, Toolbar} from '@material-ui/core';
import DonationsOverview from "../donations-overview/donations-overview";

export default function TabBar() {
  const [value, setValue] = React.useState(0);
  const [yOffset, setNavState] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
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
          transition: 'transform .2s ease-out',
          transform: `translateY(-${transitionY()}px)`
        }}
      >
        <Toolbar style={{minHeight: '48px'}}>
          <Logo style={{width: '30px', marginRight: '1em'}}/>
          <span className="toolbar-header">Help educate</span>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Home"/>
          <Tab label="Donations"/>
          <Tab label="About Us"/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={value}
        style={{height: '100%', width: '100%'}}
        containerStyle={{height: '100%', width: '100%'}}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents={true}
        slideStyle={{overflow: 'hidden'}}
      >
        <DonationsOverview/>
        <Box p={3}>
          Item Two
        </Box>
        <Box p={3}>
          Item Three
        </Box>
      </SwipeableViews>
    </React.Fragment>
  );
}
