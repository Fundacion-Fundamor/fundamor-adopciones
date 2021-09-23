import React from 'react'
import List from '../../components/employees/List';
import './employee.scss'

import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import Form from '../../components/employees/Form';



export default function Employeee() {

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
            console.log(res.data);
            return res.data.message;
        } catch (error) {

        }

        return false;

    }


    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <Form saveEmployee={saveEmployee} />

            <div>
                <List />
            </div>
        </div >);
}