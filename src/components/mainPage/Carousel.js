import React from 'react'
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide from "../../img/photoSlide.png";

const MainCarousel = (props) => {
    return (
        <Carousel
            autoPlay
            showIndicators={false}
            infiniteLoop={true}
            swipeable={true}
            showThumbs={false}
            dynamicHeight={false}
            showStatus={false}
        >
            {
                props.slider
                    ? props.slider.map((item,index)=><div key={item.pub_date}>
                        <img src={item.image} alt={index}/>
                    </div>)
                    : <div>
                        <img alt={'1'} src={slide}/>
                    </div>
            }
        </Carousel>
    )
}

export default MainCarousel