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
import InputAdornment from "@material-ui/core/InputAdornment";
import { useForm, Controller, useWatch } from "react-hook-form";
import checkPasswordStrength from "../components/PasswordChecker";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        NZCSA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
}));

function handleClick() {
  alert("test");
}

// TODO: Modify to match figma design
export default function ResetPassword() {
  const classes = useStyles();
  const [passReset, setPassReset] = useState(false);
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirm: false,
    passStrength: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setPassReset(true);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
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
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          href="#"
        >
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
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (!errors.password) {
                          let score = checkPasswordStrength(e.target.value);
                          setValues({ ...values, passStrength: score });
                          console.log(score);
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
                      error={errors.password ? true : false}
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
                {errors.password && <span>This field is required</span>}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirm"
                  control={control}
                  defaultValue=""
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="password"
                      label="Confirm New Password"
                      name="confirm"
                      autoComplete="password"
                      type="password"
                      error={errors.confirm ? true : false}
                    />
                  )}
                />
                {errors.confirm && <span>This field is required</span>}
              </Grid>
            </Grid>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {passReset ? `Continue` : `Save`}
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
