import React from 'react'
import {HeaderWrapper, LogoWrapper} from "./HeaderStyles";
import {Link} from "react-router-dom";
import logo from '../../img/agro-logo.png'
import css from './header.module.css'
import {connect} from "react-redux";
import {GlobalStateType} from "../../state/root-reducer";
import {isAuth} from "../../state/selectors";
import {signIn} from "../../state/authReducer";

const Header = (props: any) => {
    const Logout = () => {
        localStorage.removeItem('userData')
        props.signIn({
            isAuth: false
        })
    }
    return (
        <HeaderWrapper>
            <div className={css.logoWrapper}>
                <Link to={'/'} className={css.logo}>
                    <LogoWrapper>
                        <img src={logo} height={'100%'} alt="LOGO"/>
                    </LogoWrapper>
                </Link>
                <div>
                    <input className={css.searchInput} placeholder={'Консультанты, категории....'} type="text"/>
                </div>
            </div>
            <div className={css.lastChildWrapper}>
                <Link to={'/forum'} className={css.forum}>Форум</Link>
                {
                    props.isAuth
                        ? <>
                            <Link to={'/admin'}>Пофиль</Link>
                            <button onClick={Logout}>Logout</button>
                        </>
                        : <>
                            <Link to={'/sign-in'} className={css.enter}>Войти</Link>
                            <Link to={'/sign-up'} className={css.register}>Зарегистрироваться</Link>
                        </>
                }
                <div className={css.lang}>
                    <span>РУ</span>
                    <span className={css.kg}>КР</span>
                </div>
            </div>
        </HeaderWrapper>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        isAuth: isAuth(state)
    }
}

export default connect(mapStateToProps, {signIn})(Header);
