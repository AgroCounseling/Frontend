import React, { useEffect, useState } from 'react'
import css from "../auth.module.css";
import chooseIcon from "../../../img/choose-icon.png";
import { Button, Input, Label } from "../styledElements";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { WithAuthRedirect } from "../../../hocs/AuthHoc";
import { useFormik } from "formik";
import api from './../../../api/Api'
import add_pic from '../../../img/add_pic.png'
import { useSelector } from "react-redux";
import { GlobalStateType } from "../../../state/root-reducer";
import { getSpecialties } from "../../../state/selectors";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

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
    const { t } = useTranslation();
    const categories = useSelector((state: GlobalStateType) => getSpecialties(state))
    const history = useHistory()
    const [specialization, setSpecialization] = useState<any>(null)
    const [pic, setPic] = useState<any>([{
        "consultant": 70,
        // "certificate_image": null
    }]);
    const [options, setOptions] = useState<any>([])
    const [documentDownload, addDocument] = useState(false);
    const [img, setImg] = useState('');
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState<any>(null);
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
                    photo: photo,
                },
                specialty: specialization.map((item: any) => ({
                    "category": item.value
                })),
                certificates: documentDownload ? pic.map((item: any) => ({
                    "consultant": 70,
                    'certificate_image': item
                })) : pic.map((item: any) => ({
                    "consultant": 70,
                })),
                password1: values.password2,
                description: '',
                comment: values.comment,
            }

            if (data.password1 != data.user.password) {
                Swal.fire({
                    showConfirmButton: true,
                    icon: 'error',
                    width: 500,
                    title: `${t('errorPassword')}`,
                    timer: 2000,
                    confirmButtonColor: '#32b482',
                    // confirmButtonText: "ок",
                });
            } else {
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
                        setError(error.response?.data?.user?.email[0])
                        console.log(error.response.data)
                    })
            }
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
                        <input onChange={(e: any) => {
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
                            setPhoto(e.target.files[0])
                        }} type={'file'} />
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
                            onChange={formik.handleChange}
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
                    <Label>
                        {t('comments')}
                        <Input
                            required
                            name={'comment'}
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            type="text" />
                    </Label>
                    <Label>
                        {t('spes')}
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
                                onChange={e => {
                                    fileSelectHandler(e);
                                    addDocument(true);
                                }}
                            />
                            <div className={css.diploma}>
                                <span>
                                    <img src={add_pic} alt="#" />
                                    {t('add-document')}
                                </span>
                            </div>
                            {/*<Input className={css.diploma} disabled={true} value={'Прикрепить документ'} type="button"/>*/}
                        </label>

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
    return (
        <div className={css.registrationWrapper}>
            <Button>{props.btn}</Button>
            <div className={css.loginWith}>
                <span>
                    или <span>  </span>
                    <Link className={css.enter} to={'/sign-in'}>{t('singIn')}</Link>
                </span>
                <div>
                </div>
            </div>
        </div>
    )
}


