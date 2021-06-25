import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 240,
    filter: "brightness(50%)",
  },
  overlay: {
    position: "absolute",
    display: "flex",
    flexFlow: "column wrap",
    width: "100%",
    textAlign: "center",
    top: 0,
    left: 0,
    color: "white",
  },
  sub: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }
}));

export default function MainCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/bg.png"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.overlay}>
          <Container>
            <Typography xs={0} variant="subtitle1" component="p">
              Thursday, 5 August 2021
            </Typography>
            <Typography className={classes.heading} gutterBottom variant="h3" component="h3">
              Professional Networking
            </Typography>
            <Typography className={classes.sub} gutterBottom variant="subtitle2" component="p">
              303-G20, City Campus, University of Auckland
            </Typography>
            <Button variant="contained" size="medium" color="secondary" width="20px">
              Register
            </Button>
          </Container>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
