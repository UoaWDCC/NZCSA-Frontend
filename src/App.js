import React from "react";
import "./App.css";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function PrivateRoute({ children, ...rest }) {
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
const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

const theme = createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[500],
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
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Router>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
