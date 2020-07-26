import React, {useState} from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import {Button, Input, Label} from "../styledElements";
import {Link} from "react-router-dom";
import google from "../../../img/google.png";
import facebook from "../../../img/facebook.png";
import twitter from "../../../img/twitter.png";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";
import {useFormik} from "formik";
import api from './../../../api/Api'
import {useHistory} from 'react-router-dom'

export const RegisterFormClient = WithAuthRedirect(() => {
    const [pic, setPic] = useState<any>({})
    const [img, setImg] = useState<any>(null)
    const history = useHistory()

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
        },
        onSubmit: async (values:any) => {
            const client = new FormData()
            client.append('email', values.email)
            client.append('password', values.password)
            client.append('password1', values.password2)
            client.append('first_name', values.name)
            client.append('last_name', values.surname)
            client.append('photo', pic)
            client.append('phone', values.number)

            api.signUpClient(client)
                .then((res:any)=> {
                        console.log(res)
                        alert('Вы успешно зарегистрировались!!!')
                        return history.push('/sign-in')
                    },
                    (error:any)=> {
                        alert('Что то пошло не так, Попробуйте позже!!!')
                        console.log(error)
                    })
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={css.registration}>
                Зарегистрируйтесь, чтобы получить доступ к консультации
            </div>
            <div>
                <label>
                    <div className={css.choosePic}>
                        <input type="file" onChange={(e:any)=>{
                            const reader = new FileReader();
                            if(e.target.files.length) {
                                reader.readAsDataURL(e.target.files[0])
                            }else{
                                setImg('')
                            }
                            reader.onload = (e: any) => {
                                const newUrl = e.target.result.split(',')
                                setImg(newUrl[1])
                            }
                            fileSelectHandler(e)
                        }}/>
                        <img src={img ? "data:image/jpg;base64," + img : chooseIcon} alt="#"/>
                    </div>
                </label>
                <div className={css.form}>
                    <Label>
                        Имя
                        <Input
                            required
                            name={'name'}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text"/>
                    </Label>
                    <Label>
                        Фамилия
                        <Input
                            required
                            name={'surname'}
                            onChange={formik.handleChange}
                            value={formik.values.surname}
                            type="text"/>
                    </Label>
                    <Label>
                        Email
                        <Input
                            required
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="text"/>
                    </Label>
                    <Label>
                        Номер
                        <Input
                            required
                            name={'number'}
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            type="text"/>
                    </Label>
                    <Label>
                        Пароль
                        <Input
                            required
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password"/>
                    </Label>
                    <Label>
                        Подтвердите пароль
                        <Input
                            required
                            name={'password2'}
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            type="password"/>
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


