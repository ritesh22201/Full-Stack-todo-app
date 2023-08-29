import axios, { AxiosRequestConfig } from "axios";
import { Form } from "../../pages/Signup";
import { AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from "./actionTypes";
import { LoginType } from "../../pages/Login";

export const signup = (formData: Form) => (dispatch: any) => {
    dispatch({ type: AUTH_REQ });
    axios.post('https://todoconfig.onrender.com/users/register', formData)
        .then(res => {
            // console.log(res);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data.msg });
        })
        .catch(err => {
            // console.log(err.response.data.msg)
            dispatch({ type: REGISTER_FAILURE, payload: err.response.data.msg });
        })
}

export const login = (formData: LoginType) => (dispatch: any) => {
    dispatch({ type: AUTH_REQ });
    axios.post('https://todoconfig.onrender.com/users/login', formData)
        .then(res => {
            console.log(res);
            dispatch({ type: AUTH_REQ_SUCCESS, payload: res.data });
        })
        .catch(err => {
            // console.log(err)
            dispatch({ type: AUTH_REQ_FAILURE, payload: err.response.data });
        })
}


export const logout = (token:string | null) => (dispatch:any) => {

    const config:AxiosRequestConfig = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    dispatch({type : AUTH_REQ});
    axios.get('https://todoconfig.onrender.com/users/logout', config)
    .then(res => {
        dispatch({type : LOGOUT_SUCCESS })
    })
    .catch(err => {
        dispatch({type : LOGOUT_FAILURE})
    })
}