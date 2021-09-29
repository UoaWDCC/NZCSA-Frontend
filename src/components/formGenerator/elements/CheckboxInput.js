import { FormControlLabel } from "@material-ui/core";
import React from "react";

export default function CheckboxInput(props) {
  return <FormControlLabel ontrol={<Checkbox />} label={props.label} />;
}
