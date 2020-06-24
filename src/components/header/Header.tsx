import React from 'react'
import {HeaderWrapper, LogoWrapper} from "./HeaderStyles";
import {Link} from "react-router-dom";
import logo from '../../img/logo.png'
import css from './header.module.css'

const Header = () =>{
    return (
        <HeaderWrapper>
            <Link to={'/'} className={css.logo}>
                <LogoWrapper>
                    <img src={logo} height={'100%'} alt="LOGO"/>
                    <span>
                         AgroConsulting
                    </span>
                </LogoWrapper>
            </Link>

            <div>
                <input className={css.searchInput} placeholder={'Консультанты, категории....'} type="text"/>
            </div>

            <div className={css.lastChildWrapper}>
                <Link to={'/sign-in'} className={css.enter}>Войти</Link>
                <Link to={'/sign-up-consultant'} className={css.register}>Зарегистрироваться</Link>

                <div className={css.lang}>
                    <span>РУ</span>
                    <span className={css.kg}>КР</span>
                </div>
            </div>
        </HeaderWrapper>
    )
}


export default Header;
