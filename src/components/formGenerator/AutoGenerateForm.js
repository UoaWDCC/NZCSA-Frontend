import react, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  Typography,
  Grid,
} from "@material-ui/core";
import testForm from "./testForm.json";
import FormElement from "./FormElement";

export default function AutoGenerateForm(props) {
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
    <Dialog open={props.open} onClose={handleDialogClose}>
      <DialogTitle>Some kind of form</DialogTitle>
      <DialogContent>
        <Grid container>
          <form>
            {fields
              ? fields.map((field, i) => (
                  <Grid item>
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
