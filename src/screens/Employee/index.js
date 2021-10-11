import React, { useState, useEffect } from 'react'
import List from '../../components/employees/List';
import './employee.scss'

import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import Form from '../../components/employees/Form';
import { Backdrop, Button, Snackbar, Modal, Box } from '@mui/material';



export default function Employeee() {

    const [errors, setErrors] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(null);
    const [reloadList, setReloadList] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    }
    const saveEmployee = async (data, edit = false) => {


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
            let token = localStorage.getItem("token");
            authToken(token);

            let res = null;

            if (!edit) {
                res = await axiosClient.post("/api/employees", formattedData);
            } else {
                res = await axiosClient.put("/api/employees", formattedData);

            }

            if (res.data.state) {
                setReloadList(!reloadList);
            }

            return {
                state: res.data.state, msg: res.data.message
            };

        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            if (errorsDecriptions) {
                return { state: false, msg: errorsDecriptions[0] };
            } else {
                //como muestro el mensaje de token invalido

                // setErrors(error.response.data.message);
                return {
                    state: false, msg: error.response.data.message
                };
            }

        }

    }




    const removeEmployee = async (idEmployee) => {

        try {
            let token = localStorage.getItem("token");
            authToken(token);

            const res = await axiosClient.delete("/api/employees/" + idEmployee);
            if (res.data.state) {

                setReloadList(!reloadList);
            }
            console.log(res.data);


        } catch (error) {
            let errorsDecriptions = error.response?.data.errors;

            if (errorsDecriptions) {
                return { state: false, msg: errorsDecriptions[0] };
            } else {
                //como muestro el mensaje de token invalido

                // setErrors(error.response.data.message);
                return {
                    state: false, msg: error.response.data.message
                };
            }

        }

    }

    const handleEmployee = (employee) => {
        setFormData(employee);
    }

    useEffect(() => {

        if (!showForm) {

            setFormData(null);
        }

    }, [showForm]);

    useEffect(() => {

        if (formData) {
            setShowForm(!showForm);
        }

    }, [formData]);


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

            >
                <Box sx={{ display: "flex", justifyContent: "center" }}  >
                    {showForm && <Form saveEmployee={saveEmployee} handleToggle={handleToggle} employee={formData} />}

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
                <List reloadList={reloadList} removeEmployee={removeEmployee} editEmployee={handleEmployee} />
            </div>
        </div >);
}