import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Fade, Typography, Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImg: {
    maxWidth: 280,
    [theme.breakpoints.up("sm")]: {
      maxWidth: 560,
      height: "auto",
    },
  },
  indicatorText: {
    position: "absolute",
    top: "20%",
  },
}));

export default function PaymentResult(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const success = props.success;

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      {success ? (
        <div className={classes.root}>
          <img
            className={classes.loadingImg}
            src="./images/loading.gif"
            alt="loading"
          />
          <Typography variant="h6">Processing your transaction...</Typography>
        </div>
      ) : (
        <div className={classes.root}>
          <img
            className={classes.loadingImg}
            src="./images/error.gif"
            alt="loading"
          />
          <div className={classes.indicatorText}>
            <Typography color="primary" variant="h3" align="center">Payment failed...</Typography>
            <Typography variant="h6" align="center">Please Try Again</Typography>
          </div>
          <div className={classes.continueBtn}>
            <Button variant="contained">Continue</Button>
          </div>
        </div>
      )}
    </Fade>
  );
}
