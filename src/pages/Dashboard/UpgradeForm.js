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
import RadioInputBtn from '../../components/RadioIInputBtn'
import CheckboxInputBtn from "../../components/CheckboxInputBtn";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';





const useStyles = makeStyles((theme) => ({
    consent: {
        backgroundColor: "#D8D8D8"
    },
}));



export default function UpgradeForm(props) {
    // const [gender, setGender]=useState()
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [wechatId, setWechaId] = useState()
    const [phone, setPhone] = useState()
    const [stdentId, setStudentId] = useState()
    const [birthday, setBirthday] = useState()
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [yearError, setYearError] = useState("");
    const [university, setUniversity] = useState("UNITEC")
    const [faculty, setFaculty] = useState({
        Arts: false,
        BussinessSchool: false,
        Science: false,
        NICAI: false,
        Engineering: false,
        Law: false,
        Medicine: false,
        Architecture: false,
        CollegeOfFoundation: false,
        Others: false
    })
    // When others is true, you need to add this into the list of faculty too
    const [otherFaculty, setOtherFculty] = useState('')
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('')
    const [understand, setUnderstand] = useState(false)
    // const [facultyList,setFacultyList]=useState();

    const handleBirthdayChange = (date) => {
        console.log(date)
        setBirthday(date);
    };

    const handleFaculty = (event) => {
        setFaculty({ ...faculty, [event.target.name]: event.target.checked })
    }

    const handleGender = (event) => {
        setGender(event.target.value)
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)
    }

    const handleStudentId = (event) => {
        setStudentId(event.target.value)
    }

    const handleWecahtId = (event) => {
        setWechaId(event.target.value)
    }

    const handleMajor = (event) => {
        setMajor(event.target.value)
    }

    const handleYear = (event) => {
        yearCheck(event)
        setYear(event.target.value)
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleUnderstand = (event) => {
        setUnderstand(event.target.checked )
    }

    const getAllFaculty = () => {
        const list = Object.keys(faculty).map((key, index) => {
            if (faculty[key] && key !== "Others") {
                return key
            } else if (key === "Others" && faculty[key] === true) {
                return otherFaculty;
            }
            return null
        }).filter((el) => {
            return el != null
        })
        console.log(list)
    }

    const yearCheck = (e) => {
        const newValue = e.target.value;

        if (newValue < 1) {
            setYearError("Year cannot be <1")
        } else {
            setYearError("")
        }
    }

    const handleUniversity = (e) => {
        setUniversity(e.target.value);
    }

    const handlecloseUpgradeForm=()=>{
        if(window.confirm("All your inputs will be discarded")){
            props.close(false)
        }else{
            props.close(true)
        }
    }

    const handleSubmitUpgradeForm=()=>{
        props.close(false)
    }


    const { Arts, BussinessSchool, Science, NICAI, Engineering, Law, Medicine, Architecture, CollegeOfFoundation, Others } = faculty
    const classes = useStyles();
    console.log(faculty)

    return (
        <Dialog open={props.open} onClose={handlecloseUpgradeForm}  aria-labelledby="form-dialog-title" maxWidth={maxWidth} fullWidth={true}>
            <DialogTitle align={"center"}>Registration Form</DialogTitle>
            <DialogContent>
                <form >
                    <Grid container spacing={4} justify={"center"}>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item md={4}>
                                    <TextField required autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Chinese Name"
                                        type="name"
                                        fullwidth="true"
                                        onChange={handleName}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <FormControl required component="fieldset" value={gender} onChange={handleGender}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" row>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Prefer not say" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item md={4}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Wechat ID"
                                        type="text"
                                        fullwidth="true"
                                        onChange={handleWecahtId} />
                                </Grid>
                                <Grid item md={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            required
                                            disableFuture={true}
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Birthday"
                                            value={birthday}
                                            onChange={handleBirthdayChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item md={4}>
                                    <TextField required
                                        margin="dense"
                                        id="Phone"
                                        label="Phone number"
                                        type="tel"
                                        fullwidth="true"
                                        onChange={handlePhone} />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        margin="dense"
                                        id="studentId"
                                        label="Student ID"
                                        type="text"
                                        fullwidth="true"
                                        onChange={handleStudentId} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item md={4}>
                                    <Grid container justify={"space-evenly"} spacing={4} direction={"column"}>
                                        <Grid item md={12}>
                                            <FormControl required component="fieldset">
                                                <FormLabel component="legend">University</FormLabel>
                                                <RadioGroup aria-label="University" name="University" value={university} onChange={handleUniversity}>
                                                    <FormControlLabel value="UNITEC" control={<Radio />} label="UNITEC" />
                                                    <FormControlLabel value="AUT" control={<Radio />} label="AUT" />
                                                    <FormControlLabel value="MasseyUniversity" control={<Radio />} label="Massey University" />
                                                    <FormControlLabel value="UoA" control={<Radio />} label="UoA" />
                                                    <RadioInputBtn setOther={setUniversity} />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField
                                                required
                                                label="Major/Specialisation"
                                                type="Text"
                                                onChange={handleMajor} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField
                                                required
                                                label="Year of Study"
                                                type="text"
                                                helperText={yearError}
                                                error={!!yearError}
                                                onChange={handleYear} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={4}>
                                    <FormControl required component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Faculty</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={Arts} o onChange={handleFaculty} name="Arts" />}
                                                label="Arts"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={BussinessSchool}
                                                    name="BussinessSchool"
                                                    onChange={handleFaculty} />}
                                                label="Bussiness School"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={Science}
                                                    name="Science"
                                                    onChange={handleFaculty} />}
                                                label="Science"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={NICAI}
                                                    name="NICAI"
                                                    onChange={handleFaculty} />}
                                                label="NICAI"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={Engineering}
                                                    name="Engineering"
                                                    onChange={handleFaculty} />}
                                                label="Engineering"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={Law}
                                                    name="Law"
                                                    onChange={handleFaculty} />}
                                                label="Law"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={Medicine}
                                                    name="Medicine"
                                                    onChange={handleFaculty} />}
                                                label="Medicine"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={Architecture}
                                                    name="Architecture"
                                                    onChange={handleFaculty} />}
                                                label="Architecture"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={CollegeOfFoundation}
                                                    name="CollegeOfFoundation"
                                                    onChange={handleFaculty} />}
                                                label="College of Foundation"
                                            />
                                            <CheckboxInputBtn options={faculty} setOption={setFaculty} setOtherOption={setOtherFculty} />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item align={"center"} md={10} className={classes.consent}>
                                    <h2>Consent Of Membership</h2>
                                    <p>I have read and understand the regulation and constitution of NZCSA. I have had the opportunity to ask questions and have them answered to my satisfaction:<br />
                                        1. I agree to take part in this students' association.<br />
                                        2. I understand that I am free to discontinue participating at any time, and to withdraw my data any time without giving a reason, however, the membership fee will not be refunded.<br />
                                        3. I understand that all information provided to the NZCSA: <br />(1) will remain confidential, <br />(2) will only be used internally within NZCSA.<br />
                                        4. I understand that personal information will be stored for a period of three years, after which they will be securely destroyed.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12}>
                            <Grid container justify={"space-evenly"} spacing={4}>
                                <Grid item align={"center"} md={10}>
                                    <FormControl required component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">This form will be held for a period of 3 years.</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={understand}
                                                    onChange={handleUnderstand}
                                                    name="understand" />}
                                                label="I understand"
                                                align={"center"}
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>


                    <Grid container justify={"center"} >
                        <Button disabled={!understand} onClick={handleSubmitUpgradeForm}>Submit</Button>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
        // <div>hi</div>

    );
}