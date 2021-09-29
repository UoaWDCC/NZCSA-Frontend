import { FormControlLabel } from "@material-ui/core";
import React from "react";

export default function Inputfield(props) {
  return (
    <FormControlLabel
      ontrol={<Checkbox />}
      label={props.label}
      Multiline={props.Multiline}
    />
  );
}
