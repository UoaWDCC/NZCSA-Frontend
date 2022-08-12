import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Dialog, IconButton, Typography } from "@material-ui/core";
import PaymentForm from "./PaymentForm";
import PaymentResultForm from "./PaymentResultForm";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: 0,
  },
  closeButton: {
    position: "absolute",
    margin: 0,
    padding: theme.spacing(2),
    right: 0,
  },
  form: {
    marginTop: 0,
    padding: 0,
  },
});


const steps = ["Checkout", "Payment"];

/**
 * Component for determining functionality of payment system popup
 * @param {object} prop details of the event: eventId, price
 * @param {object} prop toggling tbe visibility of the menu: open, close
 */
export default function Payment(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleNext = () => {
    setActiveStep(activeStep + 1); // redirect to next step in payment process
  };

  const handleclosePaymentForm = () => {
    if (activeStep === 1) {
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
        return (
          <PaymentForm
            eventId={props.eventId}
            price={props.price}
            orderType="event-payment"
            handleNext={handleNext}
          />
        );
      case 1:
        return <PaymentResultForm close={finishPayment} />;
      default:
        throw new Error("unknown step");
    }
  }

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;

    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography p={5} variant="h4">
          {children}
        </Typography>
        {onClose && activeStep !== 1 ? (
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
      onClose={handleclosePaymentForm}
      fullWidth={true}
      maxWidth="md"
      fullScreen={fullScreen}
    >
      <DialogTitle onClose={handleclosePaymentForm}>
        {steps[activeStep]}
      </DialogTitle>
      <div style={{ height: "80vh" }} className={classes.form}>
        {getStepContent(activeStep)}
      </div>
    </Dialog>
  );
}
