import React, {useEffect, useState} from 'react'
import {Header, MainButton, Wrapper} from "../Styles";
import api from '../../api/Api'
import {Route, useParams} from 'react-router-dom'
import Preloader from "../preloader/Preloader";
import noPicture from '../../img/noPicture.png'
import css from './answer.module.css'
import {GlobalStateType} from "../../state/root-reducer";
import {isAuth} from "../../state/selectors";
import {connect} from "react-redux";
import Footer from "../footer/Footer";

type Props = {
    isAuth: boolean
}
const Answer: React.FC<Props> = (props) => {
    const params: { id: string } = useParams()
    const [pending, setPending] = useState(true)
    const [question, setQuestion] = useState('')
    const [comments, setComments] = useState([])
    useEffect(() => {
        api.getQuestion(params.id)
            .then(
                (res: any) => {
                    console.log(res.data.comments)
                    setComments(res.data.comments)
                    setQuestion(res.data.description)
                    setPending(false)
                },
                (error: any) => {
                    console.log(error)
                }
            )
    }, [])

    if (pending) {
        return <Preloader/>
    }
    return (
        <>
            <Wrapper>
                <Header color={'#4D5B5C'}>{question}</Header>
                <div className={css.answers}>
                    {
                        comments.map((item: any) => {
                            return <AnswerList text={item.description}
                                               name={`${item.user.first_name} ${item.user.last_name}`}/>
                        })
                    }
                </div>
                {
                    props.isAuth
                        ? <Comment/>
                        : <div>Вы не авторизованны</div>
                }
            </Wrapper>
            <Footer/>
        </>
    )
}

type AnswerListProps = {
    name: string
    text: string
}
const AnswerList = (props: AnswerListProps) => {
    return (

        <div className={css.wrapper}>
            <div className={css.imgWrapper}>
                <img src={noPicture} alt="avatar"/>
            </div>
            <div className={css.textWrapper}>
                <div className={css.name}>{props.name}</div>
                <div className={css.answer}>{props.text}</div>
            </div>
        </div>
    )
}


const Comment = () => {
    return (
        <div className={css.wrapper} style={{marginBottom: '100px'}}>
            <div className={css.imgWrapper}>
                <img src={noPicture} alt="avatar"/>
            </div>
            <div>
                <textarea className={css.placeholder} placeholder={'Введите ваш ответ............'}/>
                <MainButton>Отправить ответ</MainButton>
            </div>
        </div>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps, {})(Answer)