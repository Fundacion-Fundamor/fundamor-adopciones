/* eslint-disable*/

import { QUESTIONS, SELECT_QUESTION, SELECT_QUESTION_EDIT, UNSELECT_QUESTION, TOGGLE_QUESTION_LOADING, QUESTION_MESSAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case QUESTIONS:
            return {
                ...state,
                questions: action.payload,
                loading: false

            }
        case TOGGLE_QUESTION_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case QUESTION_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_QUESTION:
            let tmp = { ...state.selectedQuestions };
            tmp.push(action.payload);
            return {
                ...state,
                selectedQuestions: tmp
            }

        case SELECT_QUESTION_EDIT:

            return {
                ...state,
                message:null,
                selectedQuestion: action.payload
            }
        case UNSELECT_QUESTION:
            let res = state.selectedQuestions.filter(element => (element.id_opcion_pregunta !== data.payload));

            return {
                ...state,
                selectedQuestions: res
            }
        default:
            return state;
    }
}