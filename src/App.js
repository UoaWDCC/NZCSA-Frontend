import React, { useState, useEffect } from "react";
import "./App.css";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import red from "@material-ui/core/colors/red";
import axios from "axios";
import { AuthProvider } from "./context/auth.context";

// DO NOT CHANGEs
const PrivateRoute = ({ children, ...rest }) => {
  // Function for protected routes, eg.Dashboard, do not change anything in this section
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("authToken") ? children : <Redirect to="/login" />
      }
    />
  );
};

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
        main: "#7d2ae8",
      },
    },
    typography: {
      h5: {
        fontWeight: 600,
      },
    },
  });

  theme = responsiveFontSizes(theme);
  //console.log(localStorage.getItem("authToken"));

  return (
    <AuthProvider user={null}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Router>
              <Switch>
                <PrivateRoute exact path="/checkout">
                  <Dashboard checkout={true} />
                </PrivateRoute>
                <PrivateRoute exact path="/">
                  <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/yourEvents">
                  <Dashboard yourEvents={true} />
                </PrivateRoute>
                <Route path="/login">
                  <SignInSide changeDarkMode={changeDarkMode} />
                </Route>
                <Route path="/signup">
                  <SignUp changeDarkMode={changeDarkMode} />
                </Route>
                <Route path="/forgotPassword">
                  <ForgotPassword />
                </Route>
                <PrivateRoute path="/resetPassword">
                  <ResetPassword />
                </PrivateRoute>
                <PrivateRoute path="/:id">
                  <Dashboard />
                </PrivateRoute>
              </Switch>
            </Router>
          </header>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
