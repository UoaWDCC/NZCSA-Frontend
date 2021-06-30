import React from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import MainCard from "../../components/MainCard";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

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
}));

export default function EventDetail() {
  const classes = useStyles();
  let { id } = useParams();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
            <Button variant="contained" size="large" color="secondary" disableElevation>
              Register
            </Button>
          </Paper>
        </Grid>
        {/* Recent Orders */}
      </Grid>
    </div>
  );
}
