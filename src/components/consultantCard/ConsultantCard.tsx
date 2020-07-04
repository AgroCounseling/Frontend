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
                    height={'100%'}
                    src="https://thumbs.dreamstime.com/b/young-man-agronom-checking-state-vegetables-tomatoes-tablet-greenhouse-men-agriculture-96553509.jpg"
                    alt="#"/>
            </Ava>
            <Star>
                4.4
                <img src={star} alt="star"/>
            </Star>
            <h2>Agronomov Agronom</h2>

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
