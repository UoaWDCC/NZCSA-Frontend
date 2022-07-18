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
  CircularProgress,
} from "@material-ui/core";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import clsx from "clsx";
import { makePayment, createOrder } from "../../api/connectBackend";
// import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

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
  transferBox: {
    textTransform: "none",
    borderWidth: 3,
  },
  selectedBtn: {
    borderColor: theme.palette.secondary.main,
  },
  customRadioBtn: {
    display: "flex",
    justifyContent: "start",
    paddingTop: 36,
    paddingBottom: 36,
  },
  detailCard: {
    display: "flex",
  }
}));

export default function PaymentForm({ orderType, price, eventId }) {
  const { currentUser } = useAuth();
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
    setLoading(true);
    handlePayment();
    // handleOrder();
  };

  const handleClickCopy = () => {
    navigator.clipboard.writeText('12-3011-0933221-00')
    alert("Copied 12-3011-0933221-00");
  }

  return (
    <Fade in={true} timeout={1000}>
      <form>
        <Container>
          <Grid container spacing={3} className={classes.root} >
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      method === "polipay" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setMethod("polipay")}
                  >
                    <img
                      src="https://resources.apac.paywithpoli.com/mobile/mobile4.png"
                      width="auto"
                      height="46"
                      alt="POLi Logo"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      method === "alipay" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setMethod("alipay")}
                  >
                    <img
                      alt="alipay"
                      width="auto"
                      height="36"
                      src="./images/alipay.svg"
                    />
                  </Button>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    fullWidth
                    className={clsx(
                      classes.payBtn,
                      method === "wechat" && classes.selectedBtn
                    )}
                    variant="outlined"
                    onClick={() => setMethod("wechat")}
                  >
                    <img
                      alt="wechat"
                      width="auto"
                      height="56"
                      src="./images/wechat-pay.svg"
                    />
                  </Button>
                </Grid>
                <Grid item md={12} xs={12} justifyContent="center">
                  <Typography variant="h6" style={{ textAlign: "center", fontWeight: 600 }}>Or</Typography>
                </Grid>
                <Grid item md={12} xs={12} justifyContent="center">
                  <Button
                    fullWidth
                    className={
                      classes.transferBox}
                    variant="outlined"
                    onClick={() => handleClickCopy()}
                  >
                    <Grid container justifyContent="center">
                      <Grid item xs={12} md={12}>
                        <Typography>
                          Bank Transfer:
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container direction="row" justifyContent="center">
                          <Typography style={{ marginRight: "1rem" }} >
                            12-3011-0933221-00
                          </Typography>
                          <ContentCopyIcon />
                        </Grid>

                      </Grid>
                      <Grid item>
                        <Typography style={{ fontWeight: 600 }}>
                          Please show the screenshot of the payment to our commitees or Customer Service
                        </Typography>
                      </Grid>
                    </Grid>

                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} >
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
                          <Typography variant="h6" component="h2">
                            {orderType === "membership-payment"
                              ? "2022 NZCSA Membership Fee"
                              : "Event Fee"}
                          </Typography>
                        </Box>
                      </div>
                      <div>
                        <Typography variant="h6" component="h2">
                          ${(Math.round(price * 100) / 100).toFixed(2)}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {orderType === "membership-payment"
                            ? "per year"
                            : null}
                        </Typography>
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
                        {(Math.round(price * 100) / 100).toFixed(2)}
                      </Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={() => handleSumbitPaymentForm()}
                  // disabled={loading}
                  title="Delete"
                >
                  {loading ? (
                    <CircularProgress color="inherit" size="2rem" />
                  ) : (
                    <>Pay</>
                  )}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Fade>
  );
}
