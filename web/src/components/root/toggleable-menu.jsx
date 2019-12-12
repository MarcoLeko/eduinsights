import * as React from "react";
import {useState} from "react";
import {Toolbar} from "@material-ui/core";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './root.scss';
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {emphasize} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px'
    },
    logoPanel: {
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        textDecoration: 'none'
    },
    logo: {
        width: 40,
        marginRight: theme.spacing(1)
    },
    divider: {
        height: 30,
        margin: 4,
        width: 2
    },
    actionButtons: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(0, 1),
        },
    }
}));

function ToggleableMenu({isOpen, toggle, firstName, lastName, avatarColor}) {
    const classes = useStyles();
    const [logoName] = useState(firstName.charAt(0).concat(lastName.charAt(0)).toLocaleUpperCase());

    return (
        <Toolbar className={classes.root}>
            <Link to="/" className={classes.logoPanel}>
                <Logo className={classes.logo}/>
                <Typography variant={"h6"} color="primary">Help educate</Typography>
            </Link>
            <div className={classes.actionButtons}>
                <Avatar style={{
                    backgroundColor: avatarColor,
                    color: emphasize(avatarColor, 1)
                }}>{logoName}</Avatar>
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton onClick={toggle.bind(this, !isOpen)}>
                    {isOpen ? <ChevronRightIcon/> : <MoreVertical/>}

                </IconButton>
            </div>
        </Toolbar>
    )
}

const mapStateToProps = store => ({
    firstName: store.authReducer.firstName,
    lastName: store.authReducer.lastName,
    avatarColor: store.authReducer.avatarColor,
});
export default connect(mapStateToProps)(ToggleableMenu);
