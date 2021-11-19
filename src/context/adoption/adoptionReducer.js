/* eslint-disable*/

import { ADOPTIONS, SELECT_ADOPTION, TOGGLE_ADOPTION_LOADING, ADOPTION_MESSAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case ADOPTIONS:
            return {
                ...state,
                adoptions: action.payload,
                loading: false

            }
        case TOGGLE_ADOPTION_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case ADOPTION_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_ADOPTION:
            //TODO: falta que el backend devuelva las preguntas, el adoptante,seguimientos y el empleado y validar la estructura
            return {
                ...state,
                selectedAdoption: action.payload.adopcion,
                animal: action.payload.adopcion.animal,
                adopter: action.payload.adopcion.adoptante,
                employee: action.payload.adopcion.empleado,
                trackings: action.payload.adopcion.segumientos

            }
        default:
            return state;
    }
}