import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { useState, useEffect } from 'react';
import { login } from '../api/connectBackend';

import { red } from '@material-ui/core/colors';
import RandomImagePicker from '../components/RandomImagePicker';
import Copyright from '../components/Copyright';
import { isMobile } from "react-device-detect";
import Alert from "@material-ui/lab/Alert";
import { isIos, isInStandaloneMode } from '../utils/pwaUtils';


// TODO: Modify to match figma design
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${RandomImagePicker()})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  backPanel: {
    // backgroundColor: 'black', 
    // opacity: 0.8,
  },

  logoNCopyright: {
    marginTop: "20%"
  },
  errorMessage: {
    color: red
  },
  forgotPasswordText: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    }

  },
  signupText: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "right",
    }

  }

}));

// TODO: Modify to match figma design
export default function SignInSide() {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSInstall, setShowIOSInstall] = useState(false);

  const isError = (condition) => hasErrors && condition;

  // useEffect(() => {
  //   props.changeDarkMode(true);
  // }, [])

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setShowIOSInstall(true);
    }
  }, []);

  const handleInstall = async () => {
    deferredPrompt.prompt();
    setDeferredPrompt(null);
  };

  async function handleSignIn() {
    setHasErrors(true);
    const loginInfo = { email, password }

    if (email.length > 0 && password.length > 0) {
      try {
        setLoading(true);
        const response = await login(loginInfo);
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          window.location.href = '/';
        }
      } catch (e) {
        setErrorMessage(e.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 8000);
        setLoading(false);
      }
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container className={classes.image}>
        <Grid item xs={0} sm={12 - 8} md={12 - 5} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.backPanel}
        >
          {deferredPrompt && isMobile && (
            <Alert onClose={() => setDeferredPrompt(null)} severity="info">
              Install our app on your homescreen to have quick access to your
              favorites
              <br></br>
              <Button onClick={handleInstall} color="inherit" size="small" variant="outlined">
                INSTALL
              </Button>
            </Alert>
          )}
          {showIOSInstall && (
            <Alert onClose={() => setShowIOSInstall(false)} severity="info">
              Install the NZCSA webapp! tap{" "}
              <img height="16px" src="/images/icons/share-icon.jpg" /> and then
              select <strong>Add To Home Screen</strong>. (Use the Safari browser)
            </Alert>
          )}
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {/* <form className={classes.form} noValidate> */}
            <div className={classes.form} noValidate>
              <Typography color="error">{errorMessage}</Typography>

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
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                error={isError(email.length === 0)}
                helperText={
                  isError(email.length === 0) && "Please enter your email!"
                }
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
                onChange={(e) => setPassword(e.target.value)}
                error={isError(password.length === 0)}
                helperText={
                  isError(password.length === 0) &&
                  "Please enter your password!"
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleSignIn()}
                disabled={false}
              >
                {loading ? (
                  <CircularProgress color="inherit" size="2rem" />
                ) : (
                  <>Sign In</>
                )}
              </Button>
              <Grid container alignContent='space between'>
                <Grid item xs={12} md>
                  <Link href="/forgotPassword" variant="body2" className={classes.forgotPasswordText}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs md>
                  <Link href="/signup" variant="body2" className={classes.signupText}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Container className={classes.logoNCopyright} >
                <Copyright />
              </Container>
              {/* </form> */}
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}