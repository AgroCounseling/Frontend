import React from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import {Button, Input, Label} from "../styledElements";
import {Link} from "react-router-dom";
import google from "../../../img/google.png";
import facebook from "../../../img/facebook.png";
import twitter from "../../../img/twitter.png";
import Select from "react-select";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";


export const RegisterFormConsultant = WithAuthRedirect(() => {
    const options = [
        {label: "option 1", value: "1"},
        {label: "option 2", value: "2"},
        {label: "option 3", value: "3"}
    ];
    const customStyles = {
        container: (base:any, state:any) => ({
            ...base,
            border: state.isFocused ? '2px solid rgba(194, 199, 208, 0.5)' : '2px solid rgba(194, 199, 208, 0.5)',
            borderRadius: '15px',
            transition:
                "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
        }),
        valueContainer: (base:any, state:any) => ({
            ...base,
            background: "#FAFBFC"
        })
    };
    return (
        <form>
            <div className={css.registration}>
                Зарегистрируйтесь, чтобы получить доступ к консультации
            </div>
            <div>
                <div className={css.choosePic}>
                    <img src={chooseIcon} alt="#"/>
                </div>
                <div className={css.form}>
                    <Label>
                        Имя
                        <Input type="text"/>
                    </Label>
                    <Label>
                        Фамилия
                        <Input type="text"/>
                    </Label>
                    <Label>
                        Email
                        <Input type="text"/>
                    </Label>
                    <Label>
                        Номер
                        <Input type="text"/>
                    </Label>
                    <Label>
                        Пароль
                        <Input type="text"/>
                    </Label>
                    <Label>
                        Специальность
                        <Select styles={customStyles} placeholder="" options={options} />
                    </Label>
                    <Label>
                        Диплом
                        <Input className={css.diploma} disabled={true} value={'Прикрепить документ'} type="text"/>
                    </Label>
                    <Label>
                        Комментарии
                        <Input type="text"/>
                    </Label>
                </div>
                <Registration btn={'Зарегистрироваться'}/>
            </div>
        </form>
    )
})

type BtnProps = {
    btn: string
}
const Registration = (props: BtnProps) => {
    return (
        <div className={css.registrationWrapper}>
            <Button>{props.btn}</Button>
            <div className={css.loginWith}>
                <span>
                    или <span>  </span>
                    <Link className={css.enter} to={'/sign-in'}>Войти</Link>
                </span>
                <div>
                    <Link to={'#'}><img src={google} alt="G"/></Link>
                    <Link to={'#'}><img src={facebook} alt="F"/></Link>
                    <Link to={'#'}><img src={twitter} alt="T"/></Link>
                </div>
            </div>
        </div>
    )
}


