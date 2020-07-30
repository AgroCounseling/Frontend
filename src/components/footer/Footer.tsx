import React from 'react'
import css from './footer.module.css'
import phone from '../../img/footer-phone.png'
import location from '../../img/footer-location.png'
import twitter from '../../img/black-twitter.png'
import insta from '../../img/black-insta.png'
import facebook from '../../img/black-facebook.png'
import logo from '../../img/footer-logo.png'
import agro from '../../img/AgroConsulting.png'



const Footer = () => {
    return (
        <div className={css.wrapper}>
            <div>
                <div>
                    <span className={css.title}>УСЛУГИ</span>
                </div>
                <div>Как получить консультанцию?</div>
                    <div>Форум</div>
                    <div>Задайте свой вопрос</div>
            </div>
            <div>
                <div className={css.logoWrapper}>
                    <div>
                    <img src={logo}  alt="AgroConsulting"/>
                    </div>
                    <div>
                    <img src={agro}  alt="AgroConsulting"/>
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
                    0550 225 310
                </div>
                <div>
                    <img src={location} alt="loc"/>
                    265 просп. Чуй, Бишкек
                </div>
                <div>
                    <img src={twitter} alt="twitter"/>
                    <img src={insta} alt="instagram"/>
                    <img src={facebook} alt="facebook"/>
                </div>
            </div>

        </div>
    )
}

export default Footer