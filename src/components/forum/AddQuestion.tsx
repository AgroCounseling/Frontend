import React, {useState} from 'react'
import {Header, Wrapper} from "../Styles";
import {Comment} from "../answer/Answer";
import api from '../../api/Api'
import {checkToken} from "../../state/authReducer";
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';

const AddQuestion = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
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
            <Comment onAdd={sendText} btn={'Задать вопрос'} value={text} setValue={(e:any) => setText(e.target.value)} />
        </Wrapper>
    )
}


export default  AddQuestion