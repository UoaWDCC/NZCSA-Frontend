import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  width: "1rem",
  height: "1rem",
  margin: 0,
  justifyContent: "center",
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  borderWidth: "2px",
  borderRight: 2,
  borderBottom: 2
};

export default function BorderAdditive(props) {
  const year = props.year;
  
  return (
    <Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ ...commonStyles,  borderLeft: 2,borderTop: 2,borderColor: "error.main"}}>
          <Typography fontSize={"10px"} sx={{ color: "red" }}>
          {year.charAt(0)}
          </Typography>
        </Box>
        <Box sx={{...commonStyles, borderTop: 2,borderColor: "error.main"}}>
          <Typography fontSize={"10px"} sx={{ color: "red" }}>
          {year.charAt(1)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{...commonStyles, borderLeft: 2,borderColor: "error.main"}}>
          <Typography fontSize={"10px"} sx={{ color: "red" }}>
          {year.charAt(2)}
          </Typography>
        </Box>
        <Box sx={{...commonStyles,borderColor: "error.main"}}>
          <Typography fontSize={"10px"} sx={{ color: "red" }}>
          {year.charAt(3)}
          </Typography>
        </Box>
      </Box>

    </Grid>
  );
}
