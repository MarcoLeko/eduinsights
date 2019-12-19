import React, {useState} from 'react';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";

const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2),
        minWidth: 48,
        width: 48,
        height: 56,
        position: 'absolute',
        background: '#fff',
        borderRadius: 0,
        marginLeft: 0,
        zIndex: 9999,
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    buttonShift: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    paperAnchorLeft: {left: 'unset'},
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: theme.palette.paper,
        whiteSpace: 'nowrap',
        zIndex: 9999,
        position: 'absolute'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
    },
}));

function MapSideBar() {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    function toggleSidebar() {
        setOpen(!open);
    }

    return (
        <><Button
            variant="contained"
            className={clsx(classes.button, {
                [classes.buttonShift]: open,
            })}
            onClick={toggleSidebar.bind(this)}
            onDoubleClick={() => false}
        >{open ? <ArrowBackIosRoundedIcon/> : <ArrowForwardIosRoundedIcon/>}</Button>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    }),
                    paperAnchorLeft: classes.paperAnchorLeft
                }}
            >
                <div className={classes.toolbar}>
                </div>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}


export default MapSideBar;
