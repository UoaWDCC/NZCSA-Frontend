import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import RadioInputBtn from "../../components/RadioIInputBtn";
import CheckboxInputBtn from "../../components/CheckboxInputBtn";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { signUpMembership } from '../../api/connectBackend';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  consent: {
    backgroundColor: "#D8D8D8",
  },
}));

export default function UpgradeForm(props) {
  // const [gender, setGender]=useState()
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState();
  const [wechatid, setWechaId] = useState();
  const [phone, setPhone] = useState();
  const [stdentId, setStudentId] = useState();
  const [birthday, setBirthday] = useState();
  const [yearError, setYearError] = useState("");
  const [university, setUniversity] = useState("UNITEC");
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
    Others: false,
  });
  // When others is true, you need to add this into the list of faculty too
  const [otherFaculty, setOtherFculty] = useState("");
  const [understand, setUnderstand] = useState(false);

  // const [facultyList,setFacultyList]=useState();

  const handleBirthdayChange = (date) => {
    setBirthday(date);
  };

  const handleFaculty = (event) => {
    setFaculty({ ...faculty, [event.target.name]: event.target.checked });
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleStudentId = (event) => {
    setStudentId(event.target.value);
  };

  const handleWechatID = (event) => {
    setWechaId(event.target.value);
    if ((event.target.value.length >= 6) && (event.target.value.length <= 20) && (isNaN(event.target.value[0]))) {
      event.target.setAttribute("color", "success")
      console.log(event.target.value)
    } else {
      event.target.setAttribute("color", "warning")
      console.log("invalid ID")
    }
  };

  const handleUnderstand = (event) => {
    setUnderstand(event.target.checked);
  };

  const getAllFaculty = () => {
    const list = Object.keys(faculty)
      .map((key, index) => {
        if (faculty[key] && key !== "Others") {
          return key;
        } else if (key === "Others" && faculty[key] === true) {
          return otherFaculty;
        }
        return null;
      })
      .filter((el) => {
        return el != null;
      });
    // console.log(list);
  };

  const yearCheck = (e) => {
    const newValue = e.target.value;

    if (newValue < 1) {
      setYearError("Year cannot be <1");
    } else {
      setYearError("");
    }
  };

  const handleUniversity = (e) => {
    setUniversity(e.target.value);
  };

  const returnFaculty = () => {
    let key1 = 'None'
    Object.keys(faculty).forEach((key) => {
      if (faculty[key]) {
        key1 = key;
      }
    })
    return key1;
  }

  const handleSubmitUpgradeForm = async () => {
    setLoading(true);
    const selectedFaculty = returnFaculty();
    const info = { gender, university, selectedFaculty, birthday, phone, stdentId }
    try {
      const response = await signUpMembership(info);
      if (response.status === 200) {
        setLoading(false);
        props.handleNext();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }

  };

  const {
    Arts,
    BussinessSchool,
    Science,
    NICAI,
    Engineering,
    Law,
    Medicine,
    Architecture,
    CollegeOfFoundation,
    Others,
  } = faculty;
  const classes = useStyles();
  // console.log(faculty);

  return (
    <DialogContent>
      <form>
        <Grid container spacing={4} justify={"center"}>
          <Grid item md={12}>
            <Grid container justify={"space-evenly"} spacing={4}>
              <Grid item md={5}>
                <FormControl
                  required
                  component="fieldset"
                  value={gender}
                  onChange={handleGender}
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" row>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Prefer not say"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
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
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={5}>
                <TextField
                  margin="dense"
                  id="studentId"
                  label="Student ID"
                  type="text"
                  fullwidth="true"
                  onChange={handleStudentId}
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  margin="dense"
                  id="wechatId"
                  inputProps={{ maxLength: 20 }}
                  label="Wechat ID"
                  type="text"
                  fullwidth="true"
                  variant="standard"
                  color="success"
                  onChange={handleWechatID}
                />
              </Grid>
              <Grid item md={10}>
                <TextField
                  required
                  margin="dense"
                  id="Phone"
                  inputProps={{ inputMode:"numeric", pattern:"[0-9]*", maxLength: 15 }}
                  label="Phone number"
                  type="tel"
                  fullwidth="true"
                  onChange={handlePhone}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Grid container justify={"space-evenly"} spacing={4}>
              <Grid item md={4}>
                <Grid
                  container
                  justify={"space-evenly"}
                  spacing={4}
                  direction={"column"}
                >
                  <Grid item md={12}>
                    <FormControl
                      required
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">Faculty</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Arts}
                              o
                              onChange={handleFaculty}
                              name="Arts"
                            />
                          }
                          label="Arts"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={BussinessSchool}
                              name="BussinessSchool"
                              onChange={handleFaculty}
                            />
                          }
                          label="Bussiness School"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Science}
                              name="Science"
                              onChange={handleFaculty}
                            />
                          }
                          label="Science"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={NICAI}
                              name="NICAI"
                              onChange={handleFaculty}
                            />
                          }
                          label="NICAI"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Engineering}
                              name="Engineering"
                              onChange={handleFaculty}
                            />
                          }
                          label="Engineering"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Law}
                              name="Law"
                              onChange={handleFaculty}
                            />
                          }
                          label="Law"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Medicine}
                              name="Medicine"
                              onChange={handleFaculty}
                            />
                          }
                          label="Medicine"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Architecture}
                              name="Architecture"
                              onChange={handleFaculty}
                            />
                          }
                          label="Architecture"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={CollegeOfFoundation}
                              name="CollegeOfFoundation"
                              onChange={handleFaculty}
                            />
                          }
                          label="College of Foundation"
                        />
                        <CheckboxInputBtn
                          options={faculty}
                          setOption={setFaculty}
                          setOtherOption={setOtherFculty}
                        />
                      </FormGroup>
                    </FormControl>

                  </Grid>
                  <Grid item md={12}>
                    {/* <TextField
                      required
                      label="Major/Specialisation"
                      type="Text"
                      onChange={handleMajor}
                    /> */}
                  </Grid>
                  <Grid item md={12}>
                    {/* <TextField
                      required
                      label="Year of Study"
                      type="text"
                      helperText={yearError}
                      error={!!yearError}
                      onChange={handleYear}
                    /> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <FormControl required component="fieldset">
                  <FormLabel component="legend">University</FormLabel>
                  <RadioGroup
                    aria-label="University"
                    name="University"
                    value={university}
                    onChange={handleUniversity}
                  >
                    <FormControlLabel
                      value="UNITEC"
                      control={<Radio />}
                      label="UNITEC"
                    />
                    <FormControlLabel
                      value="AUT"
                      control={<Radio />}
                      label="AUT"
                    />
                    <FormControlLabel
                      value="MasseyUniversity"
                      control={<Radio />}
                      label="Massey University"
                    />
                    <FormControlLabel
                      value="UoA"
                      control={<Radio />}
                      label="UoA"
                    />
                    <RadioInputBtn setOther={setUniversity} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container justify={"space-evenly"} spacing={4}>
              <Grid item align={"center"} md={10} className={classes.consent}>
                <h2>Consent Of Membership</h2>
                <p>
                  I have read and understand the regulation and constitution
                  of NZCSA. I have had the opportunity to ask questions and
                  have them answered to my satisfaction:
                  <br />
                  1. I agree to take part in this students' association.
                  <br />
                  2. I understand that I am free to discontinue participating
                  at any time, and to withdraw my data any time without giving
                  a reason, however, the membership fee will not be refunded.
                  <br />
                  3. I understand that all information provided to the NZCSA:{" "}
                  <br />
                  (1) will remain confidential, <br />
                  (2) will only be used internally within NZCSA.
                  <br />
                  4. I understand that personal information will be stored for
                  a period of three years, after which they will be securely
                  destroyed.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Grid container justify={"space-evenly"} spacing={4}>
              <Grid item align={"center"} md={10}>
                <FormControl
                  required
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    This form will be held for a period of 3 years.
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={understand}
                          onChange={handleUnderstand}
                          name="understand"
                        />
                      }
                      label="I understand"
                      align={"center"}
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify={"center"}>
          <Button disabled={!understand} onClick={handleSubmitUpgradeForm}>

            {loading ? (
              <CircularProgress color="inherit" size="2rem" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Grid>
      </form>
    </DialogContent>
  );
}
