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

export default function AltCard() {
    const classes = useStyles()
    const data = [
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
    ]
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {data.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                        <EventCard title={elem.name} date={elem.date} location={elem.location}/>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}