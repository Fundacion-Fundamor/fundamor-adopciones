import React, { useReducer } from 'react';
import AdoptionContext from './adoptionContext';
import AdoptionReducer from './adoptionReducer';
import { ADOPTIONS, SELECT_ADOPTION, TOGGLE_ADOPTION_LOADING, ADOPTION_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';

const AdoptionState = props => {

    const initialState = {
        adoptions: [],
        message: null,
        loading: false,
        selectedAdoption: null,
        animal: null,
        questions: [],
        adopter: [],
        employee: null,
        trackings: []

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(AdoptionReducer, initialState);

    //funciones que modifican el state

    const getAdoptions = async () => {

        try {
            dispatch({
                type: TOGGLE_ADOPTION_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/adoptions");
            console.log(res.data);
            if (res.data.state) {
                dispatch({
                    type: ADOPTIONS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: ADOPTIONS,
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
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    const createAdoption = async (data) => {

        dispatch({
            type: TOGGLE_ADOPTION_LOADING,
            payload: true
        });
        let formattedData = {
            id_animal: data.animalID,
            estado: data.adoptionState,
            id_adoptante: data.adopterID,
            observaciones: data.observations === "" ? null : data.observations,
            fecha_entrega: data.adoptionFinalDate === "" ? null : data.adoptionFinalDate
        }
        try {
            const res = await axiosClient.post("/api/adoptions", formattedData);
            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdoptions();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const editAdoption = async (data) => {

        dispatch({
            type: TOGGLE_ADOPTION_LOADING,
            payload: true
        });
        let formattedData = {
            id_adopcion: data.adoptionID,
            estado: data.adoptionState,
            id_animal: data.animalID,
            id_adoptante: data.adopterID,
            observaciones: data.observations === "" ? null : data.observations,
            fecha_entrega: data.adoptionFinalDate === "" ? null : data.adoptionFinalDate
        }
        try {
            let res = await axiosClient.put("/api/adoptions", formattedData);
            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAdoptions();

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const removeAdoption = async (adoptionID) => {

        dispatch({
            type: TOGGLE_ADOPTION_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/adoptions/" + adoptionID);

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getAdoptions();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }


    //TODO: falta que el backend devuelva las preguntas, el adoptante,seguimientos y el empleado y validar la estructura
    const selectAdoption = (item) => {

        console.log("Esta acción a aún no se ha implementado");
        // dispatch({ type: SELECT_ADOPTION, payload: item });
    }
    const handleAdoptionMessage = (data) => {
        dispatch({
            type: ADOPTION_MESSAGE, payload: data
        })
    }
    return (
        <AdoptionContext.Provider value={{
            adoptions: state.adoptions,
            loading: state.loading,
            selectedAdoption: state.selectedAdoption,
            message: state.message,
            getAdoptions,
            createAdoption,
            selectAdoption,
            removeAdoption,
            editAdoption,
            handleAdoptionMessage
        }}>
            {props.children}
        </AdoptionContext.Provider>

    );
}
export default AdoptionState;