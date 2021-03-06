/* eslint-disable*/
import {
    USER_IN_SESSION,
    LOGOUT,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOADING,
    MESSAGE,
    SUCCESS_PROFILE_UPDATE
} from '../../types';

export default (state, action) => {

    switch (action.type) {
        case ERROR_LOGIN:
            return {
                ...state,
                token: null,
                message: action.payload,
                loading: false,
                authenticated: null
            }
        case SUCCESS_LOGIN:
            localStorage.setItem("token", action.payload);
            return {
                ...state,
                authenticated: true,
                message: null,
                token: action.payload,
                loading: false
            }
        case USER_IN_SESSION:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem("token");

            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                loading: false,
                message: null
            }
        case LOADING: {
            return {
                ...state,

                loading: action.payload,

            }
        }
        case SUCCESS_PROFILE_UPDATE: {
            return {
                ...state,

                loading: false,
                message:action.payload

            }
        }
        
        case MESSAGE: {
            return {
                ...state,
                message:action.payload,
                loading: false,

            }
        }
        default:
            return state;
    }
}