import {GlobalStateType} from './root-reducer'

export const isAuth = (state: GlobalStateType) => state.auth.isAuth

export const isPending = (state: GlobalStateType) => state.app.initialise
