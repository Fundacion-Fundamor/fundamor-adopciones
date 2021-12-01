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

            let tmpData = {
                estado: action.payload.estado,
                fecha_entrega: action.payload.fecha_entrega,
                fecha_estudio: action.payload.fecha_estudio,
                id_adopcion: action.payload.id_adopcion,
                observaciones: action.payload.observaciones ?? "",
                animal: action.payload.animal,
                adoptante: action.payload.adopter,
                empleado: action.payload.employee,
                preguntas: null,
                seguimientos: action.payload.tracking
            }
            return {
                ...state,
                loading: false,
                message: null,
                selectedAdoption: tmpData,


            }
        default:
            return state;
    }
}