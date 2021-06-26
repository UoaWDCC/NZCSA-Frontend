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
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 240,
    filter: props => props.darken ? "brightness(50%)" : null,
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

export default function MainCard(props) {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink}  to={`${props.id}`}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.overlay}>
          <Container>
            <Typography xs={0} variant="subtitle1" component="p">
              {props.date}
            </Typography>
            <Typography className={classes.heading} gutterBottom variant="h3" component="h3">
              {props.title}
            </Typography>
            <Typography className={classes.sub} gutterBottom variant="subtitle2" component="p">
              {props.location}
            </Typography>
            {props.btn && <Button variant="contained" size="medium" color="secondary" width="20px">
              Find Out More
            </Button>}
          </Container>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
