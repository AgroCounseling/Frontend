import React from 'react'
import {AuthWrapper, BtnsWrapper, WelcomeTitle} from "./styledElements";
import {Link} from "react-router-dom";
import css from './auth.module.css'
const WelcomePage = () => {
    return (
        <AuthWrapper>
           <WelcomeTitle>Добро пожаловать в AgroConsulting!</WelcomeTitle>
            <BtnsWrapper>
                    <Link className={css.btns} to={'/sign-up-consultant'}>
                        Я консультант
                    </Link>
                    <Link className={css.btns} to={'/sign-up-client'}>
                        Я Клиент
                    </Link>
            </BtnsWrapper>
        </AuthWrapper>
    )
}

export default WelcomePage