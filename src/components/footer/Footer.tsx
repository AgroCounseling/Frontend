import React, {useEffect, useState} from 'react'
import css from './footer.module.css'
import phone from '../../img/footer-phone.png'
import location from '../../img/footer-location.png'
// import twitter from '../../img/black-twitter.png'
// import insta from '../../img/black-insta.png'
// import facebook from '../../img/black-facebook.png'
import logo from '../../img/footer-logo.png'
import agro from '../../img/AgroConsulting.png'
import {Link} from "react-router-dom";
import api from '../../api/Api'

const Footer = () => {
    const [data, setData] = useState<any>(null)
    useEffect(()=>{
        api.getContact()
            .then((res)=>{
                console.log(res.data.results[0])
                setData(res.data.results[0])
            })
    }, [])
    return (
        <div className={css.wrapper}>
            <div>
                <div>
                    <span className={css.title}>УСЛУГИ</span>
                </div>
                <Link style={{color: "#000000"}} to={'/payment'}>Как получить консультанцию?</Link>
                <Link style={{color: "#000000"}} to={'/forum'}>Форум</Link>
                <Link style={{color: "#000000"}} to={'/add-question'}>Задайте свой вопрос</Link>
            </div>
            <div>
                <div className={css.logoWrapper}>
                    <div>
                        <img src={logo} alt="AgroConsulting"/>
                    </div>
                    <div>
                        <img src={agro} alt="AgroConsulting"/>
                    </div>
                </div>
                <div className={css.centerText}>
                    <div>Разработано Neobis 2020</div>
                    <div>Copyright © 2020</div>
                </div>
            </div>
            <div className={css.last_footer}>
                <div>
                    <span className={css.title}>Свяжитесь с нами</span>
                </div>
                <div>
                    <img src={phone} alt="phone"/>
                    <a href={`tel:${data?.phone}`}>
                        {data?.phone}
                    </a>
                </div>
                <div>
                    <img src={location} alt="loc"/>
                    {data?.address}
                </div>
                {/*<div>*/}
                {/*    <img src={twitter} alt="twitter"/>*/}
                {/*    <img src={insta} alt="instagram"/>*/}
                {/*    <img src={facebook} alt="facebook"/>*/}
                {/*</div>*/}
            </div>

        </div>
    )
}

export default Footer