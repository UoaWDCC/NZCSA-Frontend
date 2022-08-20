import React, { useState } from "react";
// import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, Typography } from "@material-ui/core";
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
import { signUpMembership } from "../../api/connectBackend";
import CircularProgress from "@material-ui/core/CircularProgress";
// import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  consent: {
    backgroundColor: "#D8D8D8",
  },
}));

/**
 * Actual payment page the user sees to make transactions, calls payment api in backend to send order request
 * Supports Wechat, Alipay, and bank transfer via polipay.
 * NOTE: the orderType is either "membership-payment" or "event-payment"
 * @param {object} props handleNext() that notify Upgrade.js membership signup is successful
 */
export default function UpgradeForm(props) {
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [wechatId, setWechaId] = useState("");
  const [wechatError, setWechatError] = useState(false);
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
  // the 'I understand' in Consent of Membership
  const [understand, setUnderstand] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const isError = (condition) => showErrors && condition;

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
    if (
      event.target.value.length >= 6 &&
      event.target.value.length <= 20 &&
      isNaN(event.target.value[0])
    ) {
      event.target.setAttribute("color", "success");
      setWechatError(false);
    } else {
      setWechatError(true);
      event.target.setAttribute("color", "warning");
    }
  };

  const handleUnderstand = (event) => {
    setUnderstand(event.target.checked);
  };

  // const getAllFaculty = () => {
  //   const list = Object.keys(faculty)
  //     .map((key, index) => {
  //       if (faculty[key] && key !== "Others") {
  //         return key;
  //       } else if (key === "Others" && faculty[key] === true) {
  //         return otherFaculty;
  //       }
  //       return null;
  //     })
  //     .filter((el) => {
  //       return el != null;
  //     });
  // };

  const handleUniversity = (e) => {
    setUniversity(e.target.value);
  };

  const getFaculty = () => {
    let key1 = "";
    Object.keys(faculty).forEach((key) => {
      if (faculty[key]) {
        key1 = key;
      }
    });
    return key1;
  };

  // check all input is valid format
  const checkIfComplete = () => {
    return (
      gender.length > 0 &&
      phone.length > 0 &&
      getFaculty().length > 0 &&
      wechatId.length > 0 &&
      !wechatError &&
      university.length > 0
    );
  };

  // submitting to backend database
  const handleSubmitUpgradeForm = async () => {
    setShowErrors(true);
    const selectedFaculty = getFaculty();
    const info = {
      gender,
      university,
      selectedFaculty,
      birthday,
      phone,
      stdentId,
      wechatId,
      university,
    };

    if (checkIfComplete()) {
      setLoading(true);
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
              <Grid item md={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
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
                  required
                  margin="dense"
                  id="wechatId"
                  inputProps={{ maxLength: 20 }}
                  label="Wechat ID"
                  type="text"
                  onChange={handleWechatID}
                  error={isError(wechatId.length === 0 || wechatError)}
                  helperText={
                    (isError(wechatId.length === 0) &&
                      "Please enter your WeChat ID") ||
                    (isError(wechatError) && "Please enter a valid WeChat ID")
                  }
                />
                <Typography
                  variant="body2"
                  style={{ marginBottom: "-50px", color: "#69696b" }}
                >
                  If you don't have a WeChat ID, please enter&nbsp;
                  <div style={{ fontWeight: "bold", display: "inline" }}>
                    nowechatid
                  </div>
                </Typography>
              </Grid>
              <Grid item md={10}>
                <TextField
                  required
                  margin="dense"
                  id="Phone"
                  InputProps={{ inputProps: { maxLength: 15 } }}
                  label="Phone number"
                  fullwidth="true"
                  onChange={handlePhone}
                  error={isError(phone.length === 0)}
                  helperText={
                    isError(phone.length === 0) &&
                    "Please enter your phone number"
                  }
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
                      error={isError(getFaculty().length === 0)}
                    >
                      <FormLabel component="legend">Faculty</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Arts}
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
                <FormControl
                  required
                  component="fieldset"
                  error={isError(university.length === 0)}
                >
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
                  I have read and understand the regulation and constitution of
                  NZCSA. I have had the opportunity to ask questions and have
                  them answered to my satisfaction:
                  <br />
                  1. I agree to take part in this students' association.
                  <br />
                  2. I understand that I am free to discontinue participating at
                  any time, and to withdraw my data any time without giving a
                  reason, however, the membership fee will not be refunded.
                  <br />
                  3. I understand that all information provided to the NZCSA:{" "}
                  <br />
                  (1) will remain confidential, <br />
                  (2) will only be used internally within NZCSA.
                  <br />
                  4. I understand that personal information will be stored for a
                  period of three years, after which they will be securely
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
