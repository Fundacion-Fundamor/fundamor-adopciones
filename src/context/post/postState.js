import React, { useReducer } from 'react';
import PostContext from './postContext';
import PostReducer from './postReducer';
import { POSTS, SELECT_POST, TOGGLE_POSTS_LOADING, POST_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from "../../Shared/utils"

const PostState = props => {


    const initialState = {
        posts: [],
        message: null,
        loading: false,
        selectedPost: null

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(PostReducer, initialState);

    //funciones que modifican el state

    const getPosts = async () => {

        try {
            dispatch({
                type: TOGGLE_POSTS_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/post");

            if (res.data.state) {
                dispatch({
                    type: POSTS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: POSTS,
                    payload: []
                });
            }

        } catch (error) {

            let text = handleResponseError(error)
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }

    const getPost = async (postId) => {

        try {
            dispatch({
                type: TOGGLE_POSTS_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/post/" + postId);
            if (res.data.state) {
                dispatch({
                    type: SELECT_POST,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: POSTS,
                    payload: null
                });
            }

        } catch (error) {

            let text = handleResponseError(error)
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            });

        }

    }

    /**Funcion para crear posts
     * 
     * @param {*} data 
     */
    const createPost = async (data, images) => {


        dispatch({
            type: TOGGLE_POSTS_LOADING,
            payload: true
        });
        let formattedData = {
            titulo: data.titulo,
            cuerpo: data.cuerpo
        }
        try {
            const res = await axiosClient.post("/api/post", formattedData);

            if (res.data.state) {
                if (images.length !== 0) {
                    let resultImagesInsert = await insertImages(images, res.data.data);
                    dispatch({
                        type: POST_MESSAGE, payload: {
                            category: resultImagesInsert ? "success" : "error",
                            text: resultImagesInsert ? res.data.message : "La publicación se ha registrado exitosamente exitosamente, pero ha ocurrido un error al subir las imágenes",
                            showIn: "form"

                        }
                    });
                } else {
                    dispatch({
                        type: POST_MESSAGE, payload: {
                            category: "success",
                            text: res.data.message,
                            showIn: "form"

                        }
                    });
                }
                getPosts();
            } else {
                dispatch({
                    type: POST_MESSAGE, payload: {
                        category: "error",
                        text: res.data.message,
                        showIn: "form"

                    }
                });
            }


        } catch (error) {

            let text = handleResponseError(error)
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            });

        }
    }


    const insertImages = async (images, postId) => {

        let formattedData = new FormData();
        images.forEach((element) => {
            formattedData.append("postImages", element.file);
        });
        formattedData.append('id_publicacion', postId);
        try {
            const res = await axiosClient.post("/api/postImages/uploadImages", formattedData,
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
            formattedData.push(element.id_imagen_publicacion)
        })

        try {
            const res = await axiosClient.delete("/api/postImages", { data: { id_imagenes: formattedData } },
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

    const editPost = async (data, imagesInsert, imagesRemove) => {

        dispatch({
            type: TOGGLE_POSTS_LOADING,
            payload: true
        });

        let formattedData =
        {
            id_publicacion: data.postId,
            titulo: data.title,
            cuerpo: data.body


        }

        try {
            let res = await axiosClient.put("/api/post", formattedData);
            if (res.data.state) {

                let resImagesInsert = true;
                let resImagesRemove = true;

                if (imagesInsert.length !== 0) {
                    resImagesInsert = await insertImages(imagesInsert, data.postId);
                }

                if (imagesRemove.length !== 0) {
                    resImagesRemove = await removeImages(imagesRemove);

                }
                if (resImagesInsert && resImagesRemove) {

                    dispatch({
                        type: POST_MESSAGE, payload: {
                            category: "success",
                            text: res.data.message,
                            showIn: "edit"

                        }
                    });
                    getPosts();
                } else {
                    dispatch({
                        type: POST_MESSAGE, payload: {
                            category: "error",
                            text: "Los datos de la publicación se han actualizado satisfactoriamente, pero en las imágenes se ha presentado un error, intente actualizarlas de nuevo",
                            showIn: "edit"

                        }
                    });
                }

            } else {
                dispatch({
                    type: POST_MESSAGE, payload: {
                        category: "error",
                        text: res.data.message,
                        showIn: "edit"

                    }
                });
            }

        } catch (error) {

            let text = handleResponseError(error)
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "edit"
                }
            })
        }
    }

    const removePost = async (idPost) => {
        dispatch({
            type: TOGGLE_POSTS_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/post/" + idPost);

            dispatch({
                type: POST_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "detail"
                }
            })
            getPosts();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }

    const selectPost = (item) => {
        dispatch({ type: SELECT_POST, payload: item });
    }

    const handlePostMessage = (data) => {
        dispatch({
            type: POST_MESSAGE, payload: data
        })
    }

    return (
        <PostContext.Provider value={{
            posts: state.posts,
            loading: state.loading,
            selectedPost: state.selectedPost,
            message: state.message,
            getPosts,
            getPost,
            createPost,
            selectPost,
            removePost,
            editPost,
            handlePostMessage
        }}>
            {props.children}
        </PostContext.Provider>
    );
}
export default PostState;