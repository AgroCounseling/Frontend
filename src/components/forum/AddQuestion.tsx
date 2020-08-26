import React, { useState } from 'react'
import { Header, Wrapper } from "../Styles";
import { Comment } from "../answer/Answer";
import api from '../../api/Api'
import { checkToken } from "../../state/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { GlobalStateType } from "../../state/root-reducer";
import { isAuth } from "../../state/selectors";
import NotAuth from "../notAuthorized/NotAuth";
import { useTranslation } from "react-i18next";

const AddQuestion = () => {
    const [text, setText] = useState('');
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector((state: GlobalStateType) => isAuth(state))
    const sendQuestion = async () => {
        return dispatch(checkToken(() => api.createQuestion({
            category: 1,
            title: text
        })))
    }
    const sendText = () => {
        sendQuestion()
            .then((res: any) => {
                history.push('/forum')
            })
    }
    return (
        <Wrapper>
            <Header>
                <Link to={`/forum`} style={{ color: '#64A928' }}>Форум</Link>
            </Header>
            {
                auth
                    ? <Comment placeholder={`${t('questionText')}............`} onAdd={sendText} btn={t('question?')}
                        value={text}
                        setValue={(e: any) => setText(e.target.value)} />
                    : <NotAuth />
            }
        </Wrapper>
    )
}


export default AddQuestion