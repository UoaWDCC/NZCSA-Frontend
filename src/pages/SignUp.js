import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import backgroundImage from "../assets/bg.png";
import signInSymbol from "../assets/signInSymbol.png";
import logo from "../assets/logo.png";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { signUp } from '../api/connectBackend';
//import emailSymbol from "../assets/email symbol.png"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">

        NZCSA
      </Link>{" "}
      {new Date().getFullYear()}
      {""}

    </Typography>
  );
}

// TODO: Modify to match figma design


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 2.6)),url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginTop: theme.spacing(8),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {

    //marginTop: theme.spacing(11),
    marginTop: "5%",
    backgroundColor: "primary",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    //marginTop: theme.spacing(10),
    marginTop: "5%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  textF: {
    borderRadius: "5px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


}));

// TODO: Modify to match figma design
export default function SignUp(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [isPasswordSame, setPasswordSame] = useState(true);

  const isError = (condition) => hasErrors && condition;

  useEffect(() => {
    props.changeDarkMode(true);
  }, [])

  function handlePasswordError() {
    if (confirmPassword !== password) {
      setPasswordSame(false);
    } else {
      setPasswordSame(true);
    }
  }
  async function handleRegister() {
    setHasErrors(true);
    const signInfo = { firstname: firstName, lastname: lastName, email: email, password: password }
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && isPasswordSame) {

      const response = await signUp(signInfo);
    }
  }

  return (

    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} className={classes.image}>
        <Container maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar src={signInSymbol} className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {/* <form className={classes.form} noValidate> */}
            <div className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    className={classes.textF}
                    onChange={e => setFirstName(e.target.value)}
                    error={isError(firstName.length === 0)}
                    helperText={isError(firstName.length === 0) && "Please enter your first name!"}
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
                    autoComplete="lname"
                    className={classes.textF}
                    onChange={e => setLastName(e.target.value)}
                    error={isError(lastName.length === 0)}
                    helperText={isError(lastName.length === 0) && "Please enter your last name!"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    className={classes.textF}
                    onChange={e => setEmail(e.target.value)}
                    error={isError(email.length === 0)}
                    helperText={isError(email.length === 0) && "Please enter your email!"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={classes.textF}
                    onChange={e => setPassword(e.target.value)}
                    error={isError(password.length === 0)}
                    helperText={isError(password.length === 0) && "The password cannot be empty!"}
                  />
                </Grid>
                <Grid item xs={12} className={classes.Name}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm password"
                    label="Confirm Password"
                    type="password"
                    id="confirm password"
                    autoComplete="confirm password"
                    className={classes.textF}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onBlur={handlePasswordError}
                    error={!isPasswordSame || isError(confirmPassword.length === 0)}
                    helperText={(!isPasswordSame && "The comfirm password must be same to before!") || (isError(confirmPassword.length === 0) && "The password cannot be empty!")}

                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleRegister()}
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" style={{ color: "#fff" }}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              {/* </form> */}
            </div>
          </div>
          <Box mt={5} align="center">
            <img className={classes.logo} src={logo} alt="cur" align="center" />
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>

  );
}
