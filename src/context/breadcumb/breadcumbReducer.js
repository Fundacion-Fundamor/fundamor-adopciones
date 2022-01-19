/* eslint-disable import/no-anonymous-default-export */
import { SELECT_PAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case SELECT_PAGE:
            return {
                ...state,
                selectedIndex: action.payload,
            }
        default:
            return state;
    }
}