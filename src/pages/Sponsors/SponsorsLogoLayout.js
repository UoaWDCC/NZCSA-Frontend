import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core/";
import images from "./SponsorsLogoList";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  images: {
    width: "60%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function SponsorsLogoLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center" variant="h5">
              Our Valuable Sponsors
            </Typography>
          </Paper>
        </Grid>
        {images
          .filter((image) => image.description === "valuable")
          .map(({ id, src, title, description }) => (
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="20vh"
              >
                <img key={id} src={src} alt="Logo" className={classes.images} />
              </Box>
            </Grid>
          ))}

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center" variant="h5">
              Our Contributory Sponsors
            </Typography>
          </Paper>
        </Grid>
        {images
          .filter((image) => image.description === "contributory")
          .map(({ id, src, title, description }) => (
            <Grid item xs={12} sm={4}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="20vh"
              >
                <img key={id} src={src} alt="Logo" className={classes.images} />
              </Box>
            </Grid>
          ))}

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography align="center" variant="h5">
              Our Special Sponsors
            </Typography>
          </Paper>
        </Grid>
        <Grid
          container
          direction="coloum"
          justifyContent="space-around"
          style={{ paddingTop: "10px" }}
        >
          {images
            .filter((image) => image.description === "special")
            .map(({ id, src, title, description }) => (
              <Grid item xs={12} sm={4} alignContent="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  maxWidth="40vh"
                >
                  <img
                    key={id}
                    src={src}
                    alt="Logo"
                    className={classes.images}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </div>
  );
}
