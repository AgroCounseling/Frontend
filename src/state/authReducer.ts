import api from '../api/Api'
import axios from "axios";


const storageName = 'userData'

const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED'
const IS_PENDING = 'auth/IS_PENDING'
const AUTHORIZATION = 'auth/AUTHORIZATION'


const initialState = {
    status: true,
    isAuth: false,
    pending: false
}

type InitialStateType = typeof initialState

export const auth = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuth: action.data
            }
        case IS_PENDING:
            return {
                ...state,
                pending: action.isPending
            }
        case AUTHORIZATION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}


const pend = (isPending: boolean) => {
    return {
        type: IS_PENDING,
        isPending: isPending
    }
}

export const signIn = (payload: any) => {
    return {
        type: AUTHORIZATION,
        payload
    }
}

export const authFunction = (email: string, password: string) => async (dispatch: any,) => {
    dispatch(pend(true))
    api.signIn({"email": email, "password": password})
        .then((res)=>{
            const access_life = Date.now() + (res.data.time_access * 1000)
            const refresh_life = Date.now() + (res.data.time_refresh * 1000)
            localStorage.setItem(storageName, JSON.stringify({
                access_token: res.data.access,
                refresh_token: res.data.refresh,
                status_client: res.data.status_client,
                status_consultant: res.data.status_consultant,
                access_life: access_life,
                refresh_life: refresh_life
            }))
            dispatch(signIn({isAuth: true}))
        })
    dispatch(pend(false))
}

export const googleAuth = (data:any) => async (dispatch:any) => {
    dispatch(pend(true))
    api.googleAuth(data)
        .then((res)=>{
            console.log(res)
            const access_life = Date.now() + (res.data.expires_in * 1000)
            localStorage.setItem(storageName, JSON.stringify({
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token,
                status_client: true,
                status_consultant: false,
                access_life: access_life,
                refresh_life: false,
                google: true
            }))
            dispatch(signIn({isAuth: true}))
        })
    dispatch(pend(false))
}

export const setDataRefresh = () => async (dispatch: any) => {
    const res = await api.signInWithRefresh();
    const access_life = Date.now() + (res.data.time_access * 1000)
    const userData = JSON.parse(localStorage.getItem('userData') as string)
    const {status_client, refresh_token, status_consultant, refresh_life} = userData;
    localStorage.setItem('userData', JSON.stringify({
        access_token: res.data.access,
        refresh_token: refresh_token,
        status_client: status_client,
        status_consultant: status_consultant,
        access_life: access_life,
        refresh_life: refresh_life
    }))
    dispatch(signIn({
        isAuth: true
    }))
}

const data = {
    grant_type: "refresh_token",
    client_id: "qJ7cVMs5DPgP9Otg0NEXnQJO3STDnNOc4Xsdc7BU",
    client_secret: "u2d6EdZaXJdI6sEj8N6C8SecOy7xhDsDx1ttoNGA5Xsi72yYuYDzwyxXoxKpwzPxEpmaUs9I5gfAcU85ISzt2eCmDDbRqBT7WGPN4w8mooTvmcMyrBzQESIhM135unJb",
}
export const googleRefresh = () => async (dispatch:any) => {
    let token = JSON.parse(localStorage.getItem('userData') as string);
    const newData = {
        ...data,
        refresh_token: token.refresh_token
    }
    api.googleRefresh(newData)
        .then((res)=>{
            const access_life = Date.now() + (res.data.expires_in * 1000)
            localStorage.setItem(storageName, JSON.stringify({
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token,
                status_client: true,
                status_consultant: false,
                access_life: access_life,
                refresh_life: false,
                google: true
            }))
        }, (error:any) =>{
            console.log(error)
        })
}


export const checkToken = (req: any) =>  async (dispatch: any) => {
    let token = JSON.parse(localStorage.getItem('userData') as string);
    const now = Date.now()
    if ( token && token.access_life > now) {
        return  await req()
    }else if(token && token.google){
        await dispatch(googleRefresh())
        return await req()
    } else if ( token && token.refresh_life > now) {
        await dispatch(setDataRefresh())
        return  await req()
    } else if( token && token.refresh_life < now) {
        dispatch(signIn({
            isAuth: false
        }))
    } else{
        return new Error('Something went wrong')
    }
}
