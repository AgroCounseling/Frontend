import React from 'react'
import css from './notAuth.module.css'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotAuth = () => {
    const { t } = useTranslation();

    return (
        <div className={css.wrapper}>
            <div className={css.imgWrapper}>
                <img src="https://image.flaticon.com/icons/svg/890/890163.svg" alt="lock" />
            </div>
            <div>{t('signInAnswer')}</div>
            <Link to={'/sign-in?back=true'}>{t('signInNoAuth')}</Link>
        </div>
    )
}

export default NotAuth