import React, { useState } from 'react'
import user from '../../img/user.png'
import css from './header.module.css'
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import logo from '../../img/agro-logo.png'
import Language from "./../Language/Language";
import { useTranslation } from "react-i18next";
import { isAuth } from "../../state/selectors";
import { signIn } from "../../state/authReducer";
import { GlobalStateType } from "../../state/root-reducer";
import { HeaderWrapper, LogoWrapper } from "./HeaderStyles";
import { setSearch } from "../../state/appReducer";
import navbarIcon from "./{6DE9A6CF-4617-42C8-90A9-7DD21D130022}.png.jpg";
const Header = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [str, setStr] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const { t } = useTranslation();
    const Logout = async () => {
        await props.signIn({
            isAuth: false
        })
        localStorage.removeItem('userData')
        history.push('/sign-in/1')
    }
    const submit = (e: any) => {
        e.preventDefault()
        dispatch(setSearch(str))
        history.push('/search')
    }
    return (
        <>
            <HeaderWrapper>
                {/* <div className={css.wrapper}> */}
                <div className={css.logoWrapper}>
                    <Link to={'/'} className={css.logo}>
                        <LogoWrapper>
                            <img src={logo} height={'100%'} alt="LOGO" />
                        </LogoWrapper>
                    </Link>
                    <form onSubmit={submit} className={css.form}>
                        <input value={str} onChange={(e) => setStr(e.target.value)} className={css.searchInput} placeholder={`${t("mainSearchPlaceholderText")}`} type="text" />
                        <input className={css.search} type={'submit'} value={''} />
                    </form>
                </div>
                <img src={navbarIcon} alt='navbarIcon' className={css.navbarIcon} onClick={toggle} />
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
                {/* </div>  */}

            </HeaderWrapper>
            {isOpen ? <div className={css.mobileWrapper}>
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
                <div className={css.mt10}>
                <Language />
                </div>
               
            </div>
                : null}</>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps, { signIn })(Header);
