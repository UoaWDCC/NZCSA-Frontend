import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  List,
  ListItem,
  Radio,
  Grid,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  consent: {
    backgroundColor: "#D8D8D8",
  },
  payBtn: {
    minWidth: "120px",
  },
  listWrapper: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid grey"
  },
}));

export default function UpgradeForm(props) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form>
      <Grid container>
      </Grid>
    </form>
  );
}
