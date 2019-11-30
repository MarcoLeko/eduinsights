import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ReactComponent as Logo} from "../../assets/logo.svg";
import {Link as RouterLink} from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {registerNewUser} from "../../store/thunks";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: '4em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LogInLink = React.forwardRef((props, ref) => (<RouterLink innerRef={ref} {...props} />));
export default function SignUp() {
    const classes = useStyles();

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        showPassword: false,
    };

    const [values, setValues] = React.useState(initialState);

    function handleChange(prop) {
        return function (event) {
            setValues({...values, [prop]: event.target.value});
        }
    }

    function handleClickShowPassword() {
        setValues({...values, showPassword: !values.showPassword});
    }

    function handleMouseDownPassword(e) {
        e.preventDefault();
    }

    function handleSubmit(e) {
        e.preventDefault();

        registerNewUser({...values, avatarColor: generateAvatarColor()})
            .then(() => setValues(initialState))
    }

    function generateAvatarColor() {
        return "#000000".replace(/0/g, function () {
            return (~~(Math.random() * 16)).toString(16);
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <div className={classes.avatar}>
                    <Logo width={40}/>
                </div>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password-confirm"
                                label="Password confirm"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.passwordConfirm}
                                onChange={handleChange('passwordConfirm')}
                                id="password-confirm"
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit.bind(this)}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={LogInLink} to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
