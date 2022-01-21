/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    useTheme,
    Avatar,
    Stack,
    Button,
} from '@mui/material'

import { FaTrashAlt, FaUserCircle, FaUserEdit } from 'react-icons/fa'
import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


/**
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
                maxWidth: 305, padding: 2, borderRadius: theme.custom.borderRadius, margin: '0.8rem',
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                borderTopWidth: 8,
                borderTopStyle: "solid",
                borderTopColor: theme.custom.primary.light,
                boxShadow: "0px 9px 19px -4px rgb(106 59 0 / 15%)"

            }}
        >
            <CardContent>
                <Stack direction={"row"}>
                    <Avatar
                        src="/images/worker.png"

                        sx={{ width: 66, height: 66 }}
                    >
                        <FaUserCircle size={30} />
                    </Avatar>
                    <Stack direction={"column"} ml={2}>
                        <Typography variant="h5" fontWeight={800} color={"#0a303a"} component="div" sx={{ textTransform: "capitalize" }}>
                            {item.nombre}
                        </Typography>
                        <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary" gutterBottom>
                            {item.rol !== '' ? item.rol : 'No registra'}
                        </Typography>
                    </Stack>
                </Stack>




                {/* <div>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.correo}
                    </Typography>
                </div> */}
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: "space-around", mt: 2 }}>


                <Button size="medium" variant="outlined" color="primary" sx={{ fontSize: 11, borderRadius: "8px" }}
                    onClick={() => {
                        selectEmployee(item)
                    }}
                    startIcon={<FaUserEdit />}
                >Editar</Button>
                <Button size="medium" variant="outlined" color="error" sx={{ fontSize: 11, borderRadius: "8px" }}
                    startIcon={<FaTrashAlt />}
                    onClick={() => {
                        removeEmployee(item.id_empleado)
                    }}
                >Eliminar</Button>

            </CardActions>
        </Card>
    )
}
