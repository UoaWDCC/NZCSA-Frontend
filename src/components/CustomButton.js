import React from "react";
import Button from "@material-ui/core/Button";

export default function CustomButton(props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
