import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";
import muiBackground from "../shared/material-ui-background";
import History from "@material-ui/icons/HistoryOutlined";
import ExitToApp from "@material-ui/icons/ExitToAppOutlined";
import Settings from "@material-ui/icons/SettingsApplicationsOutlined";
import Poll from "@material-ui/icons/PollOutlined";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {logOut} from "../../store/auth/action-creators";
import {useHistory} from "react-router-dom";

export const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: muiBackground,
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    avatar: {
        margin: theme.spacing(1, 0)
    }
}));

function SideBar(props) {
    const classes = useStyles();

    const history = useHistory();
    const navItems = [
        {
            icon: <Settings/>,
            name: "Settings",
            onClick: (e) => console.log(e)

        },
        {
            icon: <History/>,
            name: "Transactions",
            onClick: (e) => console.log(e)
        },
        {
            icon: <Poll/>,
            name: "Statistics",
            onClick: (e) => console.log(e)
        },
        {
            icon: <ExitToApp/>,
            name: 'Log out',
            onClick: handleLogout.bind(this)
        }
    ];

    async function handleLogout() {
        await props.logout();
        history.push('/');
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            elevation={2}
            anchor="right"
            open={props.isOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Box p={2}>
                <Avatar className={classes.avatar}>
                    R
                </Avatar>
                <Typography variant={'h6'}>{'Marco Leko'}</Typography>
                <Typography variant={'subtitle1'}>{'leko.marco@outlook.com'}</Typography>
            </Box>
            <Divider/>
            <List>
                {navItems.map(({icon, name, onClick}, index) => (
                    <ListItem button key={index} onClick={onClick}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={name}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

const mapStateTopProps = store => ({
    isOpen: store.uiReducer.isOpen
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logOut())
});
export default connect(mapStateTopProps, mapDispatchToProps)(SideBar);

