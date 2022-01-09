import React, { useReducer } from 'react';
import FoundationContext from './foundationContext';
import FoundationReducer from './foundationReducer';
import { FOUNDATION_MESSAGE, GET_FOUNDATION, TOGGLE_FOUNDATION_LOADING } from '../../types';
import axiosClient from '../../config/axios';

const FoundationState = props => {

    const initialState = {
        currentFoundation: [],
        message: null,
        loading: false,
    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(FoundationReducer, initialState);

    //funciones que modifican el state

    const getFoundation = async () => {


        try {
            dispatch({
                type: TOGGLE_FOUNDATION_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/foundations/myFoundation");

            if (res.data.state) {

                const { id_fundacion,
                    correo,
                    telefono,
                    cuenta_donaciones,
                    nombre,
                    direccion,
                    mision,
                    vision
                } = res.data.data;
                dispatch({
                    type: GET_FOUNDATION,
                    payload: {
                        correo: correo ?? "",
                        telefono: telefono ?? "",
                        cuenta_donaciones: cuenta_donaciones ?? "",
                        nombre: nombre ?? "",
                        direccion: direccion ?? "",
                        mision: mision ?? "",
                        vision: vision ?? ""

                    }
                });
            } else {
                dispatch({
                    type: FOUNDATION_MESSAGE,
                    payload: {
                        text: res.data.message,
                        category: "error",
                        showIn: "form"
                    }
                });
            }

        } catch (error) {

            dispatch({
                type: FOUNDATION_MESSAGE, payload: {
                    category: "error",
                    text: error.response.data.message,
                    showIn: "form"
                }
            });

        }
    }


    const updateFoundationData = async (data) => {

        try {
            dispatch({
                type: TOGGLE_FOUNDATION_LOADING,
                payload: true
            });
            const res = await axiosClient.put("/api/foundations", {
                correo: data.correo === "" ? null : data.correo,
                telefono: data.telefono === "" ? null : data.telefono,
                cuenta_donaciones: data.cuenta_donaciones === "" ? null : data.cuenta_donaciones,
                direccion: data.direccion === "" ? null : data.direccion,
                mision: data.mision === "" ? null : data.mision,
                vision: data.vision === "" ? null : data.vision
            });

            if (res.data.state) {
                dispatch({
                    type: FOUNDATION_MESSAGE,
                    payload: {
                        text: res.data.message,
                        category: "success",
                        showIn: "form"
                    }
                });
            } else {
                dispatch({
                    type: FOUNDATION_MESSAGE,
                    payload: {
                        text: res.data.message,
                        category: "error",
                        showIn: "form"
                    }
                });
            }

        } catch (error) {

            console.log(error)
            dispatch({
                type: FOUNDATION_MESSAGE, payload: {
                    category: "error",
                    text: error.response.data.message,
                    showIn: "form"
                }
            });

        }
    }

    const handleFoundationMessage = (data) => {
        dispatch({
            type: FOUNDATION_MESSAGE, payload: data
        });
    }
    return (
        <FoundationContext.Provider value={{
            currentFoundation: state.currentFoundation,
            loading: state.loading,
            message: state.message,
            getFoundation,
            updateFoundationData,
            handleFoundationMessage

        }}>
            {props.children}
        </FoundationContext.Provider>

    );
}
export default FoundationState;