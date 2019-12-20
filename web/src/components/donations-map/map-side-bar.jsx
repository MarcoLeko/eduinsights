import React, {useState} from 'react';
import ArrowForwardIosRoundedIcon
    from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';

const maxDrawerWidth = 480;
const drawerWidth = '85%';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2),
        minWidth: 48,
        width: 48,
        height: 56,
        position: 'absolute',
        background: '#fff',
        borderRadius: 0,
        zIndex: 9999,
        opacity: .75,
        right: -49
    },
    spacerDiv: {
        width: 0,
        position: 'relative',
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    spacerDivOpen: {
        width: drawerWidth,
        maxWidth: maxDrawerWidth,
        position: 'relative',
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    paperAnchorLeft: {left: 'unset'},
    drawer: {
        width: drawerWidth,
        maxWidth: maxDrawerWidth,
        flexShrink: 0,
        display: 'flex',
        height: 'inherit',
        background: theme.palette.paper,
        whiteSpace: 'nowrap',
        zIndex: 9999,
    },
    drawerOpen: {
        width: drawerWidth,
        maxWidth: maxDrawerWidth,
        height: 'inherit',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    sideBarContent: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        position: 'relative',
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
    },
    searchForm: {
        padding: theme.spacing(1, 2),
        marginBottom: theme.spacing(1),
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        width: '90%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

function SearchForm() {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.searchForm}>
            <IconButton type="submit" className={classes.iconButton}
                        aria-label="search">
                <SearchIcon/>
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Search for Charities"
                inputProps={{'aria-label': 'search google maps'}}
            />
            <Divider className={classes.divider} orientation="vertical"/>
            <IconButton color="primary" className={classes.iconButton}
                        aria-label="directions">
                <RoomOutlinedIcon/>
            </IconButton>
        </Paper>
    );
}

function MapSideBar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    function toggleSidebar() {
        setOpen(!open);
    }

    return (
        <>
            <div
                className={clsx(classes.spacerDiv, {
                    [classes.spacerDivOpen]: open,
                })}><Button
                variant="contained"
                className={classes.button}
                disableFocusRipple
                onClick={toggleSidebar.bind(this)}
            >{open ?
                <ArrowBackIosRoundedIcon/> :
                <ArrowForwardIosRoundedIcon/>}</Button></div>

            <Drawer
                variant="permanent"
                elevation={16}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    paperAnchorLeft: classes.paperAnchorLeft,
                }}
            >
                <div className={classes.sideBarContent}>
                    <SearchForm/>
                    <Typography variant="h6">Search Results: 2</Typography>
                    <Divider/>
                    {['Rotes Kreuz', 'San Maritas'].map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}

                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                    }}>
                        <Divider/>
                        <List>
                            <ListItem button>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                <ListItemText primary={'Settings'}/>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default MapSideBar;
