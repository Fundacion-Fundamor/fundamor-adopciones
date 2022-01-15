/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    useTheme,
} from '@mui/material'

import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'
import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { grey } from '@mui/material/colors'


/**Configurar el clamp del correo
 * 
 * @returns 
 */
export default function List() {
    const {
        employees,
        getEmployees,
        removeEmployee,
        selectEmployee,
        loading,
        message,
        handleEmployeeMessage

    } = useContext(EmployeeContext);

    const MySwal = withReactContent(Swal);


    const selectEmployeeRemove = async (idEmployee) => {
        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar este colaborador?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            cancelButtonText: "Cancelar",
            backdrop: true,
            preConfirm: async (response) => {

                await removeEmployee(idEmployee);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
    }


    useEffect(() => {
        getEmployees()
    }, [])


    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true

            });


            if (res.isConfirmed) {
                await handleEmployeeMessage(null);
            }
        }
        if (message && message.showIn === "list" && !loading) {

            displayAlert();
        }
    }, [message, loading])

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                margin: '0 5%',
            }}
        >
            {employees.map((element, index) => (
                <EmployeeItem
                    item={element}
                    key={index}
                    removeEmployee={selectEmployeeRemove}
                    selectEmployee={selectEmployee}
                />
            ))}
        </div>

    )
}

const EmployeeItem = ({ item, removeEmployee, selectEmployee }) => {


    const theme = useTheme();
    return (
        <Card
            variant="outlined"
            sx={{
                width: 275, padding: 2, borderRadius: theme.custom.borderRadius, margin: '0.8rem',
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                borderTopWidth: 8,
                borderTopStyle: "solid",
                borderColor: theme.custom.primary.dark
            }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary" gutterBottom>
                    {item.rol !== '' ? item.rol : 'No registra'}
                </Typography>


                <Typography variant="h5" fontWeight={600} color={grey[600]} component="div" sx={{ textTransform: "capitalize" }}>
                    {item.nombre}
                </Typography>
                <div>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.correo}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Editar colaborador"

                    sx={{
                        color: theme.palette.primary.light
                    }}
                    onClick={() => {
                        selectEmployee(item)
                    }}>
                    <FaUserEdit
                        size={30}
                        cursor="pointer"

                    />
                </IconButton>
                <IconButton aria-label="Eliminar colaborador"

                    sx={{
                        color: theme.palette.primary.light
                    }}
                    onClick={() => {
                        removeEmployee(item.id_empleado)
                    }}>
                    <FaTrashAlt
                        size={25}

                        cursor="pointer"
                    />
                </IconButton>
            </CardActions>
        </Card>
    )
}
