import React from 'react'
import css from './footer.module.css'
import phone from '../../img/footer-phone.png'
import location from '../../img/footer-location.png'
import twitter from '../../img/black-twitter.png'
import insta from '../../img/black-insta.png'
import facebook from '../../img/black-facebook.png'
const Footer = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.last_footer}>
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