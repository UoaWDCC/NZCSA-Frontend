import React from "react";
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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    //marginTop: theme.spacing(0),
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

  submit: {
    margin: theme.spacing(3, 0, 0),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(168, 15, 21, 0.8)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textF :{
    backgroundColor: "rgba(245, 245, 245, 0.3)",
    borderRadius: "5px",
  }
}));

// TODO: Modify to match figma design
export default function SignUp() {
  const classes = useStyles();

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
            <form className={classes.form} noValidate>
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
                  />
                </Grid>
                <Grid item xs={12} className={classes.Name}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm password"
                    label="Please confirm your password"
                    type="confirm password"
                    id="confirm password"
                    autoComplete="confirm password"
                    className={classes.textF}
                  />
                </Grid>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
                          value="Male"
                          color="primary"
                        />
                      }
                      label="Male"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon />}
                          value="Female"
                          color="primary"
                        />
                      }
                      label="Female"
                    />
                  </Grid>
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
                variant="outlined"
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
            </form>
          </div>
          <Box mt={5}  align="center">
            <img className={classes.logo} src={logo} alt="cur" align="center" />
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
