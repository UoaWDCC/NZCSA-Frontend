import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import React from "react";

export default function RadioInput(props) {
  return (
    <FormControl>
      <FormLabel component="legend">{props.optionName}</FormLabel>
      <RadioGroup
        row
        aria-label={props.optionName}
        name="row-radio-buttons-group"
      >
        {props.fieldOption.length > 0 &&
          props.fieldOption.map((option, i) => {
            return (
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option.optionLabel}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
}
