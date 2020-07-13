import React, {useState} from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import {Button, Input, Label} from "../styledElements";
import {Link} from "react-router-dom";
import google from "../../../img/google.png";
import facebook from "../../../img/facebook.png";
import twitter from "../../../img/twitter.png";
import Select from "react-select";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";
import {useFormik} from "formik";
// import api from './../../../api/Api'
import add_pic from '../../../img/add_pic.png'

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


export const RegisterFormConsultant = WithAuthRedirect(() => {
    const [specialization, setSpecialization] = useState<any>(null)
    const [pic, setPic] = useState<any>({})

    const fileSelectHandler = (e:any) => {
        setPic(e.target.files[0])
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            password2: '',
            number: '',
            comment: '',
            specialization: {
                label: '',
                value: 0
            }
        },
        onSubmit: async (values:any) => {
            const picture = new FormData()
            picture.append('image', pic)

            const user = {
                email: values.email,
                password: values.password,
                first_name: values.name,
                last_name: values.surname,
                phone: values.number,
                photo: null
            }

            const data = new FormData()
            data.append('user', JSON.stringify(user))
            data.append('specialty', JSON.stringify([{category: 1}]))
            data.append('certificates', pic)
            data.append('password1', values.password2)
            data.append('description', "Some text")
            data.append('comment', values.comment)



            const client = new FormData()
            client.append('email', 'asjdaajskfj@mail.ru')
            client.append('password', 'Aman2000')
            client.append('password1', 'Aman2000')
            client.append('first_name', 'Amanbek')
            client.append('last_name', 'Asylbekov')
            client.append('photo', pic)
            client.append('phone', '0708626798')

            // @ts-ignore
            for (let value of data.values()) {
                console.log(value);
            }
            let a = await fetch('http://134.122.76.224/api/signup/client',{
                method: 'POST',
                body: client
            })
            console.log(a)
            // let res = await api.signUpConsultant(data)
            // console.log(res)
        },
    })
    const options = [
        {label: "option 1", value: "1"},
        {label: "option 2", value: "2"},
        {label: "option 3", value: "3"}
    ];
    return (
        <form onSubmit={formik.handleSubmit}>
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
                        <Input
                            name={'name'}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text"/>
                    </Label>
                    <Label>
                        Фамилия
                        <Input
                            name={'surname'}
                            onChange={formik.handleChange}
                            value={formik.values.surname}
                            type="text"/>
                    </Label>
                    <Label>
                        Email
                        <Input
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="text"/>
                    </Label>
                    <Label>
                        Номер
                        <Input
                            name={'number'}
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            type="text"/>
                    </Label>
                    <Label>
                        Пароль
                        <Input
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="text"/>
                    </Label>
                    <Label>
                        Подтвердите пароль
                        <Input
                            name={'password2'}
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            type="text"/>
                    </Label>
                    <Label>
                        Комментарии
                        <Input
                            name={'comment'}
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            type="text"/>
                    </Label>
                    <Label>
                        Специальность

                        <Select
                            value={specialization}
                            onChange={(data: any) => {
                                setSpecialization(data)
                            }}
                            styles={customStyles}
                            placeholder=""
                            options={options}
                        />
                    </Label>
                    <Label>
                        Диплом
                        <label className={css.file}>
                            <input type="file"
                                onChange={fileSelectHandler}
                            />
                            <div className={css.diploma}>
                                <span>
                                    <img src={add_pic} alt="#"/>
                                    Прикрепить документ
                                </span>
                            </div>
                            {/*<Input className={css.diploma} disabled={true} value={'Прикрепить документ'} type="button"/>*/}
                        </label>
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


