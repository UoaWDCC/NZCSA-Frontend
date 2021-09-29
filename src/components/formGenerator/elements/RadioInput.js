import { FormControlLabel } from "@material-ui/core";
import React from "react";

export default function RadioInput(props) {
  return (
    <FormControlLabel
      value={props.value}
      control={<Radio />}
      label={props.label}
    />
  );
}
