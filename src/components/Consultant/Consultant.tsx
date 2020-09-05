import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Preloader from "../preloader/Preloader";
import Footer from "../footer/Footer";
import css from './consultant.module.css'
import api from '../../api/Api'
import noPicture from '../../img/noPicture.png'
import Stars from './Stars'
import { GlobalStateType } from "../../state/root-reducer";
import { getSpecialties } from "../../state/selectors";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

type Props = {
    specialties: any
}
const Consultant: React.FC<Props> = (props) => {
    const params: { id?: string | undefined } = useParams();
    const { t } = useTranslation();

    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    console.log(user)
    const [specialties, setSpecialties] = useState<any>([])
    useEffect(() => {
        api.getUser(params.id)
            .then((res: any) => {
                console.log(res)
                setUser(res.data)
                let arr = res.data.specialty.map((item: any) => props.specialties.find((i: any) => item.category === i.id ? i.title : null))
                setSpecialties(arr)
                setPending(false)
            })
    }, [params.id, props.specialties])
    if (pending) {
        return <Preloader />
    }
    return (
        <div className={css.wrapper}>
            <div className={css.feedBackWrapper}>
                <div className={css.feedBack}>
                    <span>
                        {
                            user.reviews.map((item: any) => <Answer key={item.id} name={item.name}
                                answer={item.text}
                                date={''}
                                stars={item.star?.value} />)
                        }
                    </span>
                </div>
                <div>
                    <div className={css.user}>
                        <div className={css.imgWrapper}>
                            <img src={user?.user?.photo ? user.user.photo : noPicture} alt="NoPicture" />
                        </div>
                        <div className={css.person}>
                            <div className={css.nameWrapper}>
                                <div className={css.name}>{user.user.first_name} {user.user.last_name}</div>
                                <Stars color={'red'} edit={false} size={33} value={user.middle_star} />
                            </div>
                            <div className={css.specialty}>{t('specialty')}: {
                                specialties.map((item: any, index: number) => <span key={item.id}> {index + 1 !== specialties.length ? item.title + ', ' : item.title} </span>)
                            }</div>
                        </div>
                    </div>
                    <div>
                        <div className={css.education}>{t('info')}</div>
                        <div className={css.text}>{user.description}</div>
                    </div>
                </div>
            </div>
            <div className={css.footerWrapper}>
                <Footer />
            </div>
        </div>
    )
}

type AnswerProps = {
    name: string
    answer: string
    stars: number | boolean | any
    date: string
}
const Answer: React.FC<AnswerProps> = (props) => {
    console.log(props.stars)
    return (
        <div className={css.answerWrapper}>
            <div className={css.answerName}>{props.name}</div>
            <div className={css.answer}>{props.answer}</div>
            <div className={css.stars}>
                {
                    props.stars ? <Stars edit={true} color={'#ffd700'} size={24} value={props.stars} />
                        : <Stars edit={true} color={'#ffd700'} size={24} value={4} />
                }
                <div>{props.date}</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        specialties: getSpecialties(state)
    }
}
export default connect(mapStateToProps, {})(Consultant)