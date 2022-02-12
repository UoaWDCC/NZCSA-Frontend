import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import logo from "../assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
}));

export default function Copyright() {
  const classes = useStyles();
  return (
    <Box mt={5} align="center">
      <img className={classes.logo} src={logo} alt="cur" align="center" />
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://nzcsa.com">
          NZCSA
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <br />
        Version 3
      </Typography>
    </Box>
  );
}
