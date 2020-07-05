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
            <div>
                <div>Культура</div>
                <div>Инновации</div>
                <div>Профилактика</div>
                <div>Органика</div>
                <div>Технологии выращивания</div>
            </div>
            <div>
                <div>Декоративные</div>
                <div>Клубнеплодные</div>
                <div>Корнеплоды кормовые </div>
                <div>Зернокормовые </div>
                <div>Злаковые</div>
            </div>
            <div>
                <div>Плодосемечковые</div>
                <div>Косточковые</div>
                <div>Ягодные </div>
                <div>Орехоплодовые </div>
                <div>Субтропические</div>
            </div>
            <div>
                <div>Бахчевые</div>
                <div>Масличные</div>
                <div>Виноградовые </div>
                <div>Кормовые травы </div>
                <div>Овощи</div>
            </div>
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