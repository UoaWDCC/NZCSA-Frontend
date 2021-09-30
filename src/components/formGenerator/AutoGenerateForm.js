import react, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import testForm from "./testForm.json";
import FormElement from "./FormElement";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
  component: {
    margin: "1em",
  },
}));

export default function AutoGenerateForm(props) {
  const classes = useStyles();
  // Get form data
  const [element, setElement] = useState(null);
  useEffect(() => {
    setElement(testForm[0]);
  }, []);

  const { fields, label } = element ?? {};

  const handleDialogClose = () => {
    props.close();
  };
  console.log(fields);

  return (
    <Dialog open={props.open} onClose={handleDialogClose} class={classes.root}>
      <DialogTitle>Some kind of form</DialogTitle>
      <DialogContent>
        <Grid container>
          <form>
            {fields
              ? fields.map((field, i) => (
                  <Grid item class={classes.component}>
                    <FormElement key={i} field={field} />
                  </Grid>
                ))
              : null}
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
