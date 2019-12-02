import * as React from "react";
import {Toolbar} from "@material-ui/core";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './home.scss';
import {connect} from "react-redux";
import {toggleSideBar} from "../../store/actions";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {emphasize} from "@material-ui/core/styles";

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
        display: 'flex'
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

function ToggleableMenu(props) {
    const classes = useStyles();

    return (
        <Toolbar className={classes.root}>
            <div className={classes.logoPanel}>
                <Logo className={classes.logo}/>
                <span className="toolbar-header">Help educate</span>
            </div>
            <div className={classes.actionButtons}>
                <Avatar style={{
                    backgroundColor: '#fff',
                    color: emphasize('#fff', .75)
                }}>OP</Avatar>
                <Divider className={classes.divider} orientation="vertical"/>
                <IconButton
                    onClick={props.toggle.bind(this, !props.isOpen)}
                >
                    {props.isOpen ? <ChevronRightIcon/> : <MoreVertical/>}

                </IconButton>
            </div>
        </Toolbar>
    )
}

const mapStateTopProps = store => ({
    isOpen: store.isOpen
});

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        toggle: (val) => dispatch(toggleSideBar(val)),
    }
};

export default connect(mapStateTopProps, mapDispatchToProps)(ToggleableMenu);
