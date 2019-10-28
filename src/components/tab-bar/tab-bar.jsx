import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './tab-bar.scss';
import SwipeableViews from 'react-swipeable-views';
import { Box, Toolbar } from '@material-ui/core';
import DonationsOverview from "../donations-overview/donations-overview";
import MapOverlay from "../donations-map/map-overlay";
import { connect } from "react-redux";
import MoreVertical from "@material-ui/icons/MoreVert";
import IconButton from '@material-ui/core/IconButton';

function TabBar({canSwipe}) {
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
    if (value === 1) {
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
            style={{
              transition: 'transform .2s ease-out',
              transform: `translateY(-${transitionY()}px)`
            }}
        >
          <Toolbar style={{minHeight: '48px'}}>
            <Logo style={{width: '30px', marginRight: '1em'}}/>
            <span className="toolbar-header">Help educate</span>
              <IconButton  style={{
                right: 0,
                position: 'absolute'
              }}>
                <MoreVertical/>
              </IconButton>
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
            <Tab label="Charities"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
            index={value}
            style={{
              height: '100%',
              width: '100%',
              transition: 'transform .2s ease-out',
              marginTop: value === 1 ? '-48px' : '0'
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
      </React.Fragment>
  );
}

const mapStateToProps = state => ({canSwipe: state.canSwipe});

export default connect(mapStateToProps)(TabBar);
