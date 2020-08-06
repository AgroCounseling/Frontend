import React, {useEffect, useState} from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import {Button, Input, Label} from "../styledElements";
import {Link, useHistory} from "react-router-dom";
import google from "../../../img/google.png";
import facebook from "../../../img/facebook.png";
import twitter from "../../../img/twitter.png";
import Select from "react-select";
import {WithAuthRedirect} from "../../../hocs/AuthHoc";
import {useFormik} from "formik";
import api from './../../../api/Api'
import add_pic from '../../../img/add_pic.png'
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../state/root-reducer";
import {getSpecialties} from "../../../state/selectors";

const customStyles = {
    container: (base: any, state: any) => ({
        ...base,
        border: state.isFocused ? '2px solid rgba(194, 199, 208, 0.5)' : '2px solid rgba(194, 199, 208, 0.5)',
        borderRadius: '15px',
        transition:
            "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
    }),
    valueContainer: (base: any, state: any) => ({
        ...base,
        background: "#FAFBFC"
    })
};


export const RegisterFormConsultant = WithAuthRedirect(() => {
    const categories = useSelector((state: GlobalStateType) => getSpecialties(state))
    const history = useHistory()
    const [specialization, setSpecialization] = useState<any>(null)
    const [pic, setPic] = useState<any>([])
    const [options, setOptions] = useState<any>([])
    const [img, setImg] = useState('')
    const [photo, setPhoto] = useState('')
    const [error, setError] = useState<any>(null)
    console.log(pic)
    const fileSelectHandler = (e: any) => {
        const arr = Array.from(e.target.files)
        setPic([...arr])
        // setPic(e.target.files)
    }
    useEffect(() => {
        let res = categories.map((item: any) => {
            return {
                value: item.id,
                label: item.title
            }
        })
        setOptions(res)
    }, [categories])
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
        onSubmit: async (values: any) => {
            const data = {
                user: {
                    email: values.email,
                    password: values.password,
                    first_name: values.name,
                    last_name: values.surname,
                    phone: values.number,
                    photo: photo
                },
                specialty: specialization.map((item: any) => ({
                    "category": item.value
                })),
                certificates: pic.map((item:any)=>({
                    "certificate_image": item
                })),
                password1: values.password2,
                description: '',
                comment: values.comment,
            }
            const formData = new FormData()
            for (let key in data) {
                // @ts-ignore
                if (typeof (data[key]) === 'object') {
                    // @ts-ignore
                    for (let subKey in data[key]) {
                        // @ts-ignore
                        console.log(data[key].length)
                        // debugger
                        // @ts-ignore
                        if (data[key].length === undefined) {
                            // @ts-ignore
                            formData.append(`${key}.${subKey}`, data[key][subKey]);
                        } else { // @ts-ignore
                            if (typeof (data[key][subKey]) === 'object') {
                                // @ts-ignore
                                for (let subKey2 in data[key][subKey]) {
                                    // @ts-ignore
                                    formData.append(`${key}[${subKey}]${subKey2}`, data[key][subKey][subKey2]);
                                }
                            } else {
                                // @ts-ignore
                                formData.append(`${key}.${subKey}`, data[key][subKey]);
                            }
                        }
                    }
                } else {
                    // @ts-ignore
                    formData.append(key, data[key]);
                }
            }
            api.signUpConsultant(formData)
                .then(async (res) => {
                    history.push('sign-in')
                }, (error: any) => {
                    setError(error.response.data.user.email[0])
                    console.log(error.response.data)
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
                        <input onChange={(e: any) => {
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
                            setPhoto(e.target.files[0])
                        }} type={'file'}/>
                        <img src={img ? "data:image/jpg;base64," + img : chooseIcon} alt="#"/>
                    </div>
                </label>
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
                            isMulti
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
                                   multiple={true}
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
                <div className={css.errorSignUp}>{
                    error ? error : null
                }</div>
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


