import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MainCard from "../../components/MainCard";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { confirmAlert } from 'react-confirm-alert';
import { signUpEvent } from '../../api/connectBackend';
import Upgrade from "../Dashboard/Upgrade";
import Payment from "../Dashboard/Payment";
import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  fixedHeight: {
    height: 240,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(8),

  }
}));

export default function EventDetail(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const isMember = props.isMember;
  const attendedEvents = props.attendedEvents;

  let { id } = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // let history
  let history = useHistory();

  const handleCloseBtn = () => {
    history.goBack();
  }

  const handleOnClick = (eventId, price) => {
    if (!isMember) {
      confirmAlert({
        message: 'You have to be a member to join this event.',
        buttons: [
          {
            label: 'Cancel',
            onClick: () => console.log('')
          },
          {
            label: 'Upgrade',
            onClick: () => setUpgradeOpen(true)
          }
        ]
      });
    } else {
      if (!attendedEvents.includes(eventId)) {
        setPrice(price);
        if (price > 0) {
          setPaymentOpen(true);
        } else {
          confirmAlert({
            message: 'Do you want to join this event?',
            buttons: [
              {
                label: 'No',
                onClick: () => console.log('')
              },
              {
                label: 'Yes',
                onClick: () => handleRegister(eventId)
              }
            ]
          });
        }
      } else {
        setNotify({
          isOpen: true,
          message: 'You have already signed up for this event',
          type: 'warning'
        });
      }
    }
    
  };

  async function handleRegister(eventId) {
    console.log(eventId);
    const registerInfo = { eventId };
    try {
      setLoading(true);
      const response = await signUpEvent(registerInfo);
      if (response.status === 200) {
        setNotify({
          isOpen: true,
          message: 'Successfully signed up for this event!',
          type: 'success'
        });
      }
      //console.log(response.data);
    } catch (e) {
      setLoading(false);
      console.log(e.response.data.error);
      setNotify({
        isOpen: true,
        message: e.response.data.error,
        type: 'error'
      });
    }
  }

  return (
    <div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IconButton aria-label="close" className={classes.closeButton} edge='start' size='small' onClick={handleCloseBtn}>
            <CloseIcon />
          </IconButton>
          <MainCard img="/pn.png" />
        </Grid>
        {/* List of Events */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle2" color="primary">
              AUG 8 AT 4 AM UTC+12 – AUG 8 AT 9 AM UTC+12
            </Typography>
            <Typography variant="h3">
              2021 Professional Networking 职业链接
            </Typography>
            <Typography variant="h6" color="textSecondary">
              303-G20, City Campus, University of Auckland
            </Typography>
          </Paper>
        </Grid>
        {/* Details */}
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Details
            </Typography>
            <Typography variant="body1" component="p">
              NZCSA’s Networking event series was first held in 2015 and has
              become one of our annual flagship events. It has attracted
              positive response from more than 400 participants every year for
              its effectiveness in helping students and businesses connect with
              each other and producing positive outcomes for all stakeholders.
              In response to the demand from Chinese students who are also
              interested in Chinese job market, we decided to launch the 1st
              Online Chinese Networking Event, and it is proud to say that we
              are the first student association who operates an online
              networking event particularly for Chinese students.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Tickets
            </Typography>
            <Button variant="contained" size="large" color="secondary" onClick={() => handleOnClick(props.id, props.price)} disableElevation>
              Register
            </Button>
          </Paper>
        </Grid>
        {/* Recent Orders */}
      </Grid>
      <Upgrade open={upgradeOpen} close={setUpgradeOpen} />
      <Payment open={paymentOpen} close={setPaymentOpen} price={price} /> 
    </div>
  );
}
