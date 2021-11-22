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

        let resAdoption = null;

        let resAdopter = null;

        let adoptionFormattedData = {
            id_animal: selectedAnimal.id_animal,
            estado: data.adoptionState,
            observaciones: data.observations === "" ? null : data.observations,
            fecha_entrega: data.adoptionFinalDate === "" ? null : data.adoptionFinalDate
        }

        let adopterFormattedData = {};

        if (selectedAdopter) {
            adopterFormattedData = {
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
                correo: adopterData.email !== "" ? adopterData.email : null,
                nombre: adopterData.name,
                telefono_casa: adopterData.housePhone === "" ? null : adopterData.housePhone,
                telefono_celular: adopterData.phone,
                ocupacion: adopterData.profession,
                ciudad: adopterData.address,
                id_adoptante: adopterData.ID
            }
        }

        try {
            resAdopter = await axiosClient.post("/api/adopters", adopterFormattedData);

            if (resAdopter.data.state) {
                adoptionFormattedData.id_adoptante = resAdopter.data.data;
                resAdoption = await axiosClient.post("/api/adoptions", adoptionFormattedData);
                if (resAdoption.data.state) {

                    let questionsFormattedData = [];

                    questionsData.forEach(element => {
                        questionsFormattedData.push({
                            id_adopcion: resAdoption.data.data,
                            id_pregunta: element.id_pregunta,
                            respuesta: element.answer
                        })

                    });

                    const resAnswers = await axiosClient.post("/api/adoptionQuestions", { respuestas: questionsFormattedData });

                    if (resAnswers.data.state) {
                        dispatch({
                            type: ADOPTION_MESSAGE, payload: {
                                category: "success",
                                text: "La adopción se ha resgistrado con exito",
                                showIn: "form"

                            }
                        })
                    } else {
                        let resDeleteAdoption = await axiosClient.delete("/api/adoptions/" + resAdoption.data.data);

                        if (resDeleteAdoption.data.state) {
                            let resDeleteAdopters = await axiosClient.delete("/api/adopters/" + adopterFormattedData.id_adoptante);
                            if (!resDeleteAdopters) {

                            }
                        }

                        dispatch({
                            type: ADOPTION_MESSAGE, payload: {
                                category: "error",
                                text: resAnswers.data.message,
                                showIn: "form"

                            }
                        })
                    }
                } else {
                    await axiosClient.delete("/api/adopters/" + adopterFormattedData.id_adoptante);

                    dispatch({
                        type: ADOPTION_MESSAGE, payload: {
                            category: "error",
                            text: resAdoption.data.message,
                            showIn: "form"

                        }
                    })
                }
            } else {
                dispatch({
                    type: ADOPTION_MESSAGE, payload: {
                        category: "error",
                        text: resAdopter.data.message,
                        showIn: "form"

                    }
                })
            }


            // getAdoptions();

        } catch (error) {

            //si ocurre un error ha que eliminar las insersiones
            if (resAdoption && resAdoption.data.state) {
                axiosClient.delete("/api/adoptions/" + resAdoption.data.data).then((resDeleteAdoption) => {
        
                    if (resDeleteAdoption.data.state) {
                        axiosClient.delete("/api/adopters/" + adopterFormattedData.id_adoptante);
                    }
                });

            } else if (resAdopter && resAdopter.data.state) {
                axiosClient.delete("/api/adopters/" + adopterFormattedData.id_adoptante);
            }

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