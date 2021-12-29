import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { signUpEvent } from "../api/connectBackend";
import Upgrade from "../pages/Dashboard/Upgrade";
import Payment from "../pages/Dashboard/Payment";
import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,
  },
  media: {
    height: 140,
  },
  dialog: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  dialogAction: {
    paddingRight: theme.spacing(2),
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
  const [openNonMemberConfirmDialog, setOpenNonMemberConfirmDialog] =
    useState(false);
  const [openMemberConfirmDialog, setOpenMemberConfirmDialog] = useState(false);

  const isMember = props.isMember;
  const attendedEvents = props.attendedEvents;
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

  const handleOnClick = (eventId, price) => {
    if (!isMember) {
      setOpenNonMemberConfirmDialog(true);
    } else {
      if (!attendedEvents.includes(eventId)) {
        if (price > 0) {
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

  const handleOnClickYes = async (id) => {
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
        <Button color="secondary" onClick={() => handleOnClickYes(props.id)}>
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
            {/* confirm dialog - pops up when Register button is clicked */}
            {memberConfirmDialog}
            {nonMemberConfirmDialog}
          </CardActions>
        </Card>
      )}
      <Upgrade open={upgradeOpen} close={setUpgradeOpen} />
      <Payment
        open={paymentOpen}
        close={setPaymentOpen}
        price={price}
        eventId={props.id}
      />
    </Router>
  );
}
