import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import React, { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export default function CheckboxInput(props) {
  const { handleChange } = useContext(FormContext);

  return (
    <FormControl>
      <FormLabel component="legend">{props.optionName}</FormLabel>
      {props.fieldOption.length > 0 &&
        props.fieldOption.map((option, i) => {
          return (
            <FormControlLabel
              id={props.id}
              control={<Checkbox />}
              label={option.optionLabel}
              onChange={(event) =>
                handleChange(props.id, event, option.optionLabel)
              }
            />
          );
        })}
    </FormControl>
  );
}
