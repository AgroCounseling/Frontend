import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {initialise} from "./state/appReducer";
import {connect} from "react-redux";
import {GlobalStateType} from "./state/root-reducer";
import {isPending} from "./state/selectors";
import Header from "./components/header/Header";
import AuthPage from "./components/authentication/AuthPage";
import {RegisterFormConsultant} from "./components/authentication/sign-up/SignUpForms";
import {SignIn} from "./components/authentication/sign-in/SignInForm";
import Preloader from "./components/preloader/Preloader";
import NavBar from "./components/navbar/NavBar";
import MainPage from "./components/mainPage/MainPage";


type OwnProps = {
    isPending: boolean
    initialise: () => void
}

const App = (props:OwnProps) => {
    const [pending, setPending] = useState(true)
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

    setTimeout(()=>{
        setPending(false)
    },1500)
    if(pending){
        return <div className={'preloaderWrapper'}><Preloader /></div>
    }
    return (
        <div className="App">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path={'/'}>
                        <NavBar/>
                        <MainPage/>
                    </Route>
                    <Route exact path={'/sign-in'}>
                        <AuthPage>
                            <SignIn/>
                        </AuthPage>
                    </Route>
                    <Route path={'/sign-up-consultant'}>
                        <AuthPage>
                            <RegisterFormConsultant />
                        </AuthPage>
                    </Route>
                    <Route path={'/admin'}>
                        <div style={{marginTop: '63px'}}>
                            Admin
                        </div>
                    </Route>
                    <Redirect to={'/'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default connect((state: GlobalStateType) => {
    return {
        isPending: isPending(state)
    }
},{initialise})(App)
