import React from 'react'
import { AuthWrapper, BtnsWrapper, WelcomeTitle } from "./styledElements";
import { Link } from "react-router-dom";
import css from './auth.module.css'
import { useTranslation } from "react-i18next";

const WelcomePage = () => {
    const { t } = useTranslation();

    return (
        <AuthWrapper>
            <WelcomeTitle>{t('welcome')}</WelcomeTitle>
            <BtnsWrapper>
                <Link className={css.btns} to={'/sign-up-consultant'}>
                    {t('IamConsultant')}
                </Link>
                <Link className={css.btns} to={'/sign-up-client'}>
                    {t('IamConsultant')}
                </Link>
            </BtnsWrapper>
        </AuthWrapper>
    )
}

export default WelcomePage