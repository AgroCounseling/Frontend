import React, {useEffect, useState} from 'react'
import {Header, MainButton, Wrapper} from "../Styles";
import api from '../../api/Api'
import {useHistory, useParams, useRouteMatch} from 'react-router-dom'
import Preloader from "../preloader/Preloader";
import noPicture from '../../img/noPicture.png'
import css from './answer.module.css'
import {GlobalStateType} from "../../state/root-reducer";
import {isAuth} from "../../state/selectors";
import {connect, useDispatch} from "react-redux";
import Footer from "../footer/Footer";
import {checkToken} from "../../state/authReducer";
import NotAuth from "../notAuthorized/NotAuth";

type Props = {
    isAuth: boolean
}
const Answer: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const params: { id: string } = useParams()
    const [pending, setPending] = useState(true)
    const [question, setQuestion] = useState('')
    const [comments, setComments] = useState<any>([])
    const [text, setText] = useState('')

    useEffect(() => {
        api.getQuestion(params.id)
            .then(
                (res: any) => {
                    setComments(res.data.comments)
                    setQuestion(res.data.title)
                    setPending(false)
                },
                (error: any) => {
                    console.log(error)
                }
            )
    }, [params.id])
    const sendQuestion = async () => {
        return  dispatch(checkToken(()=>api.setAnswer({
            forum: params.id,
            description: text
        })))
    }
    const sendText = () => {
        setPending(true)
        sendQuestion()
            .then((res:any) => {
                setComments([...comments, res.data])
                setPending(false)
            })
    }
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
                            return <AnswerList
                                key={item.id}
                                text={item.description}
                                name={`${item.user.first_name} ${item.user.last_name}`}/>
                        })
                    }
                </div>
                {
                    props.isAuth
                        ? <Comment onAdd={sendText} value={text} setValue={(e:any) => setText(e.target.value)} btn={'Отправить ответ'}/>
                        : <NotAuth />
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

type CommentProps = {
    btn: string
    value: string
    setValue: (e:any) => void
    onAdd: () => void
}
export const Comment = (props:CommentProps) => {
    return (
        <div className={css.wrapper} style={{marginBottom: '100px'}}>
            <div className={css.imgWrapper}>
                <img src={noPicture} alt="avatar"/>
            </div>
            <div>
                <textarea value={props.value} onChange={props.setValue} className={css.placeholder} placeholder={'Введите ваш ответ............'}/>
                <MainButton onClick={props.onAdd}>{props.btn}</MainButton>
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