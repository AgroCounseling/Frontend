import React, {useEffect, useState} from 'react'
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
import Consultants from "./components/consultants/Consultants";
import WelcomePage from "./components/authentication/WelcomePage";
import {RegisterFormClient} from "./components/authentication/sign-up/SignUpcClient";
import Footer from "./components/footer/Footer";
import Forum from "./components/forum/Forum";
import Answer from "./components/answer/Answer";
import Consultant from "./components/Consultant/Consultant";
import Articles from "./components/articles/Articles";
import Article from "./components/Article/Article";
import Payment from "./components/payment/Payment";

type OwnProps = {
    isPending: boolean
    initialiseApp: () => void
    isAuth: boolean
}

const App = (props:OwnProps) => {
    const {initialiseApp} = props
    const [pending, setPending] = useState(true)
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
    setTimeout(()=> {
        setPending(false)
    }, 1000)
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
                        <Footer />
                    </Route>
                    <Route exact path={'/sign-in'}>
                        <AuthPage>
                            <SignIn/>
                        </AuthPage>
                    </Route>
                    <Route exact path={'/sign-up'}>
                        <WelcomePage />
                    </Route>
                    <Route path={'/sign-up-consultant'}>
                        <AuthPage>
                            <RegisterFormConsultant />
                        </AuthPage>
                    </Route>
                    <Route path={'/sign-up-client'}>
                        <AuthPage>
                            <RegisterFormClient />
                        </AuthPage>
                    </Route>
                    <Route path={'/admin'}>
                        <Admin />
                    </Route>
                    <Route path={'/consultant/:id'}>
                        <Consultant />
                    </Route>
                    <Route path={'/consultants/:id'}>
                        <Consultants />
                        <Footer />
                    </Route>
                    <Route path={'/forum'}>
                        <Forum />
                    </Route>
                    <Route path={'/answer/:id'}>
                        <Answer />
                    </Route>
                    <Route path={'/articles/:id'}>
                        <Articles />
                    </Route>
                    <Route path={'/articles'}>
                        <Articles />
                    </Route>
                    <Route  path={'/article/:id'}>
                        <Article />
                    </Route>
                    <Route  path={'/payment'}>
                        <Payment />
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
