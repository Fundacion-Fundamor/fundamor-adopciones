import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    USER_IN_SESSION,
    LOGOUT,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOADING
} from '../../types';
import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';


const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true,
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //funciones que modifican el state
    const login = async (email, password) => {
        dispatch({ type: LOADING, payload: true });

        const formattedData = {
            correo: email,
            contrasenia: password
        }
        try {
            const res = await axiosClient.post("/api/auth/token", formattedData);
            dispatch({ type: SUCCESS_LOGIN, payload: res.data.token });
            authenticatedUser();

        } catch (error) {
            if (error.response) {
                dispatch({ type: ERROR_LOGIN, payload: error.response?.data.message });
            }
        }

    }

    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    const authenticatedUser = async () => {
        let token = localStorage.getItem("token");
        authToken(token);

        try {

            const res = await axiosClient.get("/api/auth");
            console.log(res.data)
            dispatch({ type: USER_IN_SESSION, payload: res.data.data });

        } catch (error) {

            localStorage.removeItem("token");
            dispatch({ type: ERROR_LOGIN });
        }

    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            loading: state.loading,
            login,
            logout,
            authenticatedUser
        }}>
            {props.children}
        </AuthContext.Provider>

    );
}
export default AuthState;