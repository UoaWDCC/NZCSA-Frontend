import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

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
    [theme.breakpoints.up('md')]: {
      maxWidth: "100%",
      width: "40%",
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%",
      width: "100%",
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: "100%",
      width: "40%",
    },
    height: 200,
  }
}));

const RedTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

export default function EventCard(props) {
  const classes = useStyles({
    
  });
  return (
    <Router>
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
            <Typography 
              variant="p" 
              style={{ whiteSpace: "pre-line", verticalAlign: "bottom"}} 
              color="primary" 
              component="p"
            >
              <LocalOfferIcon style={{height: 13}}/>
              {props.discount}
            </Typography>
            <br/>
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
