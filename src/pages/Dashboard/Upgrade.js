import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import UpgradeForm from "./UpgradeForm";
import PaymentForm from "./PaymentForm";
import PaymentResultForm from "./PaymentResultForm";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    height: 73,
  },
  closeButton: {
    position: "absolute",
    margin: 0,
    padding: theme.spacing(2),
    right: 0,
  },
});

const useStyles = makeStyles((theme) => ({}));

const steps = ["Register for membership", "Checkout", "Payment"];

export default function Upgrade(props) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [activeStep, setActiveStep] = React.useState(props.checkout ? 2 : 0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleNext = () => {
    setActiveStep(activeStep + 1); // redirect to next step in payment process
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1); // redirect to previous step in payment process
  };

  const handlecloseUpgradeForm = () => {
    if (activeStep === 2) {
      return null;
    } else if (window.confirm("All your inputs will be discarded")) {
      props.close(false);
      setActiveStep(0);
    } else {
      props.close(true);
    }
  };

  const finishPayment = () => {
    props.close(false);
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UpgradeForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm price={0.01} handleNext={handleNext} />;
      case 2:
        return <PaymentResultForm close={finishPayment} />;
      default:
        throw new Error("unknown step");
    }
  }

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;

    // if (activeStep === 2) {
    //   return null;
    // }

    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        {activeStep !== 0 && activeStep !== 2 && (
          <IconButton onClick={handleBack} size="small" aria-label="back">
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        )}

        <Typography p={5} variant="h5">
          {children}
        </Typography>
        {onClose && activeStep !== 2 ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <Dialog
      open={props.open}
      onClose={handlecloseUpgradeForm}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
    >
      <DialogTitle onClose={handlecloseUpgradeForm}>
        {steps[activeStep]}
      </DialogTitle>
      <DialogContent style={{ height: "80vh" }}>
        {getStepContent(activeStep)}
      </DialogContent>
    </Dialog>
  );
}
