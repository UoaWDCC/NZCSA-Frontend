// import React from 'react';
import img1 from '../assets/aboutusbg.jpg';
import img2 from '../assets/bg.png'
import img3 from '../assets/2017BG1.jpg'
// import img4 from '../assets/pictures/sky4.png'

export default function RandomImagePicker() {

    const pictureArray = [img1, img2, img3];
    const randomIndex = Math.floor(Math.random() * pictureArray.length);
    const selectedPicture = pictureArray[randomIndex];

    return selectedPicture;
}
