import react, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import testForm from "./testForm.json";
import FormElement from "./FormElement";
import { makeStyles } from "@material-ui/core/styles";
import { FormContext } from "../../context/FormContext";

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

  const handleChange = (id, event, label) => {
    const newElements = { ...element };
    newElements.fields.forEach((field) => {
      const { fieldType, fieldId } = field;
      if (id === fieldId) {
        switch (fieldType) {
          case "checkbox":
            if (event.target.checked) {
              field["fieldValue"].push(label);
            } else {
              const index = field["fieldValue"].indexOf(label);
              if (index > -1) {
                field["fieldValue"].splice(index, 1);
              }
            }

            break;
          case "radio":
            field["fieldValue"] = label;
            break;
          default:
            field["fieldValue"] = event.target.value;
            break;
        }
      }
      setElement(newElements);
    });
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <Dialog
        open={props.open}
        onClose={handleDialogClose}
        class={classes.root}
      >
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
    </FormContext.Provider>
  );
}
