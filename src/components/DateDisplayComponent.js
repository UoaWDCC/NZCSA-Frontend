import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";

export default function DateDisplayComponent() {
    return (
        <Paper elevation={1} square >
            <Grid container justifyContent="space-between" >
                <Grid item xs={3} >
                    <Typography align="center">year</Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography width={'60px'} align="center" marginTop={'4px'} style={{ borderRadius: '2px', color: 'white', fontWeight: 'bold', backgroundColor: 'red', fontSize: '12px' }}>
                        NZCSA
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">肖虎</Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="space-between" >
                <Grid item xs={3}>
                    <Typography align="center">Left Img</Typography>
                </Grid>
                <Grid item xs="auto">
                    <div style={{ fontWeight: 'bold', fontSize: "6vw", textAlign: "center" }}>
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