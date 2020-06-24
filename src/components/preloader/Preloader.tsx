import React from 'react'
import css from './preloader.module.css'
import favicon from '../../img/logo.png'


const Preloader = () => {
    return (
        <div className={css.container}>
            <svg className={css.loader}  viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#F5C276"/>
                <circle cx="170" cy="170" r="135" stroke="#64A928"/>
                <circle cx="170" cy="170" r="110" stroke="#F5C276"/>
                <circle cx="170" cy="170" r="85" stroke="#64A928"/>
                <circle cx="170" cy="170" r="60" stroke="#F5C276"/>
            </svg>
            <img className={css.img} src={favicon} alt="Heard"/>
        </div>
    )
}


export default Preloader;
