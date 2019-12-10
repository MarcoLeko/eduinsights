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
import {Link as RouterLink, useHistory} from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import useForm from "react-hook-form";
import {emailRegex} from "./auth-utils";
import {connect} from "react-redux";
import {signUp} from "../../store/auth/auth-action-creators";

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

function SignUp({signUp}) {
    const classes = useStyles();
    const history = useHistory();
    const {register, handleSubmit, errors, watch, triggerValidation} = useForm({
        defaultValues: {
            persistLogin: false
        }
    });

    const onSubmit = (data, e) => {
        e.preventDefault();

        triggerValidation()
            .then(() => signUp({...data, avatarColor: generateAvatarColor()}))
            .then(() => e.target.reset())
            .then(() => history.push('/'))
    };

    const [showPassword, setShowPassword] = React.useState(false);

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(e) {
        e.preventDefault();
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
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                error={!!errors.firstName}
                                inputRef={register({
                                    required: 'First name is required',
                                    maxLength: {value: 30, message: 'First name max. length is 30.'}
                                })}
                                helperText={errors.firstName && errors.firstName.message}
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
                                error={!!errors.lastName}
                                inputRef={register({
                                    required: 'Last name is required',
                                    maxLength: {value: 30, message: 'Last name max. length is 30.'}
                                })}
                                helperText={errors.lastName && errors.lastName.message}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                error={!!errors.email}
                                inputRef={register({
                                    required: 'Email is required.',
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Email address is invalid.'
                                    }
                                })}
                                helperText={!!errors.email && errors.email.message}
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
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                error={!!errors.password}
                                inputRef={register({
                                    required: 'Password is required.',
                                    minLength: {value: 5, message: 'Password min. length is 5.'},
                                    maxLength: {value: 20, message: 'Password max. length is 20.'}
                                })}
                                helperText={!!errors.password && errors.password.message}
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
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
                                name="passwordConfirm"
                                label="Password confirm"
                                id="passwordConfirm"
                                error={!!errors.passwordConfirm}
                                inputRef={register({
                                    validate: (value) => value === watch('password') || 'The passwords do not match.'// value is from password2 and watch will return value from password1
                                })}
                                helperText={!!errors.passwordConfirm && errors.passwordConfirm.message}
                                type={showPassword ? 'text' : 'password'}
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

const mapStateToProps = ({errors}) => ({
    errors
});
const mapDispatchToProps = dispatch => ({
    signUp: user => dispatch(signUp(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
