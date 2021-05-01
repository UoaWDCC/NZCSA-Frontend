import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// TODO: Modify to match figma design
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
}));

// TODO: Modify to match figma design
export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      component="main"
      className={classes.root}
    >
      <CssBaseline />
      <Typography variant="h1">Dashboard</Typography>
    </Grid>
  );
}
