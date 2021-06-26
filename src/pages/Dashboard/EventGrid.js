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
        { id: 1, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { id: 2, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { id: 3, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { id: 4, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { id: 5, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
        { id: 6, date: "FRI, AUG 6 AT 7:30 PM UTC+12", name: "Event1", location: "UOA City Campus" },
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
                {data.map((elem, i) => (
                    <Grid item xs={12} sm={6} md={3} key={elem.id.toString()}>
                        <EventCard id={elem.id.toString()} title={elem.name} date={elem.date} location={elem.location}/>
                     </Grid>
                ))}
            </Grid>
        </div>
    )
}