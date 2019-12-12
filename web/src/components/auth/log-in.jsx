import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from 'react-router-dom';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import React from "react";
import Copyright from "../shared/copyright";
import muiBackground from "../shared/material-ui-background";
import AppPreview from '../../assets/app-preview-1.png';
import './log-in.scss';
import appStoreLogo from '../../assets/app-store.png';
import googlePlayLogo from '../../assets/google-play.png';
import useForm from "react-hook-form";
import {emailRegex} from "./auth-utils";
import {logIn} from "../../store/auth/auth-action-creators";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        background: muiBackground,
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
    }
}));

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const RegisterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const ForgotPasswordLink = React.forwardRef((props, ref) => (<RouterLink innerRef={ref} {...props} />));

function LogIn({logIn}) {
    const classes = useStyles();
    const {register, handleSubmit, errors, triggerValidation} = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();

        triggerValidation()
            .then(() => logIn(data))
            .then(() => e.target.reset())
    };

    return (
        <Grid container component="main" style={{height: '100vh', flexDirection: 'row-reverse'}}>
            <CssBaseline/>
            <Box component={Grid} item
                 container direction="column" justify="flex-start"
                 xs={false} sm={7} md={6}
                 className={classes.root}
                 display={{xs: 'none !important', sm: 'flex !important', md: 'flex !important'}}>
                <article className="article-panel">
                    <div className="login-image-panel">
                        <div className="app-preview-content" style={{backgroundImage: `url(${AppPreview})`}}/>
                        <div className="device-frame-shadow"/>
                    </div>
                </article>
                <div className="app-store-panel">
                    <div className="image-panel">
                        <img src={appStoreLogo} alt="download on app store" height={40} style={{marginRight: '2em'}}/>
                        <img src={googlePlayLogo} alt="download on google play" height={40}/>
                    </div>
                </div>
            </Box>
            <Grid item xs={12} sm={5} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography variant="h5" color="primary" align="center" gutterBottom>Help-educate.com</Typography>
                    <div className={classes.avatar}>
                        <Logo width={40}/>
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            error={!!errors.email}
                            inputRef={register({
                                required: 'Email is required.',
                                pattern: {
                                    value: emailRegex,
                                    message: 'Email address is invalid.'
                                }
                            })}
                            helperText={!!errors.email && errors.email.message}
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
                            error={!!errors.password}
                            inputRef={register({
                                required: 'Password is required.',
                                minLength: {value: 5, message: 'Password min. length is 5.'},
                                maxLength: {value: 20, message: 'Password max. length is 20.'}
                            })}
                            helperText={!!errors.password && errors.password.message}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                                <Link component={ForgotPasswordLink} to="/password/reset/" variant="body2">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RegisterLink} to="/sign-up" variant="body2">
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

const mapStateToProps = ({errors}) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    logIn: user => dispatch(logIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
