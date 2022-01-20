import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core/";
import { useEffect, useState } from "react";
import SponsorCard from "../../components/SponsorCard";
import storeData from "../../assets/storeData";
import Typography from "@material-ui/core/Typography";
import images from '../../pages/Sponsors/SponsorsLogoList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function SponsorsLogoLayout() {

  let s = '';
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {storeData.map(({ name, discount, image, address, src }) => (

          s = JSON.stringify(image),
          s = s.slice(1, s.length - 1),
          <Grid item xs={12} key={src}>
            <SponsorCard
              id={src}
              title={name}
              location={address}
              discount={discount}
              image={s}
            />
          </Grid>
        ))}
      </Grid>
    </div >
  )
}
