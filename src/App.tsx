import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {initialise} from "./state/appReducer";
import {connect} from "react-redux";
import {GlobalStateType} from "./state/root-reducer";
import {getToken, isPending} from "./state/selectors";

const App = (props:any) => {
    const allPromiseRejection = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        props.initialise()
        window.addEventListener('unhandledrejection', allPromiseRejection)
        return () => {
            window.removeEventListener('unhandledrejection', allPromiseRejection)
        }
    }, [props])

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default connect((state: GlobalStateType) => {
    return {
        token: getToken(state),
        isPending: isPending(state)
    }
},{initialise})(App)
