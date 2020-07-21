import React from 'react'
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide from "../../img/photoSlide.png";

const MainCarousel = (props) => {
    console.log(props.slider)
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
                props.map
                    ? props.map((item)=><div>
                        <img src={item.image} alt="#"/>
                    </div>)
                    : <div>
                        <img alt={'1'} src={slide}/>
                    </div>
            }
        </Carousel>
    )
}

export default MainCarousel