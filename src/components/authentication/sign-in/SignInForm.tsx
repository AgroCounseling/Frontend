import React, {useState} from 'react'
import css from "../auth.module.css";
import {Button, Input, Label} from "../styledElements";
import {Link} from "react-router-dom";
import google from '../../../img/google.png'
import facebook from '../../../img/facebook.png'
import twitter from '../../../img/twitter.png'
import {useDispatch} from "react-redux";
import {authFunction} from "../../../state/authReducer";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";

export const SignIn = WithAuthRedirect(() => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submit = (e: any) => {
        e.preventDefault()
        dispatch(authFunction(email, password))
    }
    return (
        <form onSubmit={submit}>
            <div className={css.registration}>
                Войдите, чтобы получить доступ к консультации
            </div>
            <div className={css.mainWrapper}>
                <div className={css.signInForm}>
                    <Label>
                        Email
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="text"/>
                    </Label>
                    <Label>
                        Пароль
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"/>
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
