import {signIn} from "./authReducer";
import api from '../api/Api'

const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";
const SET_CATEGORIES = "app/SET_CATEGORIES"
const SET_SPECIALTIES = "app/SET_SPECIALTIES"
const SET_SLIDER = "app/SET_SLIDER"
const SET_SEARCH = "app/SET_SEARCH"

const initialState = {
    initialise: true,
    categories: [],
    specialties: [],
    slider: [],
    search: ''
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case SET_SLIDER:
            return {
                ...state,
                slider: action.data
            }
        case SET_SPECIALTIES:
            return {
                ...state,
                specialties: action.data
            }
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: false
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.search
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
export const setCategories = (categories: any) => {
    return {
        type: SET_CATEGORIES,
        categories
    }
}
export const setSearch = (str: string) => {
    return {
        type: SET_SEARCH,
        search: str
    }
}
const setSlider = (data: [{ image: string, pub_date: string }]) => {
    return {
        type: SET_SLIDER,
        data
    }
}
export const getCategories = () => async (dispatch: any) => {
    api.getCategory()
        .then((res: any) => {
            dispatch(setCategories(res.data.results))
        }, (error: any) => console.error(error))
    api.getSlider()
        .then((res: any) => {
            dispatch(setSlider(res.data.results))
        })
}
export const setSpecialties = (data: any) => {
    return {
        type: SET_SPECIALTIES,
        data
    }
}
export const getSpecialties = () => async (dispatch: any) => {
    api.getSpecialty()
        .then((res: any) => {
            dispatch(setSpecialties(res.data.results))
        }, (error: any) => console.error(error))
}

export const initialiseApp = () => (dispatch: any) => {
    dispatch(getCategories())
    dispatch(getSpecialties())
    let data = JSON.parse(localStorage.getItem('userData') as string)
    if (data && data.refresh_token) {
        if (data.refresh_life > Date.now() || data.google) {
            dispatch(initialise())
            dispatch(signIn({
                isAuth: true
            }))
        } else {
            localStorage.removeItem('userData')
            dispatch(signIn({
                isAuth: false
            }))
        }
    } else {
        dispatch(initialise())
    }
}
