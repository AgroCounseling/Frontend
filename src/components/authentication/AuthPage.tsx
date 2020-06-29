import React from 'react'
import {AuthWrapper} from "./styledElements";
import welcomeFlower from '../../img/welcomeFlower.png'
import css from './auth.module.css'

const AuthPage = (props: any) => {
    return (
        <AuthWrapper>
            <div className={css.formWrapper}>
                <div className={css.wrapper}>
                    <div className={css.welcomeText}>
                        Добро пожаловать в AgroConsulting!
                    </div>
                    {props.children}
                </div>
                <div className={css.flowerWrapper}>
                    <img src={welcomeFlower} className={css.welcomeFlower} alt="Flower"/>
                </div>
            </div>
        </AuthWrapper>
    )
}


export default AuthPage;
