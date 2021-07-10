import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/';
import EventCard from "../../components/EventCard";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

export default function AltCard(props) {
    const classes = useStyles()

    let userEventsDetail = {};
    //console.log(props)

    if (props.userData) {
        if (Object.keys(props.userData).length !== 0) {
            for (let i = 0; i < props.userData.attendedEvents.length; i++) {
                const eventId = props.userData.attendedEvents[i]
                userEventsDetail[i] = props.data[eventId]
                // console.log(props.userData.attendedEvents[i])

            }
        }

    } else {
        userEventsDetail = props.data
    }

    //console.log(userEventsDetail)

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {Object.keys(userEventsDetail).map((elem, i) => (
                    <Grid item xs={12} sm={6} md={3} key={userEventsDetail[elem].id}>
                        <EventCard id={userEventsDetail[elem]._id} title={userEventsDetail[elem].eventName} date={userEventsDetail[elem].eventTime} location={userEventsDetail[elem].eventLocation} image={userEventsDetail[elem].eventImgUrl} isMember={props.isMember} price={userEventsDetail[elem].eventPrice} attendedEvents={props.attendedEvents} isYourPage={props.userData}/>

                    </Grid>
                ))}
            </Grid>
        </div>
    )
}