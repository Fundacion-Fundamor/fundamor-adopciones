import React, { useReducer } from 'react';
import TrackingContext from './trackingContext';
import TrackingReducer from './trackingReducer';
import { TRACKINGS, SELECT_TRACKING, TOGGLE_TRACKING_LOADING, TRACKING_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';



/**maneja las peticiones crud asociadas a los seguimientos,
 * ademas de que almacena y globaliza el listado.
 * 
 * @param {*} props 
 * @returns 
 */
const TrackingState = props => {

    const initialState = {
        trackings: [],
        message: null,
        loading: false,
        selectedTracking: null

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(TrackingReducer, initialState);

    //funciones que modifican el state

    const getTrackings = async (adoptionId) => {

        try {
            dispatch({
                type: TOGGLE_TRACKING_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/tracking/" + adoptionId);

            if (res.data.state) {
                dispatch({
                    type: TRACKINGS,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: TRACKINGS,
                    payload: []
                });
            }

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: TRACKING_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

        }

    }


    const createTracking = async (data) => {

        dispatch({
            type: TOGGLE_TRACKING_LOADING,
            payload: true
        });
        let formattedData = {
            id_adopcion: data.adoptionID,
            anotaciones: data.annotation,

        }
        try {
            const res = await axiosClient.post("/api/tracking", formattedData);
            dispatch({
                type: TRACKING_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getTrackings(data.adoptionID);

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: TRACKING_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
                }
            })
        }
    }

    const removeTracking = async (idTracking) => {

        dispatch({
            type: TOGGLE_TRACKING_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/tracking/" + idTracking);

            dispatch({
                type: TRACKING_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getTrackings();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: TRACKING_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            })
        }
    }

    const selectTracking = (item) => {

        dispatch({ type: SELECT_TRACKING, payload: item });
    }
    const handleTrackingMessage = (data) => {
        dispatch({
            type: TRACKING_MESSAGE, payload: data
        })
    }
    return (
        <TrackingContext.Provider value={{
            trackings: state.trackings,
            loading: state.loading,
            selectedTracking: state.selectedTracking,
            message: state.message,
            getTrackings,
            createTracking,
            selectTracking,
            removeTracking,
            handleTrackingMessage
        }}>
            {props.children}
        </TrackingContext.Provider>

    );
}
export default TrackingState;