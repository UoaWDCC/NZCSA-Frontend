import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MainCard from "../../components/MainCard";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
// import clsx from "clsx";
import { Typography, Avatar, Link } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { confirmAlert } from "react-confirm-alert";
import { Dialog, DialogContentText, DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { signUpEvent } from "../../api/connectBackend";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Upgrade from "../Dashboard/Upgrade";
import Payment from "../Dashboard/Payment";
import Notification from "../../components/Notification";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import UserDetailForm from "./UserDetailForm";
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
    marginBottom: theme.spacing(2),
  },
  root: {
    display: "flex",
  },
  dialog: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  dialogAction: {
    paddingRight: theme.spacing(2),
  },
}));

export default function EventDetail({
  isMember,
  attendedEvents,
  data,
  weChat,
  ...rest
}) {
  const classes = useStyles();
  // const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  // const [openUserDetailForm, setOpenUserDetailForm] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [time, setTime] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [event, setEvent] = useState({});
  const [openNonMemberConfirmDialog, setOpenNonMemberConfirmDialog] =
    useState(false);
  const [openMemberConfirmDialog, setOpenMemberConfirmDialog] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const active = data.filter((event) => event._id == id)[0];
    if (!!active) {
      setEvent(active);
      let startTime = active.startTime.replace("T", " ");
      startTime = startTime.slice(0, 16);
      setTime(startTime);
    }
  }, [data, id]);

  let history = useHistory();

  const handleCloseBtn = () => {
    history.goBack();
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleOnClick = () => {
    if (!isMember) {
      setOpenNonMemberConfirmDialog(true);
    } else {
      if (!attendedEvents.includes(id)) {
        if (event.eventPrice > 0) {
          setPaymentOpen(true);
        } else {
          setOpenMemberConfirmDialog(true);
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

  const changePaymentStatus = () => {
    setPaymentSuccess(true);
  };

  const handleOnClickYes = async () => {
    await handleRegister(id);
    setOpenMemberConfirmDialog(false);
  };

  const memberConfirmDialog = (
    <Dialog
      open={openMemberConfirmDialog}
      keepMounted
      onClose={() => setOpenMemberConfirmDialog(false)}
    >
      <DialogContent>
        <DialogContentText>Do you want to join this event?</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button onClick={() => setOpenMemberConfirmDialog(false)}>no</Button>
        <Button color="secondary" onClick={() => handleOnClickYes()}>
          Yes!
        </Button>
      </DialogActions>
    </Dialog>
  );

  const nonMemberConfirmDialog = (
    <Dialog
      open={openNonMemberConfirmDialog}
      keepMounted
      onClose={() => setOpenNonMemberConfirmDialog(false)}
    >
      <DialogContent className={classes.dialog}>
        <DialogContentText>
          You have to be a member to join this event.
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button onClick={() => setOpenNonMemberConfirmDialog(false)}>
          Cancel
        </Button>
        <Button color="secondary" onClick={() => setUpgradeOpen(true)}>
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Notification notify={notify} setNotify={setNotify} />
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        edge="start"
        size="small"
        onClick={handleCloseBtn}
      >
        <ArrowBackIosIcon fontSize="small" />
        <Typography variant="h6">Back</Typography>
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
            {event.eventName == "Welcome Party" ? (
              <a href="https://forms.gle/YH8tFAYYUs81cFnV6" target="_blank">
                https://forms.gle/YH8tFAYYUs81cFnV6
              </a>
            ) : null}
            {
              event.googleFormUrl ? <Link href={event.googleFormUrl} target="_blank">{event.googleFormUrl}</Link> : <Typography variant="body1" component="a">
                {"You don't have any googleFormUrls"}
              </Typography>
            }

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
            {/* confirm dialog - pops up when Register button is clicked */}
            {memberConfirmDialog}
            {nonMemberConfirmDialog}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              WeChat Group
            </Typography>
            <img src={event.wechatImgUrl} width="100%" />
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
      {/* <Dialog
        open={openUserDetailForm}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"md"}
        fullScreen={fullScreen}
      >
        <DialogTitle disableTypography justify="center" justifyContent="center">
          <Typography variant="h5" display="inline">
            Please provide you detail
          </Typography>
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ height: "80vh" }}>
          <UserDetailForm />
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
