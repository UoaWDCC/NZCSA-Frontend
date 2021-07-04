import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  Typography,
  List,
  ListItem,
  Radio,
  Grid,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  consent: {
    backgroundColor: "#D8D8D8",
  },
  payBtn: {
    minWidth: "120px",
  },
}));

export default function PaymentResult(props) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("wechat");
  const success = props.success;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Dialog className={classes.root} open={props.open} fullWidth={true}>
      <DialogContent>
        <form style={{ marginTop: 50, marginBottom: 50 }}>
          <Grid container align="center" className={classes.root}>
            <Grid item xs={12} justify="center">
              {success ? (
                <CheckCircleIcon style={{ fontSize: 96, color: teal[400] }} />
              ) : (
                <CancelIcon style={{ fontSize: 96, color: "red" }} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                {success ? "Thank you!" : "Sorry..."}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {success
                  ? "Your payment is successful."
                  : "Your payment failed."}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
