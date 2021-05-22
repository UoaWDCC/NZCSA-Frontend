import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BackgroundImage from '../assets/bg.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EventCard(props){
    const classes = useStyles({
        root:{
            Width: "100%",
            height:300,

        },
        img:{
            // height: 277,
            height:180
        }
    });

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} component="img" image={BackgroundImage} />
            </CardActionArea>
            <CardActionArea>
                <CardContent>
                    <Typography variant="p">
                        {props.date}
                    </Typography>
                    <Typography variant="h5">
                        {props.eventName}
                    </Typography>
                    <Typography variant="p">
                        {props.eventType}
                    </Typography>
                </CardContent>
                <Button variant="outlined">Register</Button>
            </CardActionArea>
        </Card>

    )
}