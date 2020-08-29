import React, { useEffect, useState } from 'react'
import payment from '../../img/online-payment.png'
import css from './payment.module.css'
import phone from '../../img/phone.png'
import card from '../../img/credit-card.png'
import mail from '../../img/email.png'
import api from "../../api/Api";
import Modal from "./../../components/modalWindow/modal";
import { PhonesWrapper } from "../Styles";
import { useTranslation } from "react-i18next";

const Payment = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        api.getContact()
            .then((res) => {
                console.log(res.data.results[0])
                setData(res.data.results[0])
            })
    }, [])

    console.log('data', data);
    return (
        <div className={css.wrapper}>
            <div className={css.firstWrapper}>
                {/*<Modal />*/}
                <span>
                    <img src={payment} alt="Payment" />
                </span>
                <div className={css.title}>
                    {t('ins')} <br />
                    {t('dostup')}
                </div>
            </div>
            <div className={css.secondWrapper}>
                <div className={css.block}>
                    <span>
                        <img src={phone} alt="phone" />
                    </span>
                    <div className={css.text}>
                        {t('telChat')}<br />
                        <PhonesWrapper>
                            {
                                data?.phones.map((item: any) => <a key={item.phone} href={`tel:${item?.phone}`}>
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
                        {t('paymentData')}
                    </div>
                </div>
                <div className={css.block}>
                    <span>
                        <img src={mail} alt="phone" />
                    </span>
                    <div className={css.text}>
                        {t('dostupText')}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Payment