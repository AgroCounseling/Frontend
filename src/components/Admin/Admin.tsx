import React, { ChangeEvent, useEffect, useState } from 'react'
import { WithNotAuthRedirect } from "../../hocs/AuthHoc";
import css from './admin.module.css'
import { MainButton, Yellow } from "../Styles";
import api from '../../api/Api'
import { checkToken } from "../../state/authReducer";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../preloader/Preloader";
import noPic from '../../img/noPicture.png'
import { useRouteMatch, Switch, Route, Redirect, NavLink, useLocation } from 'react-router-dom';
import Chat from "../chat/Chat";
import AddArticle from "../addArticle/AddArticle";
import Select from "react-select";
import { selectStyle } from "../../utils/SelectStyle";
import { GlobalStateType } from "../../state/root-reducer";
import { getSpecialties } from "../../state/selectors";
import { useTranslation } from "react-i18next";

const Admin = () => {
    const { path, url } = useRouteMatch();
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const initialise = async () => {
        return dispatch(checkToken(api.getProfile))
    }
    const specialties = useSelector((state: GlobalStateType) => getSpecialties(state))

    const [user, setUser] = useState<any>(null)
    const [pending, setPending] = useState(true)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [img, setImg] = useState<string | null>(null)
    const [pic, setPic] = useState<string | null>(null)
    const [options, setOptions] = useState<any>(null)
    const [specialty, setSpecialty] = useState<any>(null)
    const [all, setAll] = useState<any>(null)
    const [description, setDescription] = useState('')

    const data = JSON.parse(localStorage.getItem('userData') as string)

    const setProfile = async () => {
        const dat: any = {
            user: {
                first_name: name,
                last_name: lastName,
                phone: user.phone,
            },
            specialty: specialty.map((item: any) => ({ category: item.value })),
            title: '',
            description: description
        }
        if (pic) {
            dat.user.photo = pic
        }
        const formData = await new FormData()
        for (let key in dat) {
            // @ts-ignore
            if (typeof (dat[key]) === 'object') {
                // @ts-ignore
                for (let subKey in dat[key]) {
                    // @ts-ignore
                    console.log(dat[key].length)
                    // debugger
                    // @ts-ignore
                    if (dat[key].length === undefined) {
                        // @ts-ignore
                        formData.append(`${key}.${subKey}`, dat[key][subKey]);
                    } else { // @ts-ignore
                        if (typeof (dat[key][subKey]) === 'object') {
                            // @ts-ignore
                            for (let subKey2 in dat[key][subKey]) {
                                // @ts-ignore
                                formData.append(`${key}[${subKey}]${subKey2}`, dat[key][subKey][subKey2]);
                            }
                        } else {
                            // @ts-ignore
                            formData.append(`${key}.${subKey}`, dat[key][subKey]);
                        }
                    }
                }
            } else {
                // @ts-ignore
                formData.append(key, dat[key]);
            }
        }

        const newUser = new FormData()
        newUser.append('first_name', name)
        newUser.append('last_name', lastName)
        newUser.append('phone', user.phone)
        if (pic) {
            newUser.append('photo', pic)
        }
        if (data.status_consultant) {
            return dispatch(checkToken(() => api.setProfile(user.first_name, formData)))
        }
        if (data.status_client) {
            return dispatch(checkToken(() => api.setProfile(user.first_name, newUser)))
        }
    }

    const submit = (e: any) => {
        e.preventDefault()
        setProfile()
            .then((res) => {
                console.log(res)
                onEdit()
            })
    }
    const cancel = () => {
        onEdit()
    }
    useEffect(() => {
        let res = specialties.map((item: any) => {
            return {
                value: item.id,
                label: item.title
            }
        })
        setOptions(res)
    }, [specialties])

    useEffect(() => {
        let arr: any = []
        all?.map((item: any) => arr.push(...options.filter((i: any) => +item.category === +i.value ? i : null)))
        setSpecialty(arr)
    }, [options, all])

    console.log("user", user);
    useEffect(() => {
        initialise().then((r: any) => {
            if (data.status_client) {
                setUser(r.data.results[0])
                setName(r.data.results[0].first_name)
                setLastName(r.data.results[0].last_name)
            } else {
                setAll([...r.data.results[0].specialty])
                setUser(r.data.results[0].user)
                setName(r.data.results[0].user.first_name)
                setLastName(r.data.results[0].user.last_name)
                setDescription(r.data.results[0].description)
            }
            setPending(false)
        })
    }, [])
    const onEdit = () => setEditing(!editing)
    if (pending) {
        return <Preloader />
    }
    return (
        <div className={css.wrapper}>
            <Yellow />
            {
                editing
                    ? <form onSubmit={submit}>
                        <div className={css.linksWrapperEdit}>
                            <div className={css.active}>{t("pesonalData")}</div>
                        </div>
                        <div className={css.userWrapper}>
                            <div className={css.user}>
                                <span>
                                    <img src={img ? "data:image/jpg;base64," + img : user.photo ? user.photo : noPic}
                                        alt="ava" />
                                </span>
                                <label>
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
                                        setPic(e.target.files[0])
                                    }} type={'file'} className={css.file} />
                                    <span className={css.changePhoto}>{t("changeFoto")}</span>
                                </label>
                            </div>
                            <div className={css.nameWrapper + ' ' + css.nameWrapper1}>
                                <div className={css.fio}>
                                    <input type="text" value={name} onChange={(e: any) => setName(e.target.value)} />
                                    <input type="text" value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                                </div>
                                <div>
                                    {
                                        data.status_client ? null :
                                            <div className={css.select}>
                                                <Select
                                                    value={specialty}
                                                    onChange={(e) => setSpecialty(e)}
                                                    placeholder={t("specialty")}
                                                    options={options}
                                                    isMulti
                                                    styles={selectStyle} />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={css.nameWrapper2}>
                            {
                                data.status_client ? null : <>
                                    <div className={css.name}>{t("education")}</div>
                                    <textarea value={description} onChange={(e: any) => setDescription(e.target.value)} />
                                </>
                            }
                        </div>
                        <div>
                            <div className={css.btnWrapper}>
                                <MainButton className={css.cancel} onClick={cancel}>{t("back")}</MainButton>
                                <MainButton type={'submit'}>{t("save")}</MainButton>
                            </div>
                        </div>
                    </form>
                    : <>
                        <div className={css.userWrapper}>
                            <div className={css.user}>
                                <span>
                                    <img src={user.photo ? user.photo : noPic} alt="ava" />
                                </span>
                                <button onClick={onEdit}>{t("changeData")}</button>
                            </div>
                            <div className={css.nameWrapper}>
                                <div className={css.name}>{name + ' ' + lastName}</div>
                                <div>
                                    {
                                        data.status_client ? null :
                                            <div className={css.consultant}>{t("consultant")} | {
                                                specialty.map((item: any) => <span
                                                    key={item.value}> {item.label + ', '} </span>)
                                            }</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={css.linksWrapper}>
                            {
                                data.status_client ? null :
                                    <NavLink activeClassName={css.active} to={`${url}/articles`}>{t("article")}</NavLink>
                            }
                            <NavLink activeClassName={css.active} to={`${url}/chat`}>{t("chat")}</NavLink>
                        </div>
                        <Switch>
                            <Route exact path={`${path}/articles`}>
                                <AddArticle last_name={lastName} name={name} />
                            </Route>
                            <Route exact path={`${path}/chat`}>
                                <Chat id={user.id} />
                            </Route>
                            <Redirect to={`${path}/chat`} />
                        </Switch>
                    </>}
        </div>
    )
}
export default WithNotAuthRedirect(Admin)

