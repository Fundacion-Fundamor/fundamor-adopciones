import React, { useEffect, useState, useContext } from 'react'
import { Button, Backdrop, CircularProgress, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';


import { FaUserCircle, FaTrashAlt, FaUserEdit } from 'react-icons/fa';

import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext';

export default function List() {
    const { employees, getEmployees, removeEmployee, selectEmployee, loading } = useContext(EmployeeContext);
    const [itemRemove, setItemRemove] = useState(null);
    const selectEmployeeRemove = (idEmployee) => {

        setItemRemove(idEmployee);
    }
    useEffect(() => {
        getEmployees();
    }, []);

    useEffect(() => {

        setItemRemove(null);

    }, [employees])

    return (
        <>
            {/* <Snackbar open={errors} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar> */}

            <div>
                <Dialog
                    open={itemRemove !== null}
                    onClose={() => { setItemRemove(null) }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Confirmación
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Está seguro que desea eliminar el empleado?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setItemRemove(null) }}>Cancelar</Button>
                        <Button onClick={() => removeEmployee(itemRemove)} autoFocus>
                            SÍ
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Backdrop
                sx={{ color: '#fff', flex: 1, justifyContent: "center", flexDirection: "column", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
                <p style={{ marginLeft: 5 }}>Cargando ...</p>
            </Backdrop>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {employees.map((element, index) =>

                    <EmployeeItem item={element} key={index} removeEmployee={selectEmployeeRemove} selectEmployee={selectEmployee} />
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