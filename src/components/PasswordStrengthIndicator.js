import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  barColorPrimary: (props) => ({
    backgroundColor:
      props.input === "good"
        ? amber[500]
        : props.input === "strong"
        ? green[500]
        : red[500],
  }),
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  text: (props) => ({
    color:
      props.input === "good"
        ? amber[500]
        : props.input === "strong"
        ? green[500]
        : red[500],
  }),
}));

export default function PasswordStrengthIndicator(props) {
  const classes = useStyles(props);
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    switch (props.input) {
      case "weak":
        setValue(33);
        setText("Too weak - This password is common and easy to guess");
        break;
      case "good":
        setValue(66);
        setText("Medium");
        break;
      case "strong":
        setValue(100);
        setText("Strong");
        break;
      default:
        setValue(0);
        setText("");
    }
  }, [props.input]);

  return (
    <Box display="flex" flexDirection="column" mt={1}>
      <Box>
        <LinearProgress
          variant="determinate"
          value={value}
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      </Box>
      <Box minWidth={35} mt={1}>
        <Typography className={classes.text} variant="body2">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
