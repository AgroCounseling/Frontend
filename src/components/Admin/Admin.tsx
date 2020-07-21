import React, {ChangeEvent, useEffect, useState} from 'react'
import {WithNotAuthRedirect} from "../../hocs/AuthHoc";
import css from './admin.module.css'
import {Yellow} from "../Styles";
import api from '../../api/Api'
import {checkToken} from "../../state/authReducer";
import {useDispatch} from "react-redux";
import Preloader from "../preloader/Preloader";
import noPic from '../../img/noPicture.png'
import {useRouteMatch, Switch, Route, Redirect, NavLink} from 'react-router-dom';


const Admin = () => {
    const { path, url } = useRouteMatch();
    const dispatch = useDispatch()
    const initialise = async () => {
        return  dispatch(checkToken(api.getProfile))
    }
    const [user, setUser] = useState<any>(null)
    const [pending, setPending] = useState(true)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const data = JSON.parse(localStorage.getItem('userData') as string)

    async function setProfile() {
        return  dispatch(checkToken(api.setProfile(name,{first_name: name, last_name: lastName})))
    }
    useEffect(()=>{
        initialise().then((r:any) => {
            console.log(r.data.results[0])
            setUser(r.data.results[0])
            setName(r.data.results[0].first_name)
            setLastName(r.data.results[0].last_name)
            setPending(false)
        } )
    },[])
    const onEdit = () => setEditing(!editing)
    if(pending){
        return <Preloader />
    }
    return (
        <div className={css.wrapper}>
            <Yellow />
            <div className={css.userWrapper}>
                <div className={css.user}>
                    <span>
                        <img src={user.photo ? user.photo : noPic} alt="ava"/>
                    </span>
                    {
                        editing
                            ? <button onClick={()=>{
                                onEdit()
                            }}>Сохранить</button>
                            : <button onClick={onEdit}>Изменить данные</button>
                    }
                </div>
                <div className={css.nameWrapper}>
                    {
                        editing
                            ? <div>
                                <input type="text" value={name} onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}/>
                                <input type="text" value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>)=>setLastName(e.target.value)}/>
                            </div>
                            : <div className={css.name}>{name + ' ' + lastName}</div>
                    }
                    <div>
                        {
                            data.status_client ? null : 'Consultant'
                        }
                    </div>
                </div>
            </div>
            <div className={css.linksWrapper}>
                {
                    data.status_client ? null : <NavLink activeClassName={css.active} to={`${url}/articles`}>Статьи</NavLink>
                }
                <NavLink activeClassName={css.active} to={`${url}/chat`} >Чат</NavLink>
            </div>
            <Switch>
                <Route exact path={`${path}/articles`}>
                    <h3>Articles</h3>
                </Route>
                <Route exact path={`${path}/chat`}>
                    <Chat/>
                </Route>
                <Redirect to={`${path}/chat`} />
            </Switch>
        </div>
    )
}
export default WithNotAuthRedirect(Admin)

const Chat = () => {
    return (
        <div className={css.chatWrapper}>
            <div>
                <div className={css.searchWrapper}>
                    <input type="text" placeholder={'искать'} />
                </div>
                <div className={css.userList}>
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
            </div>
            <div>
                chat
            </div>
        </div>
    )
}

const User = () => {
    return (
        <div className={css.person}>
            <div>
                <img src={noPic} alt="#"/>
            </div>
            <div className={css.personName}>Аайза Аайза</div>
            <div className={css.peronTime}>1 минута назад</div>
        </div>
    )
}