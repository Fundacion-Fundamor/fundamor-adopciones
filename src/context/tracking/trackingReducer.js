/* eslint-disable*/

import { TRACKINGS, SELECT_TRACKING, TOGGLE_TRACKINGS_LOADING, TRACKING_MESSAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case TRACKINGS:
            return {
                ...state,
                trackings: action.payload,
                loading: false

            }
        case TOGGLE_TRACKINGS_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case TRACKING_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_TRACKING:
            return {
                ...state,
                selectedTracking: action.payload
            }
        default:
            return state;
    }
}