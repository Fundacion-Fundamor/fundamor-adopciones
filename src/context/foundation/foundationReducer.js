/* eslint-disable*/

import { TOGGLE_FOUNDATION_LOADING, FOUNDATION_MESSAGE, GET_FOUNDATION } from '../../types';

export default (state, action) => {

    switch (action.type) {

        case TOGGLE_FOUNDATION_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case FOUNDATION_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case GET_FOUNDATION:
            return {
                ...state,
                currentFoundation: action.payload,
                loading: false
            }
        default:
            return state;
    }
}