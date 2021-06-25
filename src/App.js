import React, {useState} from "react";
import "./App.css";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import red from "@material-ui/core/colors/red";
import { deepPurple } from "@material-ui/core/colors";

// DO NOT CHANGE
const fakeAuth = {
  // This function sets the authentication state, will connect to backend in future
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

// DO NOT CHANGE
function PrivateRoute({ children, ...rest }) {
  // Function for protected routes, eg.Dashboard, do not change anything in this section
  return (
    <Route
      {...rest}
      render={() => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false); // Currently dark mode is enabled by default, will change in the future

  function changeDarkMode(input) {
    setDarkMode(input);
  }

  let theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: red,
      secondary: {
        main: "#7e57c2",
      },
    },
  });

  theme = responsiveFontSizes(theme);


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path="/">
                <SignInSide changeDarkMode={changeDarkMode}/>
              </Route>
              <Route path="/login">
                <SignInSide changeDarkMode={changeDarkMode}/>
              </Route>
              <Route path="/signup">
                <SignUp changeDarkMode={changeDarkMode}/>
              </Route>
              <Route path="/forgotPassword">
                <ForgotPassword />
              </Route>
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/resetPassword">
                <ResetPassword />
              </PrivateRoute>
            </Switch>
          </Router>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
