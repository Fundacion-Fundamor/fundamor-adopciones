import React, { useState } from 'react'
import List from '../../components/employees/List';
import './employee.scss'

import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import Form from '../../components/employees/Form';
import { Alert, Backdrop, Button, Snackbar } from '@mui/material';



export default function Employeee() {

    const [errors, setErrors] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [reloadList, setReloadList] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    }
    const saveEmployee = async (correo, contrasenia, nombre, rol, id_empleado) => {


        let formattedData = {
            correo,
            contrasenia,
            nombre,
            rol,
            id_empleado: id_empleado
        };
        try {
            let token = localStorage.getItem("token");
            authToken(token);

            const res = await axiosClient.post("/api/employees", formattedData);
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
            <Backdrop
                sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showForm}

            >
                {showForm && <Form saveEmployee={saveEmployee} handleToggle={handleToggle} />}
            </Backdrop>


            <div>
                <List reloadList={reloadList} />
            </div>
        </div >);
}