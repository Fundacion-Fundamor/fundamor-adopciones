import React, { useEffect, useState, useContext } from 'react'
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

import { FaUserCircle, FaTrashAlt, FaUserEdit } from 'react-icons/fa';

import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext';

export default function List() {
    const { getEmployees, removeEmployee, selectEmployee, employees, loading } = useContext(EmployeeContext);
    // const [errors, setErrors] = useState(null);

    useEffect(() => {
        getEmployees();
    }, []);


    return (
        <>
            {/* <Snackbar open={errors} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar> */}
            <Backdrop
                sx={{ color: '#fff', flex: 1, justifyContent: "center", flexDirection: "column", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
                <p style={{ marginLeft: 5 }}>Cargando ...</p>
            </Backdrop>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {employees.map((element, index) =>

                    <EmployeeItem item={element} key={index} removeEmployee={removeEmployee} selectEmployee={selectEmployee} />
                )}
            </div>

        </>

    );
}


const EmployeeItem = ({ item, removeEmployee, selectEmployee }) => {

    return (<div className="employee-card">
        <div className="employee-menu">
            <div className="left-options">
                <FaUserEdit size={30} color="#fff" cursor="pointer" onClick={() => { selectEmployee(item) }} />
            </div>
            <div className="right-options">
                <FaTrashAlt size={25} color="#fff" onClick={() => { removeEmployee(item.id_empleado) }} cursor="pointer" />
            </div>
        </div>

        <div className="employee-logo">
            <FaUserCircle size={95} color="#fff" />
        </div>
        <div className="employee-info">
            <h2>{item.nombre}</h2>
            <h3>{item.correo}</h3>
        </div>
        <div className="employee-role">
            <p>{item.rol !== "" ? item.rol : "No registra"}</p>
        </div>
        <div className="employee-footer">

        </div>
    </div>);
}