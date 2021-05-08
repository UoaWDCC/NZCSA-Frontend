import React from "react";
import "./App.css";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
const prefersDarkMode = 'dark'; // Currently dark mode is enabled by default, will change in the future

const theme = createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: "rgba(237, 28, 36, 0.6)", // This is the primary color
    },
  },
});

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Router>
            <Switch>
              <Route exact path="/">
                <SignInSide />
              </Route>
              <Route path="/login">
                <SignInSide />
              </Route>
              <Route path="/signup">
                <SignUp />
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
