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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from "@material-ui/core/InputAdornment";
import { useForm, Controller, useWatch } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Alert from '@material-ui/lab/Alert';
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";
import checkPasswordStrength from "../components/PasswordChecker";
import { resetPassword } from "../api/connectBackend";
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
  textF: {
    borderRadius: "5px",
  },
  signin: {
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  eMessage: {
    marginBottom: theme.spacing(1),
  }
}));

// TODO: Modify to match figma design
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const classes = useStyles();
  const [isPasswordSame, setPasswordSame] = useState(true);
  const [passReset, setPassReset] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const onSubmit = (data) => {
    setHasErrors(true);
    console.log(data);
    if (data.password == data.confirm) {
      setPassReset(true);
      handleSubmitButton()
    }
  };

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

  async function handleSubmitButton() {

    // setPassReset(true);
    const res = await resetPassword(window.location.pathname, password);


  }

  async function handleSubmit() {
    setHasErrors(true);
    if (password.length > 0 && isPasswordSame) {
      try {

        setLoading(true);
        const res = await resetPassword(window.location.pathname, password);
        if (res.status === 200) {
          setLoading(false);

          setSuccess(true);
          setPassword('');
          setConfirmPassword('');
          setHasErrors(false);
          setErrorMessage('');

          setValues({
            showPassword: false,
            showConfirm: false,
            passStrength: ""
          });
        }
      } catch (e) {
        setLoading(false);
        setErrorMessage('Sorry, your password cannot be reset');
      }
    }
  }

  const redirectToLogin = () => {
    window.location.href = '/login';
  }


  const isError = (condition) => hasErrors && condition;

  return (
    <Grid>

      {success && <Alert onClose={() => { setSuccess(false) }}> Your password has been successfully reset. Please <a className={classes.signin} onClick={redirectToLogin}>log in</a>.</Alert>}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            {passReset ? `Your password has been reset` : `Reset your password`}
          </Typography>
          <Box mt={3}>
            {!passReset && (
              <Typography component="p" variant="body1" align="center">
                {`Reset your password below`}
              </Typography>
            )}
          </Box>
          <div
            className={classes.form}
            href="#"
          >

            {/* <div> */}

            <Typography color='error' className={classes.eMessage}>
              {errorMessage}
            </Typography>
            {!passReset && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {!passReset && (
                    <Typography component="p" variant="body1">
                      {`Password Strength: ` + values.passStrength}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
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
                        onChange={(e) => {
                          setPassword(e.target.value)
                          field.onChange(e.target.value);
                          let score = checkPasswordStrength(e.target.value);
                          setValues({ ...values, passStrength: score });
                          //console.log(score);
                          if (e.target.value.length === 0) {
                            setValues({ ...values, passStrength: "" });
                          }
                        }}
                        variant="outlined"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        autoComplete="password"
                        type={values.showPassword ? "text" : "password"}
                        value={password}
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
                <Grid item xs={12}>
                  <Controller
                    name="confirm"
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
                      />
                    )}
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
              onClick={handleSubmit}

            // onClick={passReset ? backtoLogin : handleSubmitButton}
            >
              {loading ? (
                <CircularProgress color="inherit" size="2rem" />
              ) : (
                <>{passReset ? `Continue` : `Submit`}</>
              )}

            </Button>
            <Grid container>
              <Link href="/login" variant="body2" color="primary">
                {"Return to log in"}
              </Link>
            </Grid>
          </div>
          {/* </div> */}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Grid>
  );
}
