import React, {useState} from 'react';
import {emphasize, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from "react-redux";
import muiBackground from "../shared/material-ui-background";
import History from "@material-ui/icons/History";
import Logout from "@material-ui/icons/ExitToAppOutlined";
import Settings from '@material-ui/icons/Settings';
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {logOut} from "../../store/auth/auth-action-creators";
import {useHistory} from "react-router-dom";
import Contribute from '@material-ui/icons/Code';
import UserAvatar from "../shared/user-avatar";

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
    const [logoName] = useState(props.firstName.charAt(0).concat(props.lastName.charAt(0)).toLocaleUpperCase());

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
            icon: <Contribute/>,
            name: 'Contribute',
            onClick: (e) => console.log(e)
        },
        {
            icon: <Logout/>,
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
                <UserAvatar className={classes.avatar}
                        style={{
                            backgroundColor: props.avatarColor,
                            color: emphasize(props.avatarColor, 1)
                        }}>
                    {logoName}
                </UserAvatar>
                <Typography variant={'h6'}>{props.firstName.concat(' ', props.lastName)}</Typography>
                <Typography variant={'subtitle1'}>{props.email}</Typography>
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

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logOut())
});

const mapStateToProps = store => ({
    firstName: store.authReducer.firstName,
    lastName: store.authReducer.lastName,
    email: store.authReducer.email,
    avatarColor: store.authReducer.avatarColor,
});
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

