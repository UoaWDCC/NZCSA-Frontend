import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
// import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { signUpEvent } from "../api/connectBackend";
import Upgrade from "../pages/Dashboard/Upgrade";
import Payment from "../pages/Dashboard/Payment";
import Notification from "./Notification";
import AutoGenerateForm from "./formGenerator/AutoGenerateForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
  },
  media: {
    height: 140,
  },
}));

export default function EventCard(props) {
  // const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [eventInfoDialogOpen, setEventInforDialogOpen] = useState(false);

  const isMember = props.isMember;
  const attendedEvents = props.attendedEvents;
  // console.log(props)
  const classes = useStyles({
    root: {
      Width: "100%",
      height: 300,
    },
    img: {
      // height: 277,
      height: 180,
    },
  });

  // const handleUpgradeOpen = () => {
  //   setUpgradeOpen(true);
  // };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleEventInformDialog = () => {
    setEventInforDialogOpen(!eventInfoDialogOpen);
  };

  const handleOnClick = (eventId, price) => {
    console.log("IN");
    // Need to change -testing
    handleEventInformDialog();

    if (!isMember) {
      confirmAlert({
        message: "You have to be a member to join this event.",
        buttons: [
          {
            label: "Cancel",
            onClick: () => console.log(""),
          },
          {
            label: "Upgrade",
            onClick: () => setUpgradeOpen(true),
          },
        ],
      });
    } else {
      if (!attendedEvents.includes(eventId)) {
        setPrice(price);
        if (price > 0) {
          setPaymentOpen(true);
        } else {
          confirmAlert({
            message: "Do you want to join this event?",
            buttons: [
              {
                label: "No",
                onClick: () => console.log(""),
              },
              {
                label: "Yes",
                onClick: () => {
                  if (eventId == "612fe680fef8fa000437d192") {
                    setNotify({
                      isOpen: true,
                      message: "Sorry, this Event is now closed",
                      type: "warning",
                    });
                  } else {
                    handleRegister(eventId);
                  }
                },
              },
            ],
          });
        }
      } else {
        setNotify({
          isOpen: true,
          message: "You have already signed up for this event",
          type: "warning",
        });
      }
    }
  };

  async function handleRegister(eventId) {
    console.log(eventId);
    const registerInfo = { eventId };
    try {
      // setLoading(true);
      const response = await signUpEvent(registerInfo);
      if (response.status === 200) {
        setNotify({
          isOpen: true,
          message: "Successfully signed up for this event!",
          type: "success",
        });
      }
      //console.log(response.data);
    } catch (e) {
      // setLoading(false);
      console.log(e.response.data.error);
      setNotify({
        isOpen: true,
        message: e.response.data.error,
        type: "error",
      });
    }
  }

  return (
    <Router>
      <Notification notify={notify} setNotify={setNotify} />
      {props.isYourPage || props.tab == "previous" ? (
        <Card className={classes.root}>
          <Link to={`/yourEvents/${props.id}`} component={CardActionArea}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={props.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="p" component="p">
                {props.date}
              </Typography>
              <Typography variant="h6" component="h5">
                {props.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {props.location}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      ) : (
        <Card className={classes.root}>
          <Link to={`${props.id}`} component={CardActionArea}>
            <CardMedia
              className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={props.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="p" component="p">
                {props.date}
              </Typography>
              <Typography variant="h6" component="h5">
                {props.title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {props.location}
              </Typography>
            </CardContent>
          </Link>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleOnClick(props.id, props.price)}
              disableElevation
            >
              Register
            </Button>
          </CardActions>
        </Card>
      )}
      <Upgrade open={upgradeOpen} close={setUpgradeOpen} />
      <AutoGenerateForm
        open={eventInfoDialogOpen}
        close={setEventInforDialogOpen}
      />
      <Payment
        open={paymentOpen}
        close={setPaymentOpen}
        price={price}
        eventId={props.id}
      />
    </Router>
  );
}
