import React from 'react'
import slide from "../../img/photoSlide.png";
import choose from '../../img/chooseCategory.png'
import find from '../../img/findConsultant.png'
import contact from '../../img/contact.png'
import arrow from '../../img/arrow-right.png'
import {MapsWrapper} from "./mainPage-styled-components";
import css from './mainPage.module.css'
import ConsultantCard from "../consultantCard/ConsultantCard";
import prev from '../../img/prev.png'
import next from '../../img/next.png'
import Carousel from "./Carousel";
import grass from '../../img/culture.png'
import culture from '../../img/culture-bg.png'
import {Link} from "react-router-dom";


const MainPage = () => {
    return (
        <div>
            <img src={slide} width={'100%'} alt="#"/>

            <MapsWrapper>
                <div>
                    <img src={choose} alt="Choose"/>
                    <span>
                        Выберите категорию
                    </span>
                </div>
                <div>
                    <img src={arrow} className={css.arrows} alt="#"/>
                    <span> </span>
                </div>
                <div>
                    <img src={find} alt="find"/>
                    <span>
                        Найдите подходящего консультанта
                    </span>
                </div>
                <div>
                    <img src={arrow} className={css.arrows} alt="#"/>
                    <span> </span>
                </div>
                <div>
                    <img src={contact} alt="Contact"/>
                    <span>
                        Свяжитесь с экспертом и <br/>
                        получите доступ к консультации
                    </span>
                </div>
            </MapsWrapper>

            <div className={css.cardsWrapper}>
                <span>
                <ConsultantCard/>
                <ConsultantCard/>
                <ConsultantCard/>
                <ConsultantCard/>
                <ConsultantCard/>
                <ConsultantCard/>
                </span>
                <div className={css.pagination}>
                    <button className={css.prev}>
                        <img src={prev} alt="prev"/>
                    </button>
                    <button className={css.next}>
                        <img src={next} alt="next"/>
                    </button>
                </div>
            </div>

        </div>
    )
}


export default MainPage
