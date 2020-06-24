import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {GlobalStateType} from "../state/root-reducer";



export const WithAuthRedirect = (Component:any) => {
    const RedirectComponent = (props: any) => {
        if(props.data.isAuth === true) return <Redirect to={'/admin'} />
        return <Component {...props}/>
    }
    const mapStateToProps = (state:GlobalStateType) => {
        return {
            data: state.auth
        }
    }
    const RedirectComponentConnect = connect(mapStateToProps,{})(RedirectComponent);
    return RedirectComponentConnect
}



export const WithNotAuthRedirect = (Component:any) => {
    const RedirectComponent = (props:any) => {
        if(props.data.isAuth === false) return <Redirect to={'/sign-in'} />
        return <Component {...props}/>
    }
    const mapStateToProps = (state:GlobalStateType) => {
        return {
            data: state.auth
        }
    }
    const AdminContainer = connect(mapStateToProps, {})(RedirectComponent)
    return AdminContainer
}
