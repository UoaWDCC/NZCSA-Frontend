import { FormControlLabel, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export default function Inputfield(props) {
  const { handleChange } = useContext(FormContext);

  return (
    <TextField
      id={props.id}
      label={props.label}
      variant="outlined"
      multiline={props.multiline}
      placeholder={props.placeholder}
      onChange={(event) => handleChange(props.id, event, null)}
    />
  );
}
