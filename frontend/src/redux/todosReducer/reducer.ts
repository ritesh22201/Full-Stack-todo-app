import { Todo } from "../../components/TodoItem";
import { DELETE_TODOS_SUCCESS, GET_TODOS, GET_TODOS_FAILURE, GET_TODOS_SUCCESS, POST_TODOS_SUCCESS, UPDATE_TODOS_SUCCESS } from "./actionTypes";

const initialState = {
    data : [],
    isLoading : false,
    isError : false,
    errorMsg : '',
    deletedMsg : '',
    editMsg : '',
    isDeleted : false,
    totalTodos : 0
}

type Payload = {
    todos : Todo[];
    totalTodos : number;
}

type Action = {
    type : string;
    payload : string | Payload;
}


export const reducer = (state = initialState, {type, payload}:Action) => {
    switch(type){
        case GET_TODOS : {
            return {
                ...state,
                isLoading : true
            }
        }

        case GET_TODOS_SUCCESS : {
            const {todos, totalTodos} = payload as Payload;
            return {
                ...state,
                isLoading : false,
                data : todos,
                totalTodos : totalTodos
            }
        }

        case GET_TODOS_FAILURE : {
            return {
                ...state,
                isLoading : false,
                iError : true,
                errorMsg : payload
            }
        }

        case POST_TODOS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                data : [...state.data, payload]
            }
        }

        case DELETE_TODOS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                deletedMsg : payload,
                isDeleted : true
            }
        }

        case UPDATE_TODOS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                editMsg : payload
            }
        }

        default : {
            return state;
        }
    }
}