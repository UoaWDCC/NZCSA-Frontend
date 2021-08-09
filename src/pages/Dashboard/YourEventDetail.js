import React from "react";
import { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MainCard from "../../components/MainCard";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
// import clsx from "clsx";
import { Typography, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

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

export default function YourEventDetail({
data,
  ...rest
}) {
  const classes = useStyles();
  // const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState({});

  //let { id } = useParams();
  //console.log(data[id]);
  const pathname = window.location.pathname;
  const index = pathname.lastIndexOf("/")
  const id = pathname.slice(index+1);

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

  return (
    <div>
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

    </div>
  );
}
