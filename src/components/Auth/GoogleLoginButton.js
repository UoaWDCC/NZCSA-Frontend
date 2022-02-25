import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import { login, signUp } from '../../api/connectBackend';
import GoogleIcon from '@mui/icons-material/Google';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    padding: theme.spacing(2),
    width: '90%',
  },

}));

export default function GoogleLoginButton({ setErrorMessage, setTimeout }) {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  // Google Login function
  const googleSuccess = async (res) => {
    try {
      const result = res.profileObj;
      const signInfo = {
        firstname: result.givenName.toLowerCase(),
        lastname: result.familyName.toLowerCase(),
        email: result.email.toLowerCase(),
        password: res.tokenId,
      };
      setLoading(true);
      try {
        const response = await signUp(signInfo);
        if (response.status === 201) {
          localStorage.setItem("authToken", response.data.token);
          window.location.href = '/';
        }
      } catch (e) {

        const response = await login({
          email: result.email.toLowerCase(),
          password: res.tokenId
        });

        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token);
          window.location.href = '/';
        }

      }
    } catch (e) {
      setErrorMessage("Your Google account has been registered manually, please use email and password to log in.");
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
      setLoading(false);
    }
  }

  const googleFailure = () => {
    setErrorMessage("Google login was unsuccessful");
    setTimeout(() => {
      setErrorMessage('');
    }, 8000);
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => {
          return <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            startIcon={loading || <GoogleIcon />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            {(loading) ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <>Login with Google</>
            )}
          </Button>
        }}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />

      <Divider className={classes.divider}>OR</Divider>
    </>
  )
}
