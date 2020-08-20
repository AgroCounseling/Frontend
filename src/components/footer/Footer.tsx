import React, { useEffect, useState } from 'react'
import css from './footer.module.css'
import phone from '../../img/footer-phone.png'
import location from '../../img/footer-location.png'
import logo from '../../img/footer-logo.png'
import agro from '../../img/AgroConsulting.png'
import { Link } from "react-router-dom";
import api from '../../api/Api'
import {PhonesWrapper} from "../Styles";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const [data, setData] = useState<any>(null);
    const { t } = useTranslation();

    useEffect(() => {
        api.getContact()
            .then((res) => {
                setData(res.data.results[0])
            })
    }, [])
    return (
        <div className={css.wrapper}>
            <div>
                <div>
                    <span className={css.title}>{t('uslugs')}</span>
                </div>
                <Link style={{ color: "#000000" }} to={'/payment'}>{t('consult')}</Link>
                <Link style={{ color: "#000000" }} to={'/forum'}>Форму</Link>
                <Link style={{ color: "#000000" }} to={'/add-question'}>{t("questionText")}</Link>
            </div>
            <div>
                <div className={css.logoWrapper}>
                    <div>
                        <img src={logo} alt="AgroConsulting" />
                    </div>
                    <div>
                        <img src={agro} alt="AgroConsulting" />
                    </div>
                </div>
                <div className={css.centerText}>
                    <div>Разработано Neobis 2020</div>
                    <div>Copyright © 2020</div>
                </div>
            </div>
            <div className={css.last_footer}>
                <div>
                    <span className={css.title}>{t("footerText")}</span>
                </div>
                <div>
                    <PhonesWrapper>
                    {
                        data?.phones.map((item:any)=> <div key={item.phone}> <img src={phone} alt="phone"/> <a href={`tel:${item?.phone}`}>
                                {item?.phone}
                            </a>
                        </div>
                        )
                    }
                    </PhonesWrapper>
                </div>
                <div>
                    <img src={location} alt="loc" />
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