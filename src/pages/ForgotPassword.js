import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { forgetPassword } from "../api/connectBackend";
import Copyright from '../components/Copyright';


// TODO: Modify to match figma design
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  eMessage: {
    marginBottom: theme.spacing(2),
  }
}));

// TODO: Modify to match figma design
export default function ForgotPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const isError = (condition) => hasErrors && condition;

  async function handleSubmit() {
    setHasErrors(true);
    // TODO: Check the email address & format here

    if (email.length > 0) {
      //setEmailSent(true);
      try {
        setLoading(true);
        const res = await forgetPassword(email);
        if (res.status === 200) {
          setLoading(false);
          setEmailSent(true);
        }
      } catch (e) {
        setLoading(false);
        setErrorMessage(e.response.data.error);
        setTimeout(() => {
          setErrorMessage('');
        }, 8000);
      }
    }
  }
  function backtoLogin() {
    //this.props.history.push('/login')
    window.location.href = "/login"
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {emailSent ? `Ok, we sent you an email!` : `Forgot your password?`}
        </Typography>
        <Box mt={3}>
          <Typography component="body" variant="body1" align="center">
            {emailSent
              ? `Please follow the instructions in the email to reset your password`
              : `We'll send you an email to help you reset your password.`}
          </Typography>
        </Box>
        <div className={classes.form} noValidate >
          <Typography color='error' className={classes.eMessage}>
            {errorMessage}
          </Typography>
          {!emailSent && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={e => setEmail(e.target.value.toLowerCase())}
                  error={isError(email.length === 0)}
                  helperText={isError(email.length === 0) && "Please enter your email!"}
                />
              </Grid>
            </Grid>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={emailSent ? backtoLogin : handleSubmit}
          >
            {loading ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <>{emailSent ? `Done` : `Continue`}</>
            )}
          </Button>
          <Grid container>
            <Link href="/login" variant="body2" color="primary">
              {"Return to log in"}
            </Link>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}