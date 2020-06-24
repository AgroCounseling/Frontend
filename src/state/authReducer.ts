import api from '../api/Api'


const storageName = 'userData'

const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED'
const IS_PENDING = 'auth/IS_PENDING'
const AUTHORIZATION = 'auth/AUTHORIZATION'


const initialState = {
    refresh_token: null,
    access_token: null,
    status_client: false,
    status_consultant: false,
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

const signIn = (payload: any) => {
    return {
        type: AUTHORIZATION,
        payload
    }
}

export const authFunction = (email: string, password: string) => async (dispatch: any, ) =>{
    dispatch(pend(true))
    const res = await api.signIn({"email": email, "password": password})
    const access_life = Date.now() + (res.data.time_access*1000)
    const refresh_life = Date.now() + (res.data.time_refresh*1000)
    console.log()
    dispatch(signIn({
        refresh_token: res.data.refresh,
        access_token: res.data.access,
        status_client: res.data.status_client,
        status_consultant: res.data.status_consultant,
        isAuth: true,
        access_life: access_life,
        refresh_life: refresh_life
    }))
    localStorage.setItem(storageName, JSON.stringify({
        access_token: res.data.access,
        refresh_token: res.data.refresh,
        status_client: res.data.status_client,
        status_consultant: res.data.status_consultant,
        access_life: access_life,
        refresh_life: refresh_life
    }))
    dispatch(pend(false))
    return res.data
}
