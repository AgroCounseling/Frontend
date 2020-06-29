import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {initialiseApp} from "./state/appReducer";
import {connect} from "react-redux";
import {GlobalStateType} from "./state/root-reducer";
import {isAuth, isPending} from "./state/selectors";
import Header from "./components/header/Header";
import AuthPage from "./components/authentication/AuthPage";
import {RegisterFormConsultant} from "./components/authentication/sign-up/SignUpForms";
import {SignIn} from "./components/authentication/sign-in/SignInForm";
import Preloader from "./components/preloader/Preloader";
import NavBar from "./components/navbar/NavBar";
import MainPage from "./components/mainPage/MainPage";
import Admin from "./components/Admin/Admin";

type OwnProps = {
    isPending: boolean
    initialiseApp: () => void
    isAuth: boolean
}

const App = (props:OwnProps) => {
    const {initialiseApp} = props
    const allPromiseRejection = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        initialiseApp()
        window.addEventListener('unhandledrejection', allPromiseRejection)
        return () => {
            window.removeEventListener('unhandledrejection', allPromiseRejection)
        }
    }, [initialiseApp])

    if(props.isPending){
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
                        <Admin />
                    </Route>
                    <Redirect to={'/'}/>
                </Switch>
            </Router>
        </div>
    )
}

export default connect((state: GlobalStateType) => {
    return {
        isPending: isPending(state),
        isAuth: isAuth(state)
    }
},{initialiseApp})(App)
