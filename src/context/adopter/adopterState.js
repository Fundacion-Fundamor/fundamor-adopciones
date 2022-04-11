import React, { useReducer } from 'react';
import AdopterContext from './adopterContext';
import AdopterReducer from './adopterReducer';
import { ADOPTERS, SELECT_ADOPTER, TOGGLE_ADOPTER_LOADING, ADOPTER_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from '../../Shared/utils';


/**maneja las peticiones crud asociadas a los adoptantes,
 * ademas de que almacena y globaliza el listado.
 * 
 * @param {*} props 
 * @returns 
 */
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
                type: TOGGLE_ADOPTER_LOADING,
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

            let text = handleResponseError(error)

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
            type: TOGGLE_ADOPTER_LOADING,
            payload: true
        });
        let formattedData = {
            correo: data.email !== "" ? data.email : null,
            nombre: data.name,
            telefono_casa: data.housePhone === "" ? null : data.housePhone,
            telefono_celular: data.phone,
            ocupacion: data.profession,
            ciudad: data.address,
            id_adoptante: data.ID
        }
        try {
            const res = await axiosClient.post("/api/adopters", formattedData);
            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdopters();

        } catch (error) {

            let text = handleResponseError(error)

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
            type: TOGGLE_ADOPTER_LOADING,
            payload: true
        });
        let formattedData = {};

        if (!edit || data.enablePassword) {
            formattedData = {
                correo: data.email !== "" ? data.email : null,
                contrasenia: data.password,
                nombre: data.name,
                telefono_casa: data.housePhone === "" ? null : data.housePhone,
                telefono_celular: data.phone,
                ocupacion: data.profession,
                ciudad: data.address,
                id_adoptante: data.ID
            }
        } else {
            formattedData = {
                correo: data.email !== "" ? data.email : null,
                nombre: data.name,
                telefono_casa: data.housePhone === "" ? null : data.housePhone,
                telefono_celular: data.phone,
                ocupacion: data.profession,
                ciudad: data.address,
                id_adoptante: data.ID
            }
        }


        try {
            let res = await axiosClient.put("/api/adopters", formattedData);
            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdopters();

        } catch (error) {

            let text = handleResponseError(error);

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
            type: TOGGLE_ADOPTER_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/adopters/" + idAdopter);

            dispatch({
                type: ADOPTER_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getAdopters();

        } catch (error) {

            let text = handleResponseError(error)
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