import * as React from "react";
import {Toolbar} from "@material-ui/core";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import IconButton from "@material-ui/core/IconButton";
import MoreVertical from "@material-ui/icons/MoreVert";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './home.scss';
import {connect} from "react-redux";
import {toggleSideBar} from "../../store/actions";

function ToggleableMenu(props) {

    return (
        <Toolbar style={{minHeight: '48px'}}>
            <Logo style={{width: '40px', marginRight: '1em'}}/>
            <span className="toolbar-header">Help educate</span>
            <IconButton
                style={{right: 0, position: 'absolute'}}
                onClick={props.toggle.bind(this, !props.isOpen)}
            >
                {props.isOpen ? <ChevronRightIcon/> : <MoreVertical/>}

            </IconButton>
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
