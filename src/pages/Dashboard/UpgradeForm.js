import React, { useState } from "react";
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
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  consent: {
    backgroundColor: "#D8D8D8",
  },
}));

export default function UpgradeForm(props) {
  // const [gender, setGender]=useState()
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [wechatId, setWechatId] = useState("");
  const [phone, setPhone] = useState("");
  const [stdentId, setStudentId] = useState("");
  const [birthday, setBirthday] = useState();
  const [yearError, setYearError] = useState("");
  const [university, setUniversity] = useState("");
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
  const [faculties, setFaculties] = useState([]);
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [understand, setUnderstand] = useState(false);
  // const [facultyList,setFacultyList]=useState();
  const [hasErrors, setHasErrors] = useState(false);
  const isError = (condition) => hasErrors && condition;

  const handleBirthdayChange = (date) => {
    console.log(date);
    setBirthday(date);
  };

  const handleFaculty = (event) => {
    //getFaculties();
    setFaculty({ ...faculty, [event.target.name]: event.target.checked });
  };

  const handleGender = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handlePhone = (event) => {
    console.log(event.target.value);
    setPhone(event.target.value);
  };

  const handleStudentId = (event) => {
    console.log(event.target.value);
    setStudentId(event.target.value);
  };

  const handleWechatId = (event) => {
    console.log(event.target.value);
    setWechatId(event.target.value);
  };

  const handleMajor = (event) => {
    console.log(event.target.value);
    setMajor(event.target.value);
  };

  const handleYear = (event) => {
    console.log(event.target.value);
    //yearCheck(event);
    setYear(event.target.value);
    try {
      let y = parseInt(event.target.value);
      if (y >= 1 && y <= 15) {
        setYearError("");
      } else {
        setYearError("Please enter a valid year of study");
        //setYear("")
      }
    } catch (e) {
      setYearError("Please enter a valid year of study");
    }
  };

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handleUnderstand = (event) => {
    setUnderstand(event.target.checked);
  };

  const getFaculties = () => {
    let arr = [];
    const list = Object.keys(faculty);
    for (let i = 0; i < list.length; i++) {
      if (faculty[list[i]] && list[i] !== "Others") {
        arr.push(list[i]);
      } else if (list[i] === "Others" && faculty[list[i]] === true) {
        arr.push(otherFaculty);
      }
    }
    return arr;
    //setFaculties(arr);
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
    console.log(e.target.value);
    setUniversity(e.target.value);
  };

  // const handleSubmitUpgradeForm = () => {
  //     setHasErrors(true);
  //     const facs = getFaculties();
  //     let userInfo = { name: name, gender: gender, university: university, major: major, year: year, faculty: facs, dateofbirth: birthday, wechatid: wechatId, phone: phone };
  //     props.parentCallback(userInfo)
  //     if (name.length != 0 && gender.length != 0 && wechatId.length != 0 && phone.length!= 0 && birthday != undefined) {
  //       if (major.length != 0 && year.length != 0 && facs.length != 0 && university.length != 0) {
  //         props.handleNext();
  //       }
  const returnFaculty = () => {
    let key1 = "None";
    Object.keys(faculty).forEach((key) => {
      if (faculty[key]) {
        key1 = key;
      }
    });
    return key1;
  };

  const handleSubmitUpgradeForm = async () => {
    setLoading(true);
    const selectedFaculty = returnFaculty();
    const info = {
      gender,
      university,
      selectedFaculty,
      birthday,
      phone,
      stdentId,
    };
    try {
      console.log(info);
      const response = await signUpMembership(info);
      if (response.status === 200) {
        setLoading(false);
        props.handleNext();
      } else {
        setLoading(false);
        console.log("error");
      }
      //props.handleNext();
    } catch (e) {
      console.log(e);
    }

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
    //console.log(faculty);

    return (
      <DialogContent>
        <form>
          <Grid container spacing={4} justify={"space-between"}>
            <Grid item md={12}>
              <Grid container justify={"space-evenly"} spacing={4}>
                <Grid item md={4}>
                  <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Chinese Name"
                    type="name"
                    fullwidth="true"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={isError(name.length === 0)}
                    helperText={
                      isError(name.length === 0) &&
                      "Please enter your last name"
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <FormControl
                    required
                    component="fieldset"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    error={isError(gender.length === 0)}
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
                    required
                    value={wechatId}
                    onChange={(e) => setWechatId(e.target.value)}
                    error={isError(wechatId.length === 0)}
                    helperText={
                      isError(wechatId.length === 0) &&
                      "Please enter your WeChat ID"
                    }
                  />
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
                      onChange={(e) => setBirthday(e)}
                      error={isError(birthday == undefined)}
                      helperText={
                        isError(birthday == undefined) &&
                        "Please select your birthday"
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container justify={"space-evenly"} spacing={4}>
                <Grid item md={4}>
                  <TextField
                    required
                    margin="dense"
                    id="Phone"
                    label="Phone number"
                    type="tel"
                    fullwidth="true"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={isError(phone.length === 0)}
                    helperText={
                      isError(phone.length === 0) &&
                      "Please enter your phone number"
                    }
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    margin="dense"
                    id="studentId"
                    label="Student ID"
                    type="text"
                    fullwidth="true"
                    onChange={(e) => setStudentId(e.target.value)}
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
                      <FormControl required component="fieldset">
                        <FormLabel
                          component="legend"
                          error={isError(university.length === 0)}
                        >
                          University
                        </FormLabel>
                        <RadioGroup
                          aria-label="University"
                          name="University"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
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
                    <Grid item md={12}>
                      <TextField
                        required
                        label="Major/Specialisation"
                        type="Text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        error={isError(major.length === 0)}
                        helperText={
                          isError(major.length === 0) &&
                          "Please enter your major or specialisation"
                        }
                      />
                    </Grid>
                    <Grid item md={12}>
                      <TextField
                        required
                        label="Year of Study"
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        error={isError(year.length === 0) || !!yearError}
                        helperText={
                          (isError(year.length === 0) &&
                            "Please enter your year of study") ||
                          (!!yearError && yearError)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={4}>
                  <FormControl
                    required
                    component="fieldset"
                    className={classes.formControl}
                    error={isError(faculties.length === 0)}
                  >
                    <FormLabel component="legend">Faculty</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Arts}
                            onChange={(e) => handleFaculty(e)}
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
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Bussiness School"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Science}
                            name="Science"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Science"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={NICAI}
                            name="NICAI"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="NICAI"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Engineering}
                            name="Engineering"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Engineering"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Law}
                            name="Law"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Law"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Medicine}
                            name="Medicine"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Medicine"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Architecture}
                            name="Architecture"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="Architecture"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={CollegeOfFoundation}
                            name="CollegeOfFoundation"
                            onChange={(e) => handleFaculty(e)}
                          />
                        }
                        label="College of Foundation"
                      />
                      <CheckboxInputBtn
                        options={faculty}
                        setOption={(e) => handleFaculty(e)}
                        setOtherOption={(e) => handleFaculty(e)}
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container justify={"space-evenly"} spacing={4}>
                <Grid item align={"left"} md={10} className={classes.consent}>
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
            <Button
              disabled={!understand}
              variant="outlined"
              onClick={handleSubmitUpgradeForm}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </DialogContent>
    );
  };
}
