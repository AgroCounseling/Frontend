import api from '../api/Api'


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
    const res = await api.signIn({"email": email, "password": password})
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
    dispatch(pend(false))
    return res.data
}

export const setDataRefresh = () => async (dispatch: any) => {
    const res = await api.signInWithRefresh();
    const access_life = Date.now() + (300 * 1000)
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


export const checkToken = (req: any) =>  async (dispatch: any) => {
    let token = JSON.parse(localStorage.getItem('userData') as string);
    const now = Date.now()
    if ( token && token.access_life > now) {
        return  await req()
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
