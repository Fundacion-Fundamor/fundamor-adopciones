/* eslint-disable*/

import { EMPLOYEES, SELECT_EMPLOYEE, TOGGLE_EMPLOYEES_LOADING, EMPLOYEE_MESSAGE } from '../../types';

export default (state, action) => {

    console.log(action)
    switch (action.type) {
        case EMPLOYEES:
            return {
                ...state,
                employees: action.payload,
                loading: false

            }
        case TOGGLE_EMPLOYEES_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case EMPLOYEE_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false
            }
        case SELECT_EMPLOYEE:
            return {
                ...state,
                selectedEmployee: action.payload
            }
        default:
            return state;
    }
}