import React from 'react'
import {Ava, CardWrapper, ConnectButton, Description, Specialization, Star} from "./CardStyled";
import star from '../../img/star.png'
import {Link} from "react-router-dom";

type OwnProps = {
    url: string | null
    name: string
    last_name: string
    description: string
    star: number | string
    specialization: [{id: number, title: string}]
}

const ConsultantCard: React.FC<OwnProps> = (props) => {
    return (
        <CardWrapper>
            <Link to={`/consultant/${1}`}>
                <Ava>
                    <img
                        width={'100%'}
                        height={'100%'}
                        src={
                            props.url !== null ? props.url : "https://thumbs.dreamstime.com/b/young-man-agronom-checking-state-vegetables-tomatoes-tablet-greenhouse-men-agriculture-96553509.jpg"
                        }
                        alt="#"/>
                </Ava>
                <Star>
                    {props.star}
                    <img src={star} alt="star"/>
                </Star>
                <h2>{props.name} {props.last_name}</h2>

                <Description>
                    {props.description ? props.description : 'Нет описания'}
                </Description>

                <hr/>

                <p>
                    <Specialization>
                        Специализация:
                    </Specialization>
                    <span>
                        {props.specialization.map((item:any) => item.title + ', ')}
                    </span>
                </p>
            </Link>
            <ConnectButton>
                Связаться
            </ConnectButton>
        </CardWrapper>
    )
}


export default ConsultantCard
