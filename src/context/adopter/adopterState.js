import React, { useReducer } from 'react';
import AdopterContext from './adopterContext';
import AdopterReducer from './adopterReducer';
import { ADOPTERS, SELECT_ADOPTER, TOGGLE_ADOPTERS_LOADING, ADOPTER_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';

const AdopterState = props => {

    const initialState = {
        adopters: [],
        message: null,
        loading: false,
        selectedAdopter: null
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(AdopterReducer, initialState);

    //funciones que modifican el state

    const getAdopters = async () => {

        try {
            dispatch({
                type: TOGGLE_ADOPTERS_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/adopters");

            if (res.data.state) {
                dispatch({
                    type: ADOPTERS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: ADOPTERS,
                    payload: []
                });
            }

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    const createAdopter = async (data) => {

        dispatch({
            type: TOGGLE_ADOPTERS_LOADING,
            payload: true
        });
        let formattedData = {
            correo: data.email,
            contrasenia: data.password,
            nombre: data.name,
            rol: data.role,
            id_empleado: data.ID
        }
        try {
            const res = await axiosClient.post("/api/adopters", formattedData);
            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdopters();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const editAdopter = async (data, edit = false) => {

        dispatch({
            type: TOGGLE_ADOPTERS_LOADING,
            payload: true
        });
        let formattedData = {};

        if (!edit || data.enablePassword) {
            formattedData = {
                correo: data.email,
                contrasenia: data.password,
                nombre: data.name,
                rol: data.role,
                id_empleado: data.ID
            }
        } else {
            formattedData = {
                correo: data.email,
                nombre: data.name,
                rol: data.role,
                id_empleado: data.ID
            }
        }


        try {
            let res = await axiosClient.put("/api/adopters", formattedData);
            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdopters();

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const removeAdopter = async (idAdopter) => {

        dispatch({
            type: TOGGLE_ADOPTERS_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/adopters/" + idAdopter);

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getAdopters();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }

    const selectAdopter = (item) => {

        dispatch({ type: SELECT_ADOPTER, payload: item });
    }
    const handleAdopterMessage = (data) => {
        dispatch({
            type: ADOPTER_MESSAGE, payload: data
        })
    }
    return (
        <AdopterContext.Provider value={{
            adopters: state.adopters,
            loading: state.loading,
            selectedAdopter: state.selectedAdopter,
            message: state.message,
            getAdopters,
            createAdopter,
            selectAdopter,
            removeAdopter,
            editAdopter,
            handleAdopterMessage
        }}>
            {props.children}
        </AdopterContext.Provider>

    );
}
export default AdopterState;