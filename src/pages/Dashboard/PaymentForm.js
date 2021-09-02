import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  Divider,
  CardContent,
  Card,
  Container,
  Box,
  Fade,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 8,
    },
  },
  payBtn: {
    minWidth: "136px",
    height: "56px",
    borderWidth: 3,
    textTransform: "none",
  },
  selectedBtn: {
    borderColor: theme.palette.secondary.main,
  },
  customRadioBtn: {
    display: "flex",
    justifyContent: "start",
    paddingTop: 3,
    paddingBottom: 36,
  },
  detailCard: {
    display: "flex",
  },
}));

export default function UpgradeForm(props) {
  const classes = useStyles();
  const [method, setMethod] = React.useState("polipay"); // Possible states are "wechat", "alipay" and "polipay"
  const [loading, setLoading] = React.useState(false);

  // console.log(currentUser);

  const handlePayment = async () => {
    try {
      // console.log("payment details");
      // console.log(method, price, orderType, eventId);
      const response = await makePayment(method, price, orderType);
      if (response.status === 200) {
        // console.log(response.data);
        const { merchantReference } = response.data;
        const userId = currentUser._id;
        await handleOrder(merchantReference, userId, method, eventId);
        window.location.href = `${response.data.data.host_url}/${response.data.data.nonce}`;
      } else {
        // console.log("error");
        window.location.href = "/checkout";
      }
    } catch (error) {
      // console.log(error);
      window.location.href = "/checkout";
    }
  };

  const handleOrder = async (
    merchantReference,
    userId,
    paymentMethod,
    eventId
  ) => {
    // console.log("order details");
    // console.log(merchantReference, userId, paymentMethod, eventId);
    try {
      const response = await createOrder({
        merchantReference,
        userId,
        paymentMethod,
        eventId,
        orderType,
        price
      });
      // merchantReference,
      // userId,
      // paymentMethod
      if (response.status === 200) {
        // console.log("order created!");
      } else {
        // console.log("error");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSumbitPaymentForm = () => {
    props.handleNext();
};

  return (
    <Fade in={true} timeout={1000}>
      <form>
        <Container>
          <Grid container spacing={6} className={classes.root}>
            <Grid item xs={8}>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={2}>
                {/* <Grid item xs>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      value === "wechat" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setValue("wechat")}
                  >
                    <img
                      alt="wechat"
                      width="auto"
                      height="56"
                      src="./images/wechat-pay.svg"
                    />
                  </Button>
                </Grid> */}
                <Grid item xs>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      value === "alipay" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setValue("alipay")}
                  >
                    <img
                      alt="alipay"
                      width="auto"
                      height="36"
                      src="./images/alipay.svg"
                    />
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      value === "polipay" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setValue("polipay")}
                  >
                    <img
                      src="https://resources.apac.paywithpoli.com/mobile/mobile4.png"
                      width="auto"
                      height="46"
                      alt="POLi Logo"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Order details
              </Typography>
              <Grid item xs>
                <Card variant="outlined" className={classes.detailCard}>
                  <CardContent style={{ width: "100%" }}>
                    <Grid container justify="space-between">
                      <div style={{ display: "flex", paddingBottom: 15 }}>
                        <img
                          alt="wechat"
                          width="auto"
                          height="56"
                          src="./images/logo.png"
                        />
                        <Box mx={2}>
                          {props.orderType == "membership-payment" ? 
                            (<Typography variant="h6" component="h2">
                                NZCSA Membership Fee
                            </Typography>) :
                            (<Typography variant="h6" component="h2">
                              Event Price
                            </Typography>)}
                        </Box>
                      </div>
                      <div>
                        <Typography variant="h6" component="h2">
                          $ {(Math.round(price * 100) / 100).toFixed(2)}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {orderType === "membership-payment"
                            ? "per year"
                            : null}
                        </Typography>
                        {props.orderType == "membership-payment" ? (
                          <Typography
                            className={classes.pos}
                            color="textSecondary"
                          >
                            per year
                          </Typography>) : (null)}
                      </div>
                    </Grid>
                    <Divider />
                    <Grid
                      style={{ marginTop: 15 }}
                      container
                      justify="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">Order Total:</Typography>
                      <Typography variant="h3">
                        <Box style={{ fontSize: 32 }} display="inline">
                          $
                        </Box>
                        {(Math.round(price * 100) / 100).toFixed(2) }
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  style={{ maxWidth: 360, height: 50, borderRadius: 24 }}
                  fullWidth
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={() => handleSumbitPaymentForm()}
                >
                  Pay
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Fade>
  );
}
