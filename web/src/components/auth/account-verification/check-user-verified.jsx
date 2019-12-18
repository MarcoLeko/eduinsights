import React, {useCallback, useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import Link from "@material-ui/core/Link";
import {ReactComponent as Astronaut} from "../../../assets/astronaut.svg";
import {makeStyles} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import {checkEmailToken} from "../../../store/thunks";
import {receiveCurrentUser} from "../../../store/auth/auth-actions";
import {connect, useDispatch} from "react-redux";
import {requestValidationEmail} from "../../../store/auth/auth-action-creators";

const useStyle = makeStyles(theme => ({
    graphic: {
        padding: theme.spacing(1, 0, 2)
    }
}));

function CheckUserVerifiedGraphic() {
    const classes = useStyle();

    return (
        <>
            <Astronaut className="svg-with-circle"/>
            <div className="circle-background"/>
            <Typography variant="caption" className={classes.graphic}>
                Icons made by<Link color="secondary" href="https://www.flaticon.com/authors/smashicons"
                                   title="Smashicons"> Smashicons</Link> from
                <Link color="secondary" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</Link>
            </Typography>
        </>
    )
}

function UserVerifiedSuccess() {
    return (
        <>
            <CheckUserVerifiedGraphic/>
            <Typography color="primary" variant={"h6"}>Your account is now verified.</Typography>
            <Button component={RouterLink} to="/" startIcon={<PublicTwoToneIcon/>} variant="contained" color="secondary">Browse</Button>
        </>
    )
}

function UserVerifiedFailed() {

    const dispatch = useDispatch();

    function requestEmailValidationHandler() {
        dispatch(requestValidationEmail());
    }

    return (
        <>
            <CheckUserVerifiedGraphic/>
            <Typography color="primary" variant={"h6"}>Your token is expired.</Typography>
            <Button component={RouterLink} to="/" variant="contained" color="secondary"
                    onClick={requestEmailValidationHandler.bind(this)}>Verify Email</Button>
        </>
    )
}

function CheckUserVerified({token, updateUser, verified}) {

    const [loading, setLoading] = useState(true);

    const checkToken = useCallback(() => {
        checkEmailToken({token})
            .then((user) => updateUser(user))
            .finally(() => setLoading(false));
    }, [token, updateUser]);

    useEffect(() => {
        checkToken();
    }, [checkToken]);

    return (
        <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
            {loading ? <CircularProgress size={60} color={"secondary"}/> :
                verified ? <UserVerifiedSuccess/>
                    : <UserVerifiedFailed/>
            }
        </Grid>

    )
}

const mapStateToProps = store => ({
    verified: store.authReducer.emailVerified
});

const dispatchStateToProps = dispatch => ({
    updateUser: user => dispatch(receiveCurrentUser(user))
});

export default connect(mapStateToProps, dispatchStateToProps)(CheckUserVerified);