import React from 'react'
import css from './notAuth.module.css'
import {Link} from "react-router-dom";

const NotAuth = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.imgWrapper}>
                <img src="https://image.flaticon.com/icons/svg/890/890163.svg" alt="lock"/>
            </div>
            <div>Войдите, чтобы написать ответ</div>
            <Link to={'/sign-in'}>Войти через центр авторизации</Link>
        </div>
    )
}

export default NotAuth