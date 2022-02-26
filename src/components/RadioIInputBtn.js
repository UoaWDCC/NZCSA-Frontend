import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function RadioInputBtn(props) {
  const [other, setOtherValue] = useState("Other");
  const handleOther = (e) => {
    props.setOther(e);
    setOtherValue(e.target.value);
  };

  return (
    <FormControlLabel
      value={other}
      control={<Radio />}
      label={
        <TextField
          required
          id={"otherTextfield"}
          label="other"
          onChange={handleOther}
          onClick={(e) => {
            props.setOther(e);
          }}
        />
      }
    />
  );
}
