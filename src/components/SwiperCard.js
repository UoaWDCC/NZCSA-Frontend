import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container } from "@material-ui/core";
import SliderImageCard from "./MainCard";
import img from "../assets/yong.gif"

import "swiper/swiper.min.css";
import "swiper/components/navigation";
import SwiperCore, {
  Autoplay, Pagination, Navigation
} from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);

const data = [
  {
    img: '/pn.png',
    // title: "永劫无间线上友谊赛",
    // date: "24 August 2021",
    // location: "ONLINE",
    id: "11111"
  },
  {
    img: img,
    title: "永劫无间线上友谊赛",
    // date: "24 August 2021",
    // location: "ONLINE",
    id: "11111"
  },
]


export default function SwiperCard(props) {

  return (
    <Swiper
      spaceBetween={30} centeredSlides={true} autoplay={{
        "delay": 2000,
        "disableOnInteraction": false
      }} pagination={{
        "clickable": true
      }} navigation={true} className="mySwiper"
    >
      {data.map(e => {
        return (
          <SwiperSlide>
            <SliderImageCard
              img={e.img}
              title={e.title}
              date={e.date}
              location={e.location}
              id={e.id} />
          </SwiperSlide>);
      })}



    </Swiper>
  );
}
