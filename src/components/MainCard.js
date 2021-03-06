import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
// import SliderImageCard from "./SliderImageCard";
// import img from "../assets/yong.gif"

import "swiper/swiper.min.css";
import "swiper/components/navigation";
import SwiperCore, {
    Autoplay, Pagination, Navigation
} from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);


const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 140,
        [theme.breakpoints.up("sm")]: {
            height: 340,
        },
        filter: props => props.darken ? "brightness(70%)" : null,
    },
    overlay: {
        position: "absolute",
        display: "flex",
        flexFlow: "column wrap",
        width: "100%",
        textAlign: "center",
        top: 0,
        left: 0,
        color: "white",
    },
    sub: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
}));

export default function MainCard(props) {
    const classes = useStyles(props);

    return (
        <Card className={classes.root}>
            <CardActionArea component={RouterLink} >
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={props.img}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.overlay}>
                    <Container>
                        <Typography xs={0} variant="subtitle1" component="p">
                            {props.date}
                        </Typography>
                        <Typography className={classes.heading} gutterBottom variant="h2" component="h2">
                            {props.title}
                        </Typography>
                        <Typography className={classes.sub} gutterBottom variant="subtitle2" component="p">
                            {props.location}
                        </Typography>
                        {/* {props.btn && <Button variant="contained" size="medium" color="secondary" width="20px" className={classes.but}>
              Find Out More
            </Button>} */}
                    </Container>
                </CardContent>
            </CardActionArea>
        </Card>

    );

}
