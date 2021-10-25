/* eslint-disable*/

import { ADOPTERS, SELECT_ADOPTER, TOGGLE_ADOPTERS_LOADING, ADOPTER_MESSAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case ADOPTERS:
            return {
                ...state,
                adopters: action.payload,
                loading: false

            }
        case TOGGLE_ADOPTERS_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case ADOPTER_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_ADOPTER:
            return {
                ...state,
                selectedAdopter: action.payload
            }
        default:
            return state;
    }
}