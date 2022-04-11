import React, { useReducer } from 'react';
import QuestionContext from './questionContext';
import QuestionReducer from './questionReducer';
import { QUESTIONS, SELECT_QUESTION, UNSELECT_QUESTION, TOGGLE_QUESTION_LOADING, QUESTION_MESSAGE, SELECT_QUESTION_EDIT } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from "../../Shared/utils"


/**maneja las peticiones crud asociadas a las preguntas de adopción,
 * ademas de que almacena y globaliza el listado.
 * 
 * @param {*} props 
 * @returns 
 */
const QuestionState = props => {

    const initialState = {
        questions: [],
        message: null,
        loading: false,
        selectedQuestions: [],
        selectedQuestion: null, //for editing

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(QuestionReducer, initialState);

    //funciones que modifican el state

    const getQuestions = async () => {

        try {
            dispatch({
                type: TOGGLE_QUESTION_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/questions");

            if (res.data.state) {
                dispatch({
                    type: QUESTIONS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: QUESTIONS,
                    payload: []
                });
            }

        } catch (error) {

            let text = handleResponseError(error)

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }



    const createQuestion = async (data) => {

        dispatch({
            type: TOGGLE_QUESTION_LOADING,
            payload: true
        });
        let formattedData = {
            titulo: data.title,
            tipo_pregunta: data.questionType,
            opciones_pregunta: data.questionOptions.length === 0 ? null : data.questionOptions
        }
        try {
            const res = await axiosClient.post("/api/questions", formattedData);

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"
                }
            })


        } catch (error) {

            let text = handleResponseError(error)

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const editQuestion = async (data, questionOptions, questionOptionsRemove) => {


        let newOptions = [];
        let updateOptions = [];
        let removeOptions = [];


        questionOptions.forEach(element => {

            if (element.id === "") {
                newOptions.push({
                    id_pregunta: data.questionID,
                    descripcion: element.text,
                });
            } else {
                newOptions.push({
                    id_pregunta: data.questionID,
                    descripcion: element.text,
                    id_opcion: element.id
                });
            }
        });

        questionOptionsRemove.forEach(element => {
            if (element.id !== "") {

                removeOptions.push(element.id);
            }
        });

        dispatch({
            type: TOGGLE_QUESTION_LOADING,
            payload: true
        });

        let formattedData = {
            id_pregunta: data.questionID,
            titulo: data.title,
            tipo_pregunta: (newOptions.length > 0 || updateOptions.length > 0) ? "multiple" : "abierta"
        }


        try {

            let resEdit = await axiosClient.put("/api/questions", formattedData);
            if (resEdit.data.state) {
                let resInsert = { data: { state: true } };
                if (newOptions.length !== 0) {
                    resInsert = await axiosClient.post("/api/questionOptions", { opciones: newOptions });
                }
                let resRemove = {
                    data: { state: true }
                };
                if (removeOptions.length !== 0) {
                    resRemove = await axiosClient.delete("/api/questionOptions", { data: { ids_opciones: removeOptions } });

                }

                if (resInsert.data.state && resRemove.data.state) {

                    dispatch({
                        type: QUESTION_MESSAGE, payload: {
                            category: "success",
                            text: "La pregunta se ha actualizado exitosamente",
                            showIn: "list"

                        }
                    })
                }
            } else {
                dispatch({
                    type: QUESTION_MESSAGE, payload: {
                        category: "error",
                        text: resEdit.data.message,
                        showIn: "detail"

                    }
                })
            }


            getQuestions();

        } catch (error) {

            let text = handleResponseError(error);

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "detail"
                }
            })
        }
    }

    const removeQuestion = async (questionID) => {

        dispatch({
            type: TOGGLE_QUESTION_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/questions/" + questionID);

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getQuestions();

        } catch (error) {
            let text = handleResponseError(error);

            dispatch({
                type: QUESTION_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }

    const selectQuestion = (item) => {

        dispatch({ type: SELECT_QUESTION, payload: item });
    }
    const selectQuestionEdit = (item) => {

        dispatch({ type: SELECT_QUESTION_EDIT, payload: item });
    }
    const unselectQuestion = (item) => {

        dispatch({ type: UNSELECT_QUESTION, payload: item.id_opcion_pregunta });
    }
    const handleQuestionMessage = (data) => {
        dispatch({
            type: QUESTION_MESSAGE, payload: data
        })
    }
    return (
        <QuestionContext.Provider value={{
            questions: state.questions,
            loading: state.loading,
            selectedQuestions: state.selectedQuestions,
            selectedEditQuestion: state.selectedQuestion,
            message: state.message,
            getQuestions,
            createQuestion,
            selectQuestion,
            selectQuestionEdit,
            unselectQuestion,
            removeQuestion,
            editQuestion,
            handleQuestionMessage
        }}>
            {props.children}
        </QuestionContext.Provider>

    );
}
export default QuestionState;