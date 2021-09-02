import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Box
} from '@material-ui/core/';
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import img from '../../assets/bg.png';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import EventIcon from '@material-ui/icons/Event';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    media: {
        height: 340,
    },
    paper: {
        padding: '20px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function AboutLayout() {

    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Card className={classes.root}>

                        <CardMedia
                            className={classes.media}
                            component="img"
                            image={img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="h2" align='center'>
                                How to use
          </Typography>
                        </CardContent>
                        <Timeline align="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot>
                                        <AccountCircleIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Upgrade
            </Typography>
                                        <Typography>Sign up our membership and be become our member</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="primary">
                                        <CreateIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Compelete Information form
            </Typography>
                                        <Typography>Fill out the form</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="primary" variant="outlined">
                                        <EventIcon />
                                    </TimelineDot>
                                    <TimelineConnector className={classes.secondaryTail} />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Register for events
            </Typography>
                                        <Typography>Select the your event</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="secondary">
                                        <DoneIcon />
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Done
            </Typography>
                                        <Typography>We will see you there!</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>

                </Card>

            </Grid>
        </Grid>
    )
}
