import {GlobalStateType} from './root-reducer'

// export const getToken = (state: GlobalStateType) => state.auth

export const isPending = (state: GlobalStateType) => state.app.initialise
