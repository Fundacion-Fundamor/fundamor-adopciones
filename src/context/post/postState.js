import React, { useReducer } from 'react';
import PostContext from './postContext';
import PostReducer from './postReducer';
import { POSTS, SELECT_POST, TOGGLE_POSTS_LOADING, POST_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';


        //TODO falta el ID para que actualice



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
            });

        }

    }


    /**Funcion para crear posts
     * 
     * @param {*} data 
     */
    const createPost = async (data) => {
        



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
            console.log(res)
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"
                }
            })
            getPosts();

        } catch (error) {

            let errorDescriptions = error.response?.data.errors;

            let text = "";
            if (errorDescriptions) {
                text = errorDescriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: POST_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const editPost = async (data, edit = false) => {

        dispatch({
            type: TOGGLE_POSTS_LOADING,
            payload: true
        });
        const formattedData = {
            id_publicacion: data.ID,
            titulo: data.name,
            cuerpo: data.cuerpo
        }

        // console.log(formattedData);
        try {
            let res = await axiosClient.put("/api/post", formattedData);
            dispatch({
                type: POST_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"

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
                    showIn: "form"
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
                    showIn: "list"
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