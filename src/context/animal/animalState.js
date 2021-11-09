import React, { useReducer } from 'react';
import AnimalContext from './animalContext';
import AnimalReducer from './animalReducer';
import { ANIMALS, SELECT_ANIMAL, TOGGLE_ANIMAL_LOADING, ANIMAL_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';

const AnimalState = props => {

    const initialState = {
        animals: [],
        message: null,
        loading: false,
        selectedAnimal: null

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(AnimalReducer, initialState);

    //funciones que modifican el state

    const getAnimals = async () => {

        try {
            dispatch({
                type: TOGGLE_ANIMAL_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/animals");

            if (res.data.state) {
                dispatch({
                    type: ANIMALS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: ANIMALS,
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
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    const createAnimal = async (data,images) => {

        dispatch({
            type: TOGGLE_ANIMAL_LOADING,
            payload: true
        });
        let formattedData =
        {
            especie: data.specie,
            nombre: data.name,
            fecha_nacimiento: data.birthday,
            sexo: data.gender,
            caracteristicas: data.characteristics,
            sitio_rescate: data.rescueSite,
            fecha_rescate: data.rescueDate,
            color: data.color,
            vacunas: data.vaccine,
            esterilizado: data.sterilized,
            desparasitado: data.dewormed,
            tamanio: data.size,
            estado: "Sin adoptar"

        }

        try {
            const res = await axiosClient.post("/api/animals", formattedData);
            console.log(res.data);
            await insertImages(images, res.data.data);
            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAnimals();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }


    const insertImages = async (images, animalID) => {

        let formattedData = new FormData();
        images.forEach((element) => {
            formattedData.append("animalImages", element.file);
        });
        formattedData.append('id_animal', animalID);
        try {
            const res = await axiosClient.post("/api/animalImages/uploadImages", formattedData,
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data;",
                    },
                }
            );

            console.log(res.data);
        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }

    }
    const editAnimal = async (data) => {

        dispatch({
            type: TOGGLE_ANIMAL_LOADING,
            payload: true
        });
        let formattedData =
        {
            id_animal: data.animalID,
            especie: data.specie,
            nombre: data.name,
            fecha_nacimiento: data.birthday,
            sexo: data.gender,
            caracteristicas: data.characteristics,
            sitio_rescate: data.rescueSite,
            fecha_rescate: data.rescueDate,
            color: data.color,
            vacunas: data.vaccine,
            esterilizado: data.sterilized,
            desparasitado: data.dewormed,
            tamanio: data.size,
            estado: data.animalState

        }


        try {
            let res = await axiosClient.put("/api/animals", formattedData);
            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getAnimals();

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const removeAnimal = async (animalID) => {

        dispatch({
            type: TOGGLE_ANIMAL_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/animals/" + animalID);

            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getAnimals();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }

    const selectAnimal = (item) => {

        dispatch({ type: SELECT_ANIMAL, payload: item });
    }
    const handleAnimalMessage = (data) => {
        dispatch({
            type: ANIMAL_MESSAGE, payload: data
        })
    }
    return (
        <AnimalContext.Provider value={{
            animals: state.animals,
            loading: state.loading,
            selectedAnimal: state.selectedAnimal,
            message: state.message,
            getAnimals,
            createAnimal,
            selectAnimal,
            removeAnimal,
            editAnimal,
            handleAnimalMessage
        }}>
            {props.children}
        </AnimalContext.Provider>

    );
}
export default AnimalState;