import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MainCard from "../../components/MainCard";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
// import clsx from "clsx";
import { Typography, Avatar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { confirmAlert } from "react-confirm-alert";
import { signUpEvent } from "../../api/connectBackend";
import Upgrade from "../Dashboard/Upgrade";
import Payment from "../Dashboard/Payment";
import Notification from "../../components/Notification";
// import Image from "material-ui-image";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paper1: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  fixedHeight: {
    height: 240,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(8),
  },
  root: {
    display: "flex",
  },
}));

export default function EventDetail({
  isMember,
  attendedEvents,
  data,
  ...rest
}) {
  const classes = useStyles();
  // const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [time, setTime] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [event, setEvent] = useState({});

  let { id } = useParams();
  //console.log(data[id]);
  useEffect(() => {
    if (!!data[id]) {
      setEvent(data[id]);
      let startTime = data[id].startTime.replace("T", " ");
      startTime = startTime.slice(0, 16);
      setTime(startTime);
    }
  }, [data, id]);

  let history = useHistory();

  const handleCloseBtn = () => {
    history.goBack();
  };

  const handleOnClick = () => {
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
      if (!attendedEvents.includes(id)) {
        if (event.eventPrice > 0) {
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
                onClick: () => handleRegister(id),
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
    <div>
      <Notification notify={notify} setNotify={setNotify} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            edge="start"
            size="small"
            onClick={handleCloseBtn}
          >
            <CloseIcon />
          </IconButton>
          <MainCard img={event.eventImgUrl} />
        </Grid>
        {/* List of Events */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle2" color="primary">
              {time}
            </Typography>
            <Typography variant="h3">{event.eventName}</Typography>
            <Typography variant="h6" color="textSecondary">
              {event.eventLocation}
            </Typography>
          </Paper>
        </Grid>
        {/* Details */}
        <Grid item xs={12} md={9}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Details
            </Typography>
            <Typography variant="body1" component="p">
              {event.eventDescription}
            </Typography>
          </Paper>
          <Paper className={classes.paper1}>
            {event.eventPrice > 0 ? (
              <Typography variant="h5" gutterBottom>
                $ {(Math.round(event.eventPrice * 100) / 100).toFixed(2)}
              </Typography>
            ) : (
              <Typography variant="h5" gutterBottom>
                &nbsp;Free Event!
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => handleOnClick()}
              disableElevation
            >
              Register
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              WeChat Group
            </Typography>
            <img src={event.wechatImgUrl} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
      </Grid>
      <Upgrade open={upgradeOpen} close={setUpgradeOpen} />
      <Payment
        open={paymentOpen}
        close={setPaymentOpen}
        price={event.eventPrice}
        eventId={id}
      />
    </div>
  );
}
