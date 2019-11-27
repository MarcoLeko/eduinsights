import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import React from "react";
import Copyright from "../shared/copyright";
import muiBackground from "../shared/material-ui-background";
import Divider from "@material-ui/core/Divider";
import deviceFrame from '../../assets/device-frame.png';
import AppPreview from '../../assets/app-preview-1.png';
import './log-in.scss';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        background: muiBackground
    },
    background: {
        backgroundColor: 'rgba(62,62,62,0.4)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    header: {
        padding: theme.spacing(3, 5, 0)
    }
}));

function LogIn() {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Box component={Grid} item
                 container direction="column" justify="space-around"
                 xs={false} sm={7} md={6}
                 display={{xs: 'none !important', sm: 'flex !important', md: 'flex !important'}}
                 className={classes.background}>
                <div className={classes.header}>
                    <Typography variant="h3" gutterBottom>
                        Help-educate.com
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>Support educational institutes, school or libraries
                        with
                        your givings.
                        See the development in school infrastructure around the world provided by the statistics
                        of <Link color="primary"
                                 href="https://apiportal.uis.unesco.org/">UNESCO</Link>. Every little donation
                        counts.
                    </Typography>
                    <Divider variant="middle"/>
                </div>
                <div className="app-preview-content"
                    style={{backgroundImage: `url(${AppPreview})`}}
                >
                    <img className="device-frame" src={deviceFrame} height={500} width={250} alt="device frame"/>
                </div>

            </Box>
            <Grid item xs={12} sm={5} md={6} component={Paper} elevation={6} square
                  style={{backgroundColor: 'transparent'}}>
                <div className={classes.paper}>
                    <div className={classes.avatar}>
                        <Logo width={40}/>
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default LogIn;
