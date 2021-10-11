import React, { useEffect, useState } from 'react'
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

import { FaUserCircle, FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import authToken from '../../config/authToken';
import axiosClient from '../../config/axios';
import './list.scss'

export default function List({ reloadList, removeEmployee, editEmployee }) {


    //employee list
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const request = async () => {

            try {
                setLoading(true);
                let token = localStorage.getItem("token");
                authToken(token);
                const res = await axiosClient.get("/api/employees");

                if (res.data.state) {
                    if (mounted) {

                        setList(res.data.data);
                    }
                } else {

                }

            } catch (error) {
                console.log(error);

            }
            if (mounted) {
                setLoading(false);
            }
        }


        request();

        return () => {
            mounted = false;
        }
    }, [reloadList]);


    return (
        <>
            <Snackbar open={errors} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', flex: 1, justifyContent: "center", flexDirection: "column", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
                <p style={{ marginLeft: 5 }}>Cargando ...</p>
            </Backdrop>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {list.map((element, index) =>

                    <EmployeeItem item={element} key={index} removeEmployee={removeEmployee} editEmployee={editEmployee} />
                )}
            </div>

        </>

    );
}


const EmployeeItem = ({ item, removeEmployee, editEmployee }) => {

    return (<div className="employee-card">
        <div className="employee-menu">
            <div className="left-options">
                <FaUserEdit size={30} color="#fff" cursor="pointer" onClick={() => { editEmployee(item) }} />
            </div>
            <div className="right-options">
                <FaTrashAlt size={25} color="#fff" onClick={() => { removeEmployee(item.id_empleado) }} cursor="pointer" />
            </div>
        </div>

        <div className="employee-logo">
            <FaUserCircle size={95} color="#fff" />
            {/* <img src="https://pp.userapi.com/c636820/v636820839/52b83/FsPXJoBIcDc.jpg" /> */}
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