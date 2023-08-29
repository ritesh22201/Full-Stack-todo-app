import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { DELETE_TODOS_SUCCESS, GET_TODOS, GET_TODOS_FAILURE, GET_TODOS_SUCCESS, POST_TODOS_SUCCESS, UPDATE_TODOS_SUCCESS } from "./actionTypes"

interface NewTodo {
    title: string;
    created_at: number;
    priority: number;
    status: boolean;
}

const value: string | null = localStorage.getItem('token');
const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;

export const getTodos = (token: string, q='', dateInp='', page = 1, limit = 4) => (dispatch: any) => {

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    dispatch({ type: GET_TODOS });
    return axios.get(`https://todoconfig.onrender.com/todo/?q=${q}&page=${page}&limit=${limit}`, config )
        .then(res => {
            dispatch({ type: GET_TODOS_SUCCESS, payload: {todos : res.data.todos, totalTodos : res.data.totalTodos} })
            // console.log(res)
        })
        .catch(err => {
            dispatch({ type: GET_TODOS_FAILURE, payload: err.message });
        })
}

export const postTodos = (newTodo: NewTodo) => (dispatch: any) => {

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token?.token}`,
        },
    };

    dispatch({ type: GET_TODOS });
    return axios.post('https://todoconfig.onrender.com/todo/addTodo', newTodo, config)
        .then(res => {
            dispatch({ type: POST_TODOS_SUCCESS, payload: res.data })
            console.log(res)
        })
        .catch(err => {
            // console.log(err)
            dispatch({ type: GET_TODOS_FAILURE, payload: err.message });
        })
}

export const updateStatus = (id:number) => (dispatch:any) => {
    
}

export const deleteTodo = (id:string) => (dispatch:any) => {

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token?.token}`,
        },
    };
    
    dispatch({type : GET_TODOS});
    return axios.delete(`https://todoconfig.onrender.com/todo/delete/${id}`,config)
    .then(res => {
        // console.log(res)
        dispatch({type : DELETE_TODOS_SUCCESS, payload : res.data.msg});
    })
    .catch(err => {
        // console.log(err)
        dispatch({type : GET_TODOS_FAILURE, payload : err.message});
    })
}

export const editTodo = (id:string, title:string, newStatus : boolean) => (dispatch:any) => {

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token?.token}`,
        },
    };

    let data = title || newStatus;
    let finalData;

    if(typeof data === 'string'){
        finalData = {title}
    }
    else{
        finalData = {status : newStatus}
    }


    dispatch({type : GET_TODOS});
    return axios.patch(`https://todoconfig.onrender.com/todo/update/${id}`,finalData,config)
    .then(res => {
        console.log(res)
        dispatch({type : UPDATE_TODOS_SUCCESS, payload : res.data.msg});
    })
    .catch(err => {
        console.log(err)
        dispatch({type : GET_TODOS_FAILURE, payload : err.message});
    })
}