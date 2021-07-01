import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle } from '@material-ui/core';
import { DialogContent } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';





const useStyles = makeStyles((theme) => ({
    modal: {
        width: "40%",
    },
}));



export default function UpgradeForm(props) {
    // const [gender, setGender]=useState()
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [maxWidth, setMaxWidth] = React.useState('md');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    console.log(props)
    const classes = useStyles();

    return (
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={true}>
            <DialogTitle>Registration Form</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid container justify={"space-evenly"} >
                        <TextField autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullwidth="true"
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" row>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Prefer not say" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>


                </Grid>
                <Grid container justify={"space-evenly"}>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Wechat ID"
                        type="text"
                        fullwidth="true" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            // value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid container justify={"space-evenly"}>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Phone number"
                        type="tel"
                        fullwidth="true" />
                    <TextField
                        margin="dense"
                        id="id"
                        label="Student ID"
                        type="text"
                        fullwidth="true" />
                </Grid>
                <Grid container justify={"space-evenly"}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" >
                            <FormControlLabel value="UNITEC" control={<Radio />} label="UNITEC" />
                            <FormControlLabel value="AUT" control={<Radio />} label="AUT" />
                            <FormControlLabel value="Massey University" control={<Radio />} label="Massey University" />
                            <FormControlLabel value="UoA" control={<Radio />} label="UoA" />
                            <FormControlLabel value="other" control={<Radio />} label={<TextField label="Other" />} />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Major</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox name="Arts" />}
                                label="Arts"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Bussiness School" />}
                                label="Bussiness School"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Science" />}
                                label="Science"
                            />
                            <FormControlLabel
                                control={<Checkbox name="NICAI" />}
                                label="NICAI"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Engineering" />}
                                label="Engineering"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Law" />}
                                label="Law"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Medicine" />}
                                label="Medicine"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Architecture" />}
                                label="Architecture"
                            />
                            <FormControlLabel
                                control={<Checkbox name="College of Foundation" />}
                                label="College of Foundation"
                            />
                            <FormControlLabel
                                control={<Checkbox name="Science" />}
                                label={<TextField label="Others" />}
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid container justify={"space-evenly"} >
                    <TextField label="Major/Specialisation" type="Text" />
                    <TextField label="Year of Study" type="number" />
                </Grid>
                <Grid container justify={"center"}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">This form will be held for a period of 3 years.</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox name="understand" />}
                                label="I understand"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid container justify={"center"} >
                    <Button>Submit</Button>
                </Grid>
            </DialogContent>
        </Dialog>
        // <div>hi</div>

    );
}