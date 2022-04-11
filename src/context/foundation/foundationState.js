/* eslint-disable no-useless-escape */
import React, { useReducer } from 'react';
import FoundationContext from './foundationContext';
import FoundationReducer from './foundationReducer';
import { FOUNDATION_MESSAGE, GET_FOUNDATION, TOGGLE_FOUNDATION_LOADING } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from "../../Shared/utils"


/**maneja las peticiones asociadas a la información de la fundación,
 * ademas de que almacena y globaliza dicha indormación.
 * 
 * @param {*} props 
 * @returns 
 */
const FoundationState = props => {

    const initialState = {
        currentFoundation: null,
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

                const {
                    correo,
                    telefono,
                    cuenta_donaciones,
                    nombre,
                    direccion,
                    mision,
                    vision,
                    url_mapa,
                    url_video
                } = res.data.data.foundation;

                const {
                    rescuedAnimals,
                    adoptedAnimals
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
                        vision: vision ?? "",
                        url_mapa: url_mapa ?? "",
                        url_video: url_video ?? "",
                        rescuedAnimals: rescuedAnimals ?? 0,
                        adoptedAnimals: adoptedAnimals ?? 0
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
            let text = handleResponseError(error);

            dispatch({
                type: FOUNDATION_MESSAGE, payload: {
                    category: "error",
                    text: text,
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
                vision: data.vision === "" ? null : data.vision,
                url_mapa: data.url_mapa === "" ? null : data.url_mapa,
                url_video: data.url_video === "" ? null : normalizeYoutubeLink(data.url_video)

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

            let text = handleResponseError(error);
            dispatch({
                type: FOUNDATION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            });

        }
    }

    const normalizeYoutubeLink = function (url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length === 11) {
            return "http://www.youtube.com/watch?v=" + match[2];
        } else {
            return url
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