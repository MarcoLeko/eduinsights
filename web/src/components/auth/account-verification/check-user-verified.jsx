import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";

function CheckUserVerified({token}) {

    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setTimeout(() => setVerified(true), 5000);
        }, 5000)
        // checkEmailToken({token})
    }, [token]);

    return (
        <Grid container justify={"center"} alignItems={"center"} direction={"column"}>
            {loading ? <CircularProgress color={"secondary"}/> :
                verified ? <Typography color="primary" variant={"h6"}>Your account is now verified.</Typography>
                    : <>
                        <Typography color="primary" variant={"h6"}>Your token is expired.</Typography>
                        <Button variant="contained" color="secondary">Verify Email</Button>
                    </>
            }
        </Grid>

    )
}

export default CheckUserVerified