import React from 'react'
import css from "../auth.module.css";
import {Button, Input, Label} from "../styledElements";
import {Link} from "react-router-dom";
import google from '../../../img/google.png'
import facebook from '../../../img/facebook.png'
import twitter from '../../../img/twitter.png'
import {useDispatch} from "react-redux";
import {authFunction} from "../../../state/authReducer";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";
import { useFormik } from "formik"


export const SignIn = WithAuthRedirect(() => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values:any) => {
            dispatch(authFunction(values.email, values.password))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={css.registration}>
                Войдите, чтобы получить доступ к консультации
            </div>
            <div className={css.mainWrapper}>
                <div className={css.signInForm}>
                    <Label>
                        Email
                        <Input
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="text"
                        />
                    </Label>
                    <Label>
                        Пароль
                        <Input
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type="password"
                        />
                    </Label>
                </div>
                <div>
                    <label className={css.rememberMe}>
                        <input type="checkbox"/>
                        Запомнить меня
                    </label>
                </div>
                <Button>Войти</Button>
                <div className={css.footerSignIn}>
                    <Link to={'/forgot'}>Забыли пароль?</Link>
                    <div className={css.socialNetworks}>
                        <Link to={'#'}><img src={google} alt="G"/></Link>
                        <Link to={'#'}><img src={facebook} alt="F"/></Link>
                        <Link to={'#'}><img src={twitter} alt="T"/></Link>
                    </div>
                    <Link className={css.noAkk} to={'/sign-up-consultant'}>Еще нет аккаунта? </Link>
                </div>
            </div>
        </form>
    )
})
