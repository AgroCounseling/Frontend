import {combineReducers, compose, createStore, applyMiddleware} from "redux";
import thunk  from 'redux-thunk'
import {auth} from "./authReducer";
import {appReducer} from "./appReducer";

let reducers = combineReducers({
    auth: auth,
    app: appReducer
})

type RootReducerType = typeof reducers;
export type GlobalStateType = ReturnType<RootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
