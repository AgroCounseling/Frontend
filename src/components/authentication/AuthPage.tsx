import React from 'react'
import { AuthWrapper } from "./styledElements";
import welcomeFlower from '../../img/welcomeFlower.png'
import css from './auth.module.css'
import { useTranslation } from "react-i18next";

const AuthPage = (props: any) => {
    const { t } = useTranslation();
    return (
        <AuthWrapper>
            <div className={css.formWrapper}>
                <div className={css.wrapper}>
                    <div className={css.welcomeText}>
                        {t('welcome')}
                    </div>
                    {props.children}
                </div>
                <div className={css.flowerWrapper}>
                    { welcomeFlower ? <img src={welcomeFlower} className={css.welcomeFlower} alt="Flower" /> : null}
                </div>
            </div>
        </AuthWrapper>
    )
}


export default AuthPage;
