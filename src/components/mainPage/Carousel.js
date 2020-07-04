import React from 'react'
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide from "../../img/photoSlide.png";
import slide2 from "../../img/slide-2.png";

const MainCarousel = (props) => {
    return (
        <Carousel
            autoPlay
            showIndicators={false}
            infiniteLoop={true}
            swipeable={true}
            showThumbs={false}
            dynamicHeight={false}
        >
            <div>
                <img alt={'1'} src={slide}/>
            </div>
            <div>
                <img alt={'2'} src={slide2}/>
            </div>
        </Carousel>
    )
}

export default MainCarousel