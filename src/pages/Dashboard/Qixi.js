import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Box
} from '@material-ui/core/';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';

export default function Qixi() {


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Card>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="30vh"
                    >
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdMPe0FfRsWNF2iE6Sr6YJoTE4wxZ-UpWzRjtj2CQJUaC-FZA/viewform?embedded=true" width="640" height="3287" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

                    </Box>

                </Card>

            </Grid>
        </Grid>
    )
}
