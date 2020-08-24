import React, { useState } from 'react'
import css from "../auth.module.css";
import { Button, Input, Label } from "../styledElements";
import { Link, useHistory, useParams } from "react-router-dom";
import google from '../../../img/google.png'
import facebook from '../../../img/facebook.png'
import { useDispatch } from "react-redux";
import { authFunction, googleAuth } from "../../../state/authReducer";
import { WithAuthRedirect } from "../../../hocs/AuthHoc";
import { Form, Formik, useFormik } from "formik"
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login';
import * as Yup from 'yup'
import deepEqual from 'lodash.isequal';
import { useTranslation } from "react-i18next";

const validateFormik = {
    email: Yup.string()
        .required('Объязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Объязательное поле'),
}


export const data = {
    grant_type: "convert_token",
    client_id: "qJ7cVMs5DPgP9Otg0NEXnQJO3STDnNOc4Xsdc7BU",
    client_secret: "u2d6EdZaXJdI6sEj8N6C8SecOy7xhDsDx1ttoNGA5Xsi72yYuYDzwyxXoxKpwzPxEpmaUs9I5gfAcU85ISzt2eCmDDbRqBT7WGPN4w8mooTvmcMyrBzQESIhM135unJb",
}

export const SignIn = WithAuthRedirect(() => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [error, setError] = useState<any>(false)
    const responseGoogle = async (response: any) => {
        const newDate = {
            ...data,
            backend: "google-oauth2",
            token: response.wc.access_token
        }
        let res = await dispatch(googleAuth(newDate))
        // @ts-ignore
        if (res && !params.id) {
            history.goBack()
        }
    }
    const responseFacebook = async (response: any) => {
        const newDate = {
            ...data,
            facebook: "google-oauth2",
            token: response.accessToken
        }
        let res = await dispatch(googleAuth(newDate))
        // @ts-ignore
        if (res && !params.id) {
            history.goBack()
        }
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape(validateFormik)}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                let res = await dispatch(authFunction(values.email, values.password))
                // @ts-ignore
                if (res && !params.id) {
                    history.goBack()
                }
                setError(!res)
            }}
        >
            {
                ({
                    values,
                    touched,
                    errors,
                    initialValues,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                }) => {
                    const hasChanged = !deepEqual(values, initialValues);
                    const hasErrors = Object.keys(errors).length > 0;
                    return <Form className={css.loginWrapper}>
                        <div className={css.registration}>
                            {t("singInText")}
                        </div>
                        <div className={css.mainWrapper}>
                            {
                                error ? <div className={css.errorText}>Пароль или логин введен не верно.</div>
                                    : null
                            }
                            <div className={css.signInForm}>
                                <Label>
                                    Email
                                    {/*<Field as={Input} name={'email'} type={'text'}/>*/}
                                    <Input
                                        onBlur={handleBlur}
                                        name={'email'}
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e)
                                            setError(false)
                                        }}
                                        className={
                                            touched.email ? errors.email ? css.error : css.success : ('')
                                        }
                                        type="text"
                                    />
                                    {touched.email && errors.email &&
                                        <div className={css.errorText}>{errors.email}</div>}
                                </Label>
                                <Label>
                                    Пароль
                                    <Input
                                        onBlur={handleBlur}
                                        name={t("password")}
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e)
                                            setError(false)
                                        }}
                                        className={
                                            touched.password ? errors.password ? css.error : css.success : ('')
                                        }
                                        type="password"
                                    />
                                    {touched.password && errors.password &&
                                        <div className={css.errorText}>{errors.password}</div>}
                                </Label>
                            </div>
                            <div>
                                <label className={css.rememberMe}>
                                    <input type="checkbox" />
                                    {t("saveText")}
                                </label>
                            </div>
                            <Button type="submit" disabled={!hasChanged || hasErrors || isSubmitting}>{t("singIn")}</Button>
                            <div className={css.footerSignIn}>
                                <Link to={'/forgot'}>{t("resetPassword")}</Link>
                                <div className={css.socialNetworks}>
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
                                        />
                                        <span className={css.links}><img src={facebook} alt="F" /></span>
                                    </label>
                                </div>
                                <Link className={css.noAkk} to={'/sign-up-consultant'}>{t("noAccountText")} </Link>
                            </div>
                        </div>
                    </Form>
                }}
        </Formik>

    )
})

export const Sign = WithAuthRedirect(() => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values: any) => {
            dispatch(authFunction(values.email, values.password))
        },
    });

    const responseGoogle = (response: any) => {
        const newDate = {
            ...data,
            backend: "google-oauth2",
            token: response.wc.access_token
        }
        dispatch(googleAuth(newDate))
    }
    const responseFacebook = (response: any) => {
        const newDate = {
            ...data,
            facebook: "google-oauth2",
            token: response.accessToken
        }
        dispatch(googleAuth(newDate))
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={css.registration}>
                {t("singInText")}
            </div>
            <div className={css.mainWrapper}>
                <div className={css.signInForm}>
                    <Label>
                        Email
                        <Input
                            name={'email'}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="text"
                        />
                    </Label>
                    <Label>
                        Пароль
                        <Input
                            name={'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type="password"
                        />
                    </Label>
                </div>
                <div>
                    <label className={css.rememberMe}>
                        <input type="checkbox" />
                        Запомнить меня
                    </label>
                </div>
                <Button>Войти</Button>
                <div className={css.footerSignIn}>
                    <Link to={'/forgot'}>{t('resetPassword')}</Link>
                    <div className={css.socialNetworks}>
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
                            />
                            <span className={css.links}><img src={facebook} alt="F" /></span>
                        </label>
                    </div>
                    <Link className={css.noAkk} to={'/sign-up-consultant'}>{t('noAccountText')} </Link>
                </div>
            </div>
        </form>
    )
})
