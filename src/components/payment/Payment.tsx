import React, { useEffect, useState } from 'react'
import payment from '../../img/online-payment.png'
import css from './payment.module.css'
import phone from '../../img/phone.png'
import card from '../../img/credit-card.png'
import mail from '../../img/email.png'
import api from "../../api/Api";
import Modal from "./../../components/modalWindow/modal";
import {PhonesWrapper} from "../Styles";

const Payment = () => {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        api.getContact()
            .then((res) => {
                console.log(res.data.results[0])
                setData(res.data.results[0])
            })
    }, [])
    return (
        <div className={css.wrapper}>
            <div className={css.firstWrapper}>
                <Modal />
                <span>
                    <img src={payment} alt="Payment" />
                </span>
                <div className={css.title}>
                    Краткая инструкция к получению <br />
                    доступа к консультации
                </div>
            </div>
            <div className={css.secondWrapper}>
                <div className={css.block}>
                    <span>
                        <img src={phone} alt="phone" />
                    </span>
                    <div className={css.text}>
                        Свяжитесь по номеру <br />
                        <PhonesWrapper>
                        {
                            data?.phones.map((item:any)=> <a href={`tel:${item?.phone}`}>
                                    {item?.phone}
                                </a>
                            )
                        }
                        </PhonesWrapper>
                    </div>
                </div>
                <div className={css.block}>
                    <span>
                        <img src={card} alt="phone" />
                    </span>
                    <div className={css.text}>
                        Получите данные для оплаты
                    </div>
                </div>
                <div className={css.block}>
                    <span>
                        <img src={mail} alt="phone" />
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