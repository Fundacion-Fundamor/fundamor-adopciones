import React, { useReducer } from 'react';
import EmployeeContext from './employeeContext';
import EmployeeReducer from './employeeReducer';
import { EMPLOYEES, SELECT_EMPLOYEE, TOGGLE_EMPLOYEES_LOADING, EMPLOYEE_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';

const EmployeeState = props => {

    const initialState = {
        employees: [],
        message: null,
        loading: false,
        selectedEmployee: null

    }

    //crea el dispatch y el state
    const [state, dispatch] = useReducer(EmployeeReducer, initialState);

    //funciones que modifican el state

    const getEmployees = async () => {

        try {
            dispatch({
                type: TOGGLE_EMPLOYEES_LOADING,
                payload: true
            });
            const res = await axiosClient.get("/api/employees");

            if (res.data.state) {
                dispatch({
                    type: EMPLOYEES,
                    payload: res.data.data
                });
            } else {
                dispatch({
                    type: EMPLOYEES,
                    payload: []
                });
            }

        } catch (error) {
            console.log(error);

        }

    }


    /**Funcion para crear empleados
     * 
     * @param {*} data 
     */
    const createEmployee = async (data) => {

        dispatch({
            type: TOGGLE_EMPLOYEES_LOADING,
            payload: true
        });
        let formattedData = {
            correo: data.email,
            contrasenia: data.password,
            nombre: data.name,
            rol: data.role,
            id_empleado: data.ID
        }
        try {
            const res = await axiosClient.post("/api/employees", formattedData);
            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message
                }
            })
            getEmployees();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text
                }
            })
        }
    }

    const editEmployee = async (data, edit = false) => {

        dispatch({
            type: TOGGLE_EMPLOYEES_LOADING,
            payload: true
        });
        let formattedData = {};

        if (!edit || data.enablePassword) {
            formattedData = {
                correo: data.email,
                contrasenia: data.password,
                nombre: data.name,
                rol: data.role,
                id_empleado: data.ID
            }
        } else {
            formattedData = {
                correo: data.email,
                nombre: data.name,
                rol: data.role,
                id_empleado: data.ID
            }
        }


        try {
            let res = await axiosClient.put("/api/employees", formattedData);
            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message
                }
            })
            getEmployees();

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text
                }
            })
        }
    }

    const removeEmployee = async (idEmployee) => {

        dispatch({
            type: TOGGLE_EMPLOYEES_LOADING,
            payload: true
        });
        try {
            let res = await axiosClient.delete("/api/employees/" + idEmployee);

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "success",
                    text: res.data.message
                }
            })
            getEmployees();

        } catch (error) {

            let errorsDecriptions = error.response?.data.errors;
            let text = "";
            if (errorsDecriptions) {
                text = errorsDecriptions[0];
            } else {
                text = error.response.data.message;
            }

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text
                }
            })
        }
    }

    const selectEmployee = (item) => {

        dispatch({ type: SELECT_EMPLOYEE, payload: item });
    }
    const handleEmployeeMessage = (data) => {
        dispatch({
            type: EMPLOYEE_MESSAGE, payload: data
        })
    }
    return (
        <EmployeeContext.Provider value={{
            employees: state.employees,
            loading: state.loading,
            selectedEmployee: state.selectedEmployee,
            message: state.message,
            getEmployees,
            createEmployee,
            selectEmployee,
            removeEmployee,
            editEmployee,
            handleEmployeeMessage
        }}>
            {props.children}
        </EmployeeContext.Provider>

    );
}
export default EmployeeState;