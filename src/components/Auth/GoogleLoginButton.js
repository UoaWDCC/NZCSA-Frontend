import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { googleAuthLogin } from '../../api/connectBackend';
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

  const googleSuccess = async (res) => {
    try {
      const info = {
        token: res.tokenId
      };
      const response = await googleAuthLogin(info);
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.token);
        window.location.href = '/';
      }
    } catch (e) {
      setErrorMessage("Your Google account can not be logged in, please try again.");
      setTimeout(() => {
        setErrorMessage('');
      }, 8000);
    }
  }

  const googleFailure = () => {
    setErrorMessage("Google login is not working...");
    setTimeout(() => {
      setErrorMessage('');
    }, 8000);
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        theme="dark"
        className={classes.submit}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />

      <Divider className={classes.divider}>OR</Divider>
    </>
  )
}
