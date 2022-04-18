import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";

export default function DateDisplayComponent() {
    return (
        <Paper elevation={1} square >
            <Grid container spacing={2} justifyContent="space-around">
                <Grid item xs={3} >
                    <Typography align="center">year</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">NZCSA Logo</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">zodiac</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">Left Img</Typography>
                </Grid>
                <Grid item xs={4}>
                    <div>
                        <Typography align="center" style={{ fontWeight: 'bold' }}>18</Typography>
                    </div>
                    <div>
                    <Typography align="center">论坛</Typography>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">right Img</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}