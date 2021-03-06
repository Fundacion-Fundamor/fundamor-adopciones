import React, { useReducer } from 'react';
import EmployeeContext from './employeeContext';
import EmployeeReducer from './employeeReducer';
import { EMPLOYEES, SELECT_EMPLOYEE, TOGGLE_EMPLOYEES_LOADING, EMPLOYEE_MESSAGE } from '../../types';
import axiosClient from '../../config/axios';
import { handleResponseError } from '../../Shared/utils';


/**maneja las peticiones crud asociadas a los empleados,
 * ademas de que almacena y globaliza el listado.
 * 
 * @param {*} props 
 * @returns 
 */
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

            let text = handleResponseError(error)

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
                }
            });

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
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getEmployees();

        } catch (error) {

    

            let text =handleResponseError(error)
            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
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
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "form"

                }
            })
            getEmployees();

        } catch (error) {
            let text = handleResponseError(error)

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "form"
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
                    category: res.data.state ? "success" : "error",
                    text: res.data.message,
                    showIn: "list"
                }
            })
            getEmployees();

        } catch (error) {

            let text = handleResponseError(error);

            dispatch({
                type: EMPLOYEE_MESSAGE, payload: {
                    category: "error",
                    text: text,
                    showIn: "list"
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