import React from 'react'
import {
    Grid,
    Paper,
    Box
} from '@material-ui/core/';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';

export default function Qixi({ userData }) {

    const userAttendEventArray = userData.attendedEvents;


    console.log(userAttendEventArray);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Card>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="30vh"
                    >{!!(userAttendEventArray != undefined && userAttendEventArray.includes("610364e552985b0004e027b2")) ? (
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeArfuiBek5AomO-AjzyTQ4zP9pUbuhZurjnUcvej9G4SqnYA/viewform?embedded=true" width="640" height="1609" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                    ) : (
                            <Typography variant="h3">You need to register Qixi Festival</Typography>
                        )}

                    </Box>

                </Card>

            </Grid>
        </Grid>
    )
}
