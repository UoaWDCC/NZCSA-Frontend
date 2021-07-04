import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import UpgradeForm from "./UpgradeForm";
import PaymentForm from "./PaymentForm";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    flexFlow: "row wrap",
  },
}));

const steps = ["Register for membership", "Payment Details", ""];

export default function Upgrade(props) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState("md");
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
      maxWidth={maxWidth}
    >
      <DialogTitle disableTypography>
        <Typography variant="h5">{steps[activeStep]}</Typography>
      </DialogTitle>
      <DialogContent>{getStepContent(activeStep)}</DialogContent>
    </Dialog>
  );
}
