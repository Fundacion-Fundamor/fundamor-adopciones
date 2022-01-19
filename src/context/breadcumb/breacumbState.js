import React, { useReducer } from 'react';
import BreadCumbContext from './breadcumbContext';
import BreadCumbReducer from './breadcumbReducer';
import { SELECT_PAGE } from '../../types';


const BreadCumbState = props => {

    const initialState = {
        selectedIndex: 1

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(BreadCumbReducer, initialState);


    const selectPage = (index) => {

        dispatch({ type: SELECT_PAGE, payload: index })
    }

    return (
        <BreadCumbContext.Provider value={{
            currentPage: state.selectedIndex,
            selectPage

        }}>
            {props.children}
        </BreadCumbContext.Provider>

    );
}
export default BreadCumbState;