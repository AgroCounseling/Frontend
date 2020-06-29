import {checkToken, signIn} from "./authReducer";
import api from '../api/Api'

const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";


const initialState = {
    initialise: true,
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: false
            }
        default:
            return {
                ...state
            }
    }
}


export const initialise = () => {
    return {
        type: INITIALIZE_SUCCEED
    }
}


export const initialiseApp = () => (dispatch: any) => {
    let data = JSON.parse(<string>localStorage.getItem('userData'));
    if (data && data.refresh_token) {
        if(data.refresh_life > Date.now()){
            dispatch(initialise())
            dispatch(categories())
            dispatch(signIn({
                isAuth: true
            }))
        }else{
            localStorage.removeItem('userData')
            dispatch(signIn({
                isAuth: false
            }))
        }
    } else {
        dispatch(initialise())
    }
}

export const categories = () => async (dispatch: any) => {
    let res = await dispatch(checkToken(api.getCategory))
    console.log(res)
}