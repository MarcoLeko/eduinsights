import React, {useState} from 'react';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2),
        minWidth: 48,
        width: 48,
        height: 56,
        zIndex: 9999
    }
}));

function MapSideBar() {
    const classes = useStyle();
    const [open, setOpen] = useState(false);

    return (
        <><Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={open ? <ArrowBackIosRoundedIcon/> : <ArrowForwardIosRoundedIcon/>}
            onClick={() => setOpen(!open)}
        />
        </>
    )
}

export default MapSideBar;
