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
import LocalMallIcon from '@mui/icons-material/LocalMall';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "auto",
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
      height: 200,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
      width: "100%",
    }
  },
  media: {
    [theme.breakpoints.down('md')]: {
      maxWidth: "100%",
      width: "40%",
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%",
      width: "100%",
    },
    height: 200,
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

  return (
    <Router>
      <Notification notify={notify} setNotify={setNotify} />
      {props.isYourPage || props.tab == "previous" ? (null) : (
      <Card className={classes.root}>
        {props.image == "" ? (
          <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="100%"
          image={'./images/discountLogo/'+'discount.png'}
          title="Contemplative Reptile"
        />
        ) : (
          <CardMedia
            className={classes.media}
            component="img"
            alt="Contemplative Reptile"
            height="100%"
            image={'./images/discountLogo/'+props.image}
            title="Contemplative Reptile"
          />
        )}
          
          <CardContent>
            <Typography variant="h6" component="h5">
              {props.title}
            </Typography>
            <Typography variant="p" style={{ whiteSpace: "pre-line" }} color="primary" component="p">
              {props.discount}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              component="p"
            >
              {props.location}
            </Typography>
          </CardContent>
          
        </Card>
      )}
    </Router>
  );
}
