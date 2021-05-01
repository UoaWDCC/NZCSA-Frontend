import React from "react";
import "./App.css";
import SignInSide from "./pages/SignInSide";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const fakeAuth = {
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
const prefersDarkMode = 'dark';

const theme = createMuiTheme({
  palette: {
    type: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: "rgba(237, 28, 36, 0.6)",
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
