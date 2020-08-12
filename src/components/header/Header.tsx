import React, {useEffect, useState} from 'react'
import user from '../../img/user.png'
import css from './header.module.css'
import {connect, useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from '../../img/agro-logo.png'
import Language from "./../Language/Language";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../state/selectors";
import { signIn } from "../../state/authReducer";
import { GlobalStateType } from "../../state/root-reducer";
import { HeaderWrapper, LogoWrapper } from "./HeaderStyles";
import api from '../../api/Api'
import {setSearch} from "../../state/appReducer";

const Header = (props: any) => {
    const [str, setStr] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation();
    const Logout = async () => {
        await props.signIn({
            isAuth: false
        })
        localStorage.removeItem('userData')
    }
    const submit = (e:any) =>{
        e.preventDefault()
        dispatch(setSearch(str))
        history.push('/search')
    }
    return (
        <HeaderWrapper>
            <div className={css.logoWrapper}>
                <Link to={'/'} className={css.logo}>
                    <LogoWrapper>
                        <img src={logo} height={'100%'} alt="LOGO" />
                    </LogoWrapper>
                </Link>
                <form onSubmit={submit} className={css.form}>
                    <input value={str} onChange={(e)=>setStr(e.target.value)} className={css.searchInput} placeholder={`${t("mainSearchPlaceholderText")}`} type="text" />
                    <input className={css.search} type={'submit'} value={''}/>
                </form>
            </div>
            <div className={css.lastChildWrapper}>
                <Link to={'/forum'} className={css.forum}>Форум</Link>
                {
                    props.isAuth
                        ? <>
                            <div onClick={Logout} className={css.forum}>{t("logOff")}</div>
                            <Link to={'/admin'} className={css.uerWrapper}>
                                <img src={user} alt="user" />
                            </Link>
                        </>
                        : <>
                            <Link to={'/sign-in/1'} className={css.enter}>{t("singIn")}</Link>
                            <Link to={'/sign-up'} className={css.register}>{t("register")}</Link>
                        </>
                }
                <Language />
                {/* <div className={css.lang}>
                    <span>РУ</span>A
                    <span className={css.kg}>КР</span>
                </div> */}
            </div>
        </HeaderWrapper>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps, { signIn })(Header);
