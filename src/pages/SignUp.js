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
import CircularProgress from '@material-ui/core/CircularProgress';

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
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";
import checkPasswordStrength from "../components/PasswordChecker";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Controller, useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Copyright from '../components/Copyright';
//import emailSymbol from "../assets/email symbol.png"



// TODO: Modify to match figma design


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 2.6)),url(${backgroundImage})`,
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

    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    //marginTop: theme.spacing(10),
    marginTop: "2%",
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
    opacity: 1,
  },
  message: {
    marginBottom: theme.spacing(2),
  },
  pStrength: {
    marginBottom: theme.spacing(1),
    // color: 'lightgrey'
  },
  signin: {
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
}));

// TODO: Modify to match figma design
export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [isPasswordSame, setPasswordSame] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirm: false,
    passStrength: "",
  });

  const {
    control,
    formState: { errors },
  } = useForm();

  const isError = (condition) => hasErrors && condition;

  // useEffect(() => {
  //   props.changeDarkMode(true);
  // }, [])

  function handlePasswordError() {
    if (confirmPassword !== password) {
      setPasswordSame(false);
    } else {
      setPasswordSame(true);
    }
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirm: !values.showConfirm });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  }

  async function handleRegister() {
    setHasErrors(true);
    const signInfo = { firstname: firstName, lastname: lastName, email: email, password: password }
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && isPasswordSame) {
      try {

        setLoading(true);
        const response = await signUp(signInfo);
        if (response.status === 201) {
          setLoading(false);

          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setHasErrors(false);
          setSuccess(true);
          setMessage('');

          setValues({
            showPassword: false,
            showConfirm: false,
            passStrength: ""
          });
        }


        console.log(response);
      } catch (e) {
        //console.log(e.response.data.info);
        //console.log(e.response.data);

        setLoading(false);
        if (e.response.data.info === 'User validation failed: email: Please provide a valid email') {
          setMessage('The email that you provided is invalid, please provide a valid email.');
        } else {

          setMessage('Email is already registered, please sign in.')
        }
      }
    }
  }

  return (

    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} className={classes.image}>

        {success && <Alert variant="filled" onClose={() => { setSuccess(false) }}> Registered successfully. Please <a className={classes.signin} onClick={redirectToLogin}>sign in</a>.</Alert>}

        <Container maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOpenIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {/* <form className={classes.form} noValidate> */}
            <div className={classes.form} noValidate>
              <Typography color='error' className={classes.message}>
                {message}
              </Typography>
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
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    error={isError(firstName.length === 0)}
                    helperText={isError(firstName.length === 0) && "Please enter your first name"}
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
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    error={isError(lastName.length === 0)}
                    helperText={isError(lastName.length === 0) && "Please enter your last name"}
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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    error={isError(email.length === 0)}
                    helperText={isError(email.length === 0) && "Please enter your email"}
                  />
                </Grid>
                <Grid item xs={12}>

                  <Typography component="p" variant="body1" className={classes.pStrength}>

                    {`Password Strength: ` + values.passStrength}
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""

                    rules={{
                      required: true, minLength: 6, pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
                    }}

                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={values.showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        className={classes.textF}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          let score = checkPasswordStrength(e.target.value);
                          setValues({ ...values, passStrength: score });
                          if (e.target.value.length === 0) {
                            setValues({ ...values, passStrength: "" });
                          }
                        }}
                        error={isError(password.length === 0)}
                        helperText={isError(password.length === 0) && "The password cannot be empty"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                    <VisibilityOff />
                                  )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <PasswordStrengthIndicator input={values.passStrength} />
                </Grid>
                <Grid item xs={12} className={classes.Name}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm password"
                    label="Confirm Password"
                    type={values.showConfirm ? "text" : "password"}
                    id="confirm password"
                    autoComplete="confirm password"
                    className={classes.textF}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onBlur={handlePasswordError}
                    error={!isPasswordSame || isError(confirmPassword.length === 0)}
                    helperText={(!isPasswordSame && "The comfirm password must be same to before") || (isError(confirmPassword.length === 0) && "The password cannot be empty")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            {values.showConfirm ? (
                              <Visibility />
                            ) : (
                                <VisibilityOff />
                              )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    labelPlacement="end"
                  /> */}
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
                {loading ? (
                  <CircularProgress color="inherit" size="2rem" />
                ) : (
                    <>Sign Up</>
                  )}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2" >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              {/* </form> */}
            </div>
          </div>
          <Box mt={5} align="center">
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>

  );
}
