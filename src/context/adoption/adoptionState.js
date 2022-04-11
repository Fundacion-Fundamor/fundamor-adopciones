import React, { useReducer } from 'react';
import AdoptionContext from './adoptionContext';
import AdoptionReducer from './adoptionReducer';
import { ADOPTIONS, SELECT_ADOPTION, TOGGLE_ADOPTION_LOADING, ADOPTION_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from '../../Shared/utils';

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

            let text = handleResponseError(error)

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    /**Primero se inserta el adoptante, luego la adopcion y finalmente las preguntas 
     * 
     * @param {*} data 
     * @param {*} selectedAnimal 
     * @param {*} selectedAdopter 
     * @param {*} adopterData 
     * @param {*} questionsData 
     */
    const createAdoption = async (data, selectedAnimal, selectedAdopter, adopterData, questionsData) => {

        dispatch({
            type: TOGGLE_ADOPTION_LOADING,
            payload: true
        });



        let adoptionFormattedData = {
            id_animal: selectedAnimal.id_animal,
            estado: data.adoptionState.toLowerCase(),
            observaciones: data.observations === "" ? null : data.observations,
            fecha_entrega: data.adoptionFinalDate === "" ? null : data.adoptionFinalDate
        }

        let adopterFormattedData = {};

        if (selectedAdopter) {
            adopterFormattedData = {
                selected: true,
                correo: selectedAdopter.correo !== "" ? data.correo : null,
                nombre: selectedAdopter.nombre,
                telefono_casa: selectedAdopter.telefono_casa === "" ? null : data.telefono_casa,
                telefono_celular: selectedAdopter.telefono_celular,
                ocupacion: selectedAdopter.ocupacion,
                ciudad: selectedAdopter.ciudad,
                id_adoptante: selectedAdopter.id_adoptante
            };
        } else {
            adopterFormattedData = {
                selected: false,
                correo: adopterData.email !== "" ? adopterData.email : null,
                nombre: adopterData.name,
                telefono_casa: adopterData.housePhone === "" ? null : adopterData.housePhone,
                telefono_celular: adopterData.phone,
                ocupacion: adopterData.profession,
                ciudad: adopterData.address,
                id_adoptante: adopterData.ID
            }
        }
        let questionsFormattedData = [];
        questionsData.forEach(element => {
            questionsFormattedData.push({

                id_pregunta: element.id_pregunta,
                respuesta: element.answer
            })

        });

        try {

            let resAdoption = await axiosClient.post("/api/adoptions", {
                adoptionData: adoptionFormattedData,
                adopterData: adopterFormattedData,
                questionsData: questionsFormattedData
            });
            if (resAdoption.data.state) {

                dispatch({
                    type: ADOPTION_MESSAGE, payload: {
                        category: "success",
                        text: "La adopción se ha registrado con exito",
                        showIn: "form"

                    }
                })

            } else {

                dispatch({
                    type: ADOPTION_MESSAGE, payload: {
                        category: "error",
                        text: resAdoption.data.message,
                        showIn: "form"

                    }
                })
            }


        } catch (error) {

            let text = handleResponseError(error)

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
            id_adopcion: data.adoptionId,
            estado: data.adoptionState,
            observaciones: data.observations.trim() === "" ? null : data.observations,
            fecha_entrega: data.adoptionState === "finalizada" ? (data.adoptionFinalDate === "" ? null : data.adoptionFinalDate) : null
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


        } catch (error) {

            let text = handleResponseError(error);
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
                    showIn: "detail"
                }
            })
            getAdoptions();


        } catch (error) {

            let text = handleResponseError(error);

            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            })
        }
    }

    const getAdoption = async (adoptionId) => {

        try {
            dispatch({
                type: TOGGLE_ADOPTION_LOADING,
                payload: true
            });

            const res = await axiosClient.get("/api/adoptions/" + adoptionId);
            const resQuestions = await axiosClient.get("/api/adoptionQuestions/" + adoptionId);

            if (res.data.state) {
                if (resQuestions.data.state) {
                    res.data.data.questions = resQuestions.data.data
                    dispatch({
                        type: SELECT_ADOPTION,
                        payload: res.data.data
                    });
                } else {
                    dispatch({
                        type: ADOPTION_MESSAGE, payload: {
                            category: "error",
                            text: "Ha ocurrio un error al obtener el cuestionario de adopción, por favor intente mas tarde",
                            showIn: "detail"
                        }
                    });
                }
            } else {
                dispatch({
                    type: SELECT_ADOPTION,
                    payload: null
                });
            }

        } catch (error) {

            let text = handleResponseError(error);
            dispatch({
                type: ADOPTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            });

        }
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
            getAdoption,
            removeAdoption,
            editAdoption,
            handleAdoptionMessage
        }}>
            {props.children}
        </AdoptionContext.Provider>

    );
}
export default AdoptionState;