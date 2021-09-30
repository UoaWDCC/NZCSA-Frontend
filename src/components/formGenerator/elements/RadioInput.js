import {
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import React, { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export default function RadioInput(props) {
  const { handleChange } = useContext(FormContext);

  return (
    <FormControl>
      <FormLabel component="legend">{props.optionName}</FormLabel>
      <RadioGroup row aria-label={props.optionName}>
        {props.fieldOption.length > 0 &&
          props.fieldOption.map((option, i) => {
            return (
              <FormControlLabel
                id={props.id}
                value={option.optionLabel}
                control={<Radio />}
                label={option.optionLabel}
                onChange={(event) =>
                  handleChange(props.id, event, option.optionLabel)
                }
              />
            );
          })}
        <FormControlLabel
          id={"hi"}
          value={"hi"}
          control={<Radio />}
          label={"hi"}
        />
      </RadioGroup>
    </FormControl>
  );
}
