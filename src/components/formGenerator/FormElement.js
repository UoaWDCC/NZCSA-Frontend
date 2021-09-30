import React from "react";
import CheckboxInput from "./elements/CheckboxInput";
import Inputfield from "./elements/Inputfield";
import RadioInput from "./elements/RadioInput";

export default function FormElement(props) {
  const field = props.field;
  // console.log(field);

  // console.log("element class");
  switch (field.fieldType) {
    case "text":
      return (
        <Inputfield
          id={field.fieldId}
          label={field.fieldLabel}
          mutiline={field.fieldMultiline}
          placeholder={field.fieldPlaceholder}
        />
      );
    case "radio":
      return (
        <RadioInput
          id={field.fieldId}
          optionName={field.fieldId}
          fieldOption={field.fieldOptions}
        />
      );
    case "checkbox":
      return (
        <CheckboxInput
          id={field.fieldId}
          optionName={field.fieldId}
          fieldOption={field.fieldOptions}
        />
      );
    default:
      return null;
  }
}
