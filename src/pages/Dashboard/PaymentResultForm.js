import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fade, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImg: {
    marginTop: "40%",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: 0,
      maxWidth: 560,
      height: "auto",
    },
  },
  successImg: {
    marginTop: "20%",
    maxWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: 0,
      maxWidth: 360,
      height: "auto",
    },
  },
}));

export default function PaymentResultForm(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const {
      status,
      merchant_reference,
      payment_method,
      currency,
      amount,
      signature,
    } = params;

    const authToken = localStorage.getItem("authToken");

    if (status === "paid" && authToken) {
      
      setSuccess(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Fade in timeOut={1000}>
        <div className={classes.root}>
          <img
            className={classes.loadingImg}
            src="./images/loading.gif"
            alt="loading"
          />
          <Typography variant="h6">Processing your transaction...</Typography>
        </div>
      </Fade>
    );
  }

  return (
    <Fade in timeOut={1000}>
      <div className={classes.root}>
        <h1></h1>
        {success ? (
          <img
            className={classes.successImg}
            src="./images/success.gif"
            alt="loading"
          />
        ) : (
          <img
            className={classes.loadingImg}
            src="./images/error.gif"
            alt="loading"
          />
        )}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              {success ? "Success!" : "Payment failed..."}
            </Typography>
            <Typography variant="body1" align="center">
              {success ? "Your payment was successful." : "Please Try Again."}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ maxWidth: 480 }}>
            <Link
              to="/"
              // onClick={handleFinishPayment}
              variant="outlined"
              fullWidth
              size="large"
              color={success ? "secondary" : "primary"}
              className={classes.continueBtn}
              component={Button}
            >
              Continue
            </Link>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}
