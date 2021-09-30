import { FormControlLabel, TextField } from "@material-ui/core";
import React from "react";

export default function Inputfield(props) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      multiline={props.multiline}
      placeholder={props.placeholder}
    />
  );
}
