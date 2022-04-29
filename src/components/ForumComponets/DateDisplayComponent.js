import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from "@material-ui/core/Grid";
import YearDisplay from "./yearDisplay";
import { VerticalAlignBottom } from "@material-ui/icons";
import { textAlign } from "@mui/system";

const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    margin: 0,
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    borderWidth: "2px"
};

export default function DateDisplayComponent() {
    return (
        <Paper elevation={1} square >
            <Grid container justifyContent="space-between" >
                <Grid item xs={3} >
                    <Typography align="center" style={{ color: '#F44336', fontWeight: '900', fontFamily: "Roboto" }} >year</Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography width={'60px'} align="center" marginTop={'4px'} style={{ borderRadius: '2px', color: 'white', fontWeight: 'bold', backgroundColor: '#F44336', fontSize: '12px' }}>
                        NZCSA
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center" style={{ color: '#F44336', fontWeight: '900', fontFamily: "Roboto" }}>虎年</Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="space-between">
                <Grid item xs={3}>
                    <Typography align="center" >Left Img</Typography>
                    <span style={{ writingMode: "vertical-lr", fontWeight: 'bold',fontSize:'12px' }}>Calendar Fourm
                    </span>
                    <span style={{ writingMode: "vertical-lr", fontWeight: 'bold',fontSize:'12px' }}>分 享 资 讯
                    </span>
                </Grid>
                <Grid item xs="auto">
                    <div style={{ fontWeight: 'bold', fontSize: "6vw", textAlign: "center", fontFamily: "Roboto" }}>
                        18
                    </div>
                    <div>
                        <Typography align="center" style={{ color: '#919191', fontWeight: '900', fontFamily: "Roboto" }}>学生小论坛</Typography>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Typography align="center">
                        <YearDisplay year="贰零贰贰" />
                    </Typography>
                    <span style={{ writingMode: "vertical-lr", fontWeight: 'bold',fontSize:'12px' }}>寻 找 伙 伴
                    </span>
                    <span style={{ writingMode: "vertical-lr", backgroundColor: '#F44336',borderRadius: '2px', color: 'white', fontWeight: 'bold',padding: '2px', fontSize:'12px' }}>学 生 论 坛
                    </span>
                </Grid>
            </Grid>

        </Paper>
    )
}
