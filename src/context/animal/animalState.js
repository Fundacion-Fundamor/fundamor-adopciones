import React, { useReducer } from 'react';
import AnimalContext from './animalContext';
import AnimalReducer from './animalReducer';
import { ANIMALS, SELECT_ANIMAL, TOGGLE_ANIMAL_LOADING, ANIMAL_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from '../../Shared/utils';


/**maneja las peticiones crud asociadas a los animales,
 * ademas de que almacena y globaliza el listado.
 * 
 * @param {*} props 
 * @returns 
 */
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

    const getAnimals = async (filters = null) => {



        let filtersString = "?";
        if (filters) {
            for (let key in filters) {
                filtersString += key + "=" + filters[key] + "&"

            }
        }
        try {
            dispatch({
                type: TOGGLE_ANIMAL_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/animals" + filtersString);
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
            let text = handleResponseError(error);
            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }
    const getAnimalsFromPublic = async (filters = null) => {       
        try {
            dispatch({
                type: TOGGLE_ANIMAL_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/foundations/animals");
            if (res.data.state) {
                dispatch({
                    type: ANIMALS,
                    payload: res.data.data.rows
                });
            } else {
                dispatch({
                    type: ANIMALS,
                    payload: []
                });
            }

        } catch (error) {
            let text = handleResponseError(error);
            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    const getAnimal = async (animalId) => {

        try {
            dispatch({
                type: TOGGLE_ANIMAL_LOADING,
                payload: true
            });
            const res = await axiosClient.get(`/api/animals/${animalId}`);
            if (res.data.state) {
                dispatch({
                    type: SELECT_ANIMAL,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: SELECT_ANIMAL,
                    payload: null
                });
            }

        } catch (error) {
            let text = handleResponseError(error);


            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            });

        }

    }

    const createAnimal = async (data, images) => {

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
            caracteristicas: data.characteristics.trim() !== "" ? data.characteristics : null,
            sitio_rescate: data.rescueSite.trim() !== "" ? data.rescueSite : null,
            fecha_rescate: data.rescueDate !== "" ? data.rescueDate : null,
            color: data.color,
            vacunas: data.vaccine !== "" ? data.vaccine : null,
            esterilizado: data.sterilized,
            desparasitado: data.dewormed,
            tamanio: data.size,
            estado: "Sin adoptar"

        }

        try {
            const res = await axiosClient.post("/api/animals", formattedData);

            if (res.data.state) {
                if (images.length !== 0) {
                    let resultImagesInsert = await insertImages(images, res.data.data);
                    dispatch({
                        type: ANIMAL_MESSAGE, payload: {
                            category: resultImagesInsert ? "success" : "error",
                            text: resultImagesInsert ? res.data.message : "El animal se ha registrado exitosamente, pero ha ocurrido un error al subir las imágenes",
                            showIn: "form"

                        }
                    });
                } else {
                    dispatch({
                        type: ANIMAL_MESSAGE, payload: {
                            category: "success",
                            text: res.data.message,
                            showIn: "form"

                        }
                    });
                }
                getAnimals();
            } else {
                dispatch({
                    type: ANIMAL_MESSAGE, payload: {
                        category: "error",
                        text: res.data.message,
                        showIn: "form"

                    }
                });
            }


        } catch (error) {

            const text = handleResponseError(error)

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

            return res.data.state;
        } catch (error) {

            return false;
        }
    }

    const removeImages = async (images) => {

        let formattedData = [];
        images.forEach(element => {
            formattedData.push(element.id_imagen_animal)
        })

        try {
            const res = await axiosClient.delete("/api/animalImages", { data: { id_imagenes: formattedData } },
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "multipart/form-data;",
                    },
                }
            );
            return res.data.state;

        } catch (error) {

            return false;
        }
    }


    const editAnimal = async (data, imagesInsert, imagesRemove) => {

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
            caracteristicas:  data.characteristics.trim() !== "" ? data.characteristics : null,
            sitio_rescate: data.rescueSite.trim() !== "" ? data.rescueSite : null,
            fecha_rescate:  data.rescueDate !== "" ? data.rescueDate : null,
            color: data.color,
            vacunas: data.vaccine !== "" ? data.vaccine : null,
            esterilizado: data.sterilized,
            desparasitado: data.dewormed,
            tamanio: data.size,
            estado: data.animalState

        }

        try {
            let res = await axiosClient.put("/api/animals", formattedData);
            if (res.data.state) {

                let resImagesInsert = true;
                let resImagesRemove = true;

                if (imagesInsert.length !== 0) {
                    resImagesInsert = await insertImages(imagesInsert, data.animalID);
                }

                if (imagesRemove.length !== 0) {
                    resImagesRemove = await removeImages(imagesRemove);

                }
                if (resImagesInsert && resImagesRemove) {

                    dispatch({
                        type: ANIMAL_MESSAGE, payload: {
                            category: "success",
                            text: res.data.message,
                            showIn: "form"

                        }
                    });
                    getAnimals();
                } else {
                    dispatch({
                        type: ANIMAL_MESSAGE, payload: {
                            category: "error",
                            text: "Los datos del animal se han actualizado satisfactoriamente, pero en las imágenes se ha presentado un error, intente actualizarlas de nuevo",
                            showIn: "form"

                        }
                    });
                }

            } else {
                dispatch({
                    type: ANIMAL_MESSAGE, payload: {
                        category: "error",
                        text: res.data.message,
                        showIn: "form"

                    }
                });
            }

        } catch (error) {

            let text = handleResponseError(error);

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
                    showIn: "detail"
                }
            });
            getAnimals();
        } catch (error) {

            const text = handleResponseError(error)
            dispatch({
                type: ANIMAL_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            })
        }
    }

    const selectAnimal = (item) => {

        dispatch({ type: SELECT_ANIMAL, payload: item });
    }
    const handleAnimalMessage = (data = null) => {
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
            getAnimalsFromPublic,
            getAnimal,
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