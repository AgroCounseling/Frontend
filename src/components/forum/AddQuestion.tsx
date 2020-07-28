import React, {useState} from 'react'
import {Header, Wrapper} from "../Styles";
import {Comment} from "../answer/Answer";
import api from '../../api/Api'
import {checkToken} from "../../state/authReducer";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {GlobalStateType} from "../../state/root-reducer";
import {isAuth} from "../../state/selectors";
import NotAuth from "../notAuthorized/NotAuth";

const AddQuestion = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector((state:GlobalStateType)=> isAuth(state))
    const sendQuestion = async () => {
        return  dispatch(checkToken(()=>api.createQuestion({
            category: 1,
            title: text
        })))
    }
    const sendText = () => {
        sendQuestion()
            .then((res:any) => {
                history.push('/forum')
            })
    }
    return (
        <Wrapper>
            <Header>Форум</Header>
            {
                auth
                    ? <Comment onAdd={sendText} btn={'Задать вопрос'} value={text}
                               setValue={(e: any) => setText(e.target.value)}/>
                    : <NotAuth />
            }
        </Wrapper>
    )
}


export default  AddQuestion