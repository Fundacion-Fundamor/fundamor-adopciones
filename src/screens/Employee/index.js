import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/employees/List';
import './employee.scss'

import Form from '../../components/employees/Form';
import { Backdrop, Button, Snackbar, Modal, Box } from '@mui/material';
import EmployeeContext from '../../context/employee/employeeContext';



export default function Employeee() {
    const { selectedEmployee, selectEmployee, handleEmployeeMessage } = useContext(EmployeeContext);

    const [errors, setErrors] = useState(null);
    const [showForm, setShowForm] = useState(false);


    const handleToggle = () => {
        setShowForm(!showForm);
    }

    useEffect(() => {

        if (!showForm) {

            selectEmployee(null);
            handleEmployeeMessage(null);
        }

    }, [showForm]);

    useEffect(() => {

        if (selectedEmployee) {
            setShowForm(!showForm);
        }
    }, [selectedEmployee]);


    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
            <Snackbar sx={{
                color: 'success.main',
            }} open={errors != null} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} message={errors}>
                {/* <Alert severity="success" sx={{ width: '100%' }}>
                    {errors}
                </Alert> */}

            </Snackbar>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 15,
                    marginBottom: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: 942

                }}
            >
                <h1>Gestiona el acceso a la plataforma de adopción</h1>
                <Button onClick={handleToggle}>Agregar colaborador</Button>
            </div>

            <Modal
                open={showForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflowY: "scroll" }}

            >
                <Box sx={{ display: "flex", justifyContent: "center" }}  >
                    {showForm && <Form handleToggle={handleToggle} />}

                </Box>
            </Modal>
            {/* <Backdrop
                sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showForm}
                scroll="body"
            > */}
            {/* {showForm && <Form saveEmployee={saveEmployee} handleToggle={handleToggle} />} */}
            {/* </Backdrop> */}

            <div>
                <List />
            </div>
        </div >);
}