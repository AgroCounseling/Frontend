import React from 'react'
import {Ava, CardWrapper, ConnectButton, Description, Specialization, Star} from "./CardStyled";
import star from '../../img/star.png'

type OwnProps = {}

const ConsultantCard: React.FC<OwnProps> = (props) => {
    return (
        <CardWrapper>
            <Ava>
                <img
                    width={'100%'}
                    src="https://hips.hearstapps.com/hbz.h-cdn.co/assets/cm/14/52/1280x1280/5499b60e41311_-_hbz-megan-promo.jpg?resize=480:*"
                    alt="#"/>
            </Ava>
            <Star>
                4.4
                <img src={star} alt="star"/>
            </Star>
            <h2>Megan Fox</h2>

            <Description>
                BS In Mechanical Engineering @ <br/>
                California State University
            </Description>

            <hr/>

            <p>
                <Specialization>
                    Специализация:
                </Specialization>
                <span>
                    Культура, Органика, Инновации, Культура, Органика, Инновации
                </span>
            </p>
            <ConnectButton>
                Связаться
            </ConnectButton>
        </CardWrapper>
    )
}


export default ConsultantCard
