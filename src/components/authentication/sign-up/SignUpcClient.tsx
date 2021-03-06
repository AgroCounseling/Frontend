import React, { useState } from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import { Button, Input, Label } from "../styledElements";
import { Link, useParams } from "react-router-dom";
import google from "../../../img/google.png";
import facebook from "../../../img/facebook.png";
import { WithAuthRedirect } from "../../../hocs/AuthHoc";
import { useFormik } from "formik";
import api from './../../../api/Api'
import { useHistory } from 'react-router-dom'
import { googleAuth } from "../../../state/authReducer";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { data } from "../sign-in/SignInForm";
import FacebookLogin from "react-facebook-login";
import { useTranslation } from "react-i18next";



const validate: any = (values: any, props: any) => {
    const errors: any = {};

    if (!values.email) {
        errors.email = 'Required';
    }
    if (!values.name) {
        errors.name = 'Required';
    }
    if (!values.surname) {
        errors.surname = 'Required';
    }
    if (!values.number) {
        errors.number = 'Required';
    }
    return errors;
};

export const RegisterFormClient = WithAuthRedirect(() => {
    const { t } = useTranslation();

    const [pic, setPic] = useState<any>(null)
    const [img, setImg] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const history = useHistory()

    const fileSelectHandler = (e: any) => {
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
        validate,
        onSubmit: async (values: any) => {
            const client = new FormData()
            client.append('email', values.email)
            client.append('password', values.password)
            client.append('password1', values.password2)
            client.append('first_name', values.name)
            client.append('certificates', 'null');
            client.append('last_name', values.surname)
            if (pic) {
                client.append('photo', pic)
            }
            client.append('phone', values.number)

            api.signUpClient(client)
                .then((res: any) => {
                    alert(`${t('successRegister')}`)
                    return history.push('/sign-in')
                },
                    (error: any) => {
                        // alert('Что то пошло не так, Попробуйте позже!!!')
                        setError(error.response.data.email[0])
                    })
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={css.registration}>
                {t('singInText')}
            </div>
            <div>
                <label>
                    <div className={css.choosePic}>
                        <input type="file" onChange={(e: any) => {
                            const reader = new FileReader();
                            if (e.target.files.length) {
                                reader.readAsDataURL(e.target.files[0])
                            } else {
                                setImg('')
                            }
                            reader.onload = (e: any) => {
                                const newUrl = e.target.result.split(',')
                                setImg(newUrl[1])
                            }
                            fileSelectHandler(e)
                        }} />
                        <img src={img ? "data:image/jpg;base64," + img : chooseIcon} alt="#" />
                    </div>
                </label>
                <div className={css.form}>
                    <Label>
                        {t('name')}
                        <Input
                            required
                            name={'name'}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            type="text" />
                    </Label>
                    <Label>
                        Фамилия
                        <Input
                            required
                            name={'surname'}
                            onChange={formik.handleChange}
                            value={formik.values.surname}
                            type="text" />
                    </Label>
                    <Label>
                        Email
                        <Input
                            required
                            name={'email'}
                            onChange={(e) => {
                                setError(null)
                                formik.handleChange(e)
                            }}
                            value={formik.values.email}
                            type="text" />
                    </Label>
                    <Label>
                        Номер
                        <Input
                            required
                            name={'number'}
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            type="text" />
                    </Label>
                    <Label>
                        {t('password')}
                        <Input
                            required
                            name={'password'}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password" />
                    </Label>
                    <Label>
                        {t('confirm-password')}

                        <Input
                            required
                            name={'password2'}
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            type="password" />
                    </Label>
                </div>
                <div className={css.errorSignUp}>{
                    error ? error : null
                }</div>
                <Registration btn={t('register')} />
            </div>
        </form>
    )
})

type BtnProps = {
    btn: string
}
const Registration = (props: BtnProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const responseGoogle = async (response: any) => {
        const newDate = {
            ...data,
            backend: "google-oauth2",
            token: response.wc.access_token
        }
        dispatch(googleAuth(newDate))
    }
    const responseFacebook = async (response: any) => {
        const newDate = {
            ...data,
            facebook: "google-oauth2",
            token: response.accessToken
        }
        dispatch(googleAuth(newDate))
    }
    return (
        <div className={css.registrationWrapper}>
            <Button>{props.btn}</Button>
            <div className={css.loginWith}>
                <span>
                    {t('orText')} <span>  </span>
                    <Link className={css.enter} to={'/sign-in'}>{t('singIn')}</Link>
                </span>
                <div>
                    <GoogleLogin
                        autoLoad={false}
                        clientId="675832405065-vkf55huhutjrhearfn5a3agomvk6g0a1.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <span className={css.links}>
                                <img onClick={renderProps.onClick} src={google} alt="G" />
                            </span>
                        )}
                    />
                    <label>
                        <FacebookLogin
                            appId="325647148571013"
                            autoLoad={false}
                            // fields="name,email,picture"
                            // onClick={componentClicked}
                            callback={responseFacebook}
                            buttonStyle={{
                                display: 'none'
                            }}
                        /><img src={facebook} alt="F" />
                    </label>
                </div>
            </div>
        </div>
    )
}


