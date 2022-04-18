import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";

export default function DateDisplayComponent() {
    return (
        <Paper elevation={1} square >
            <Grid container justifyContent="space-around" >
                <Grid item xs={3} >
                    <Typography align="center">year</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center" style={{ borderRadius: '6px', color: 'white', fontWeight:'bold', backgroundColor: 'red', fontSize:'10px'}}>
                        NZCSA
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">zodiac</Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="space-around">
                <Grid item xs={3}>
                    <Typography align="center">Left Img</Typography>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ fontWeight: 'bold', fontSize: "5vw", textAlign: "center"}}>
                        18
                    </div>
                    <div>
                        <Typography align="center">学生小论坛</Typography>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">right Img</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}