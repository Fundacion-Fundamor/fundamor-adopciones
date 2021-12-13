/* eslint-disable*/

import { POSTS, SELECT_POST, TOGGLE_POSTS_LOADING, POST_MESSAGE } from '../../types';

export default (state, action) => {

    switch (action.type) {
        case POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false

            }
        case TOGGLE_POSTS_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case POST_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        default:
            return state;
    }
}