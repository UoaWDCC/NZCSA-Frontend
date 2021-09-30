import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import React from "react";

export default function CheckboxInput(props) {
  return (
    <FormControl>
      <FormLabel component="legend">{props.optionName}</FormLabel>
      {props.fieldOption.length > 0 &&
        props.fieldOption.map((option, i) => {
          return (
            <FormControlLabel
              control={<Checkbox />}
              label={option.optionLabel}
            />
          );
        })}
    </FormControl>
  );
}
