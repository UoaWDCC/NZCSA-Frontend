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
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';


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
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            image={img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align='center'>
                                About NZCSA
          </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                The New Zealand Chinese Students’ Association (NZCSA) is a charitable student society.
                                The aim of the Association is to serve Chinese students in New Zealand by way of promoting Chinese culture and
                                to act as a bridge between the Chinese student community and the New Zealand mainstream community.
          </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align='center'>
                                How to use
          </Typography>
                        </CardContent>
                        <Timeline align="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot>
                                        <FastfoodIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Eat
            </Typography>
                                        <Typography>Because you need strength</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="primary">
                                        <LaptopMacIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Code
            </Typography>
                                        <Typography>Because it&apos;s awesome!</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="primary" variant="outlined">
                                        <HotelIcon />
                                    </TimelineDot>
                                    <TimelineConnector className={classes.secondaryTail} />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Sleep
            </Typography>
                                        <Typography>Because you need rest</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="secondary">
                                        <RepeatIcon />
                                    </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            Repeat
            </Typography>
                                        <Typography>Because this is the life you love!</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardActionArea>

                </Card>

            </Grid>
        </Grid>
    )
}
