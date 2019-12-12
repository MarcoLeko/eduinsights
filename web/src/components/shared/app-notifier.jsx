import {Slide} from "@material-ui/core";
import React from 'react';
import {connect} from "react-redux";
import {clearMessage} from "../../store/alert/alert-actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        padding: theme.spacing(0, 2),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main
    }
}));

function AppNotifier({message, clearMessage}) {

    const classes = useStyles();

    function handleClose() {
        clearMessage();
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={Boolean(message)}
            autoHideDuration={2000}
            onClose={handleClose.bind(this)}
            TransitionComponent={Slide}
        ><SnackbarContent
            className={classes.root}
            aria-describedby="message-id"
            message={<span id="message-id">{message}</span>}
            />
        </Snackbar>
    );
}

const mapStateToProps = store => ({
    message: store.alertReducer.message
});

const dispatchMapToProps = dispatch => ({
    clearMessage: () => dispatch(clearMessage())
});
export default connect(mapStateToProps, dispatchMapToProps)(AppNotifier);
