import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import UpgradeForm from "./UpgradeForm";
import PaymentForm from "./PaymentForm";

const useStyles = makeStyles((theme) => ({}));

// const steps = ["upgrade form", "payment form", "payment result"];

export default function Upgrade(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1); // redirect to next step in payment process
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1); // redirect to previous step in payment process
  };

  const handlecloseUpgradeForm = () => {
    if (window.confirm("All your inputs will be discarded")) {
      props.close(false);
      setActiveStep(0);
    } else {
      props.close(true);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UpgradeForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm />;
      default:
        throw new Error("unknown step");
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={handlecloseUpgradeForm}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle>Registration Form</DialogTitle>
      <DialogContent>{getStepContent(activeStep)}</DialogContent>
    </Dialog>
    // <div>hi</div>
  );
}
