import React, { useState, useEffect, useContext } from "react";
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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import red from "@material-ui/core/colors/red";
// import axios from "axios";
import { AuthProvider } from "./context/auth.context";
import { DarkModeContext } from "./context/darkMode";

import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  const { darkMode } = useContext(DarkModeContext)

  const changeDarkMode = (input) => {
    setDarkMode(input);
  };

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
                  <PrivateRoute path="/sponsors">
                    <Dashboard sponsors={true} />
                  </PrivateRoute>
                  <PrivateRoute path="/about">
                    <Dashboard about={true} />
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
                  <Route path="/resetPassword">
                    <ResetPassword />
                  </Route>
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
