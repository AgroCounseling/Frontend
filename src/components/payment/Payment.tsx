import React from 'react'
import payment from '../../img/online-payment.png'
import css from './payment.module.css'
import phone from '../../img/phone.png'
import card from '../../img/credit-card.png'
import mail from '../../img/email.png'

const Payment = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.firstWrapper}>
                <span>
                    <img src={payment} alt="Payment"/>
                </span>
                <div className={css.title}>
                    Краткая инструкция к получению <br/>
                    доступа к консультации
                </div>
            </div>
            <div className={css.secondWrapper}>
                <div className={css.block}>
                    <span>
                        <img src={phone} alt="phone"/>
                    </span>
                    <div className={css.text}>
                        Свяжитесь по номеру
                    </div>
                </div>
                <div className={css.block}>
                    <span>
                        <img src={card} alt="phone"/>
                    </span>
                    <div className={css.text}>
                        Получите данные для оплаты
                    </div>
                </div>
                <div className={css.block}>
                    <span>
                        <img src={mail} alt="phone"/>
                    </span>
                    <div className={css.text}>
                        Получите доступ к чату и консультации
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Payment