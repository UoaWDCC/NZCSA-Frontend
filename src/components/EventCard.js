import React, { useContext } from "react";
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
import { signUpEvent, updateUserInfo } from "../api/connectBackend";
import Upgrade from "../pages/Dashboard/Upgrade";
import Payment from "../pages/Dashboard/Payment";
import Notification from "./Notification";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/auth.context";

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

/**
 * Event cards used in the Home page
 * @param {object} props details of the event: id, title, date, price, location, image
 * @param {object} props details of the user: name, wechatId, isMember, attendedEvents, gender, googleSheetId
 */
export default function EventCard(props) {


  // check if user registered this event
  const { currentUser, setCurrentUser } = useAuth();


  // const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [price, setPrice] = useState(props.price == 0 || props.price == undefined ? 0 : props.price);
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
  const googleSheetId = props.googleSheetUrl;
  const name = props.name;
  const wechatId = props.wechatid;
  const gender = props.gender
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  // pop up confirmation when user clicks to register
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

  // register through backend after user confirmed
  async function handleRegister(eventId) {
    const registerInfo = { eventId };
    const userInfo = { name, wechatId, gender, googleSheetId }
    try {
      // setLoading(true);
      const response = await signUpEvent(registerInfo, userInfo);
      if (response.status === 200) {
        updateUserInfo(setCurrentUser)
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

  // user confirmed, send to backend and close popup
  const handleOnClickYes = async (id) => {
    await handleRegister(id);
    setOpenMemberConfirmDialog(false);
  };

  // is a member, ask to confirm register
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

  // is not a member, prompt to join before register
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

  // event card showing "Register", "Registered" or no button for previous events
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
            {
              currentUser ?
                currentUser.attendedEvents.includes(props.id) ?
                  <Button
                    variant="contained"
                    size="medium"
                    disabled
                    onClick={() => handleOnClick(props.id, props.price)}
                    disableElevation
                  >
                    Registered
                  </Button>
                  :
                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={() => handleOnClick(props.id, props.price)}
                    disableElevation
                  >
                    Register
                  </Button>
                : <></>
            }
            {/* <Button
              variant="contained"
              size="medium"
              onClick={() => handleOnClick(props.id, props.price)}
              disableElevation
            >
              Register
            </Button> */}
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
