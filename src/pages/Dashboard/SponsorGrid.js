/**
 * SponsorGrid.js displays cooperated merchants information in the dashboard.
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core/";
import SponsorCard from "../../components/SponsorCard";
import discountData from "../../assets/discountData";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function SponsorsLogoLayout() {

  let imageName = '';
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
        {discountData.map(({ name, discount, image, address, src }) => (
          imageName = JSON.stringify(image),
          imageName = imageName.slice(1, imageName.length - 1),
          <Grid item xs={12} key={src}>
            <SponsorCard
              id={src}
              title={name}
              location={address}
              discount={discount}
              image={imageName}
            />
          </Grid>
        ))}
      </Grid>
    </div >
  )
}
