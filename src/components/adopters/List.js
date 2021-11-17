import React, { useEffect, useContext } from 'react'
import {

    Backdrop,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
} from '@mui/material'

import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import './list.scss'
import AdopterContext from '../../context/adopter/adopterContext'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function List() {
    const {
        adopters,
        getAdopters,
        removeAdopter,
        selectAdopter,
        loading,
        message,
        handleAdopterMessage
    } = useContext(AdopterContext);

    const MySwal = withReactContent(Swal);

 
    const selectAdopterRemove = async (idAdopter) => {
        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar este colaborador?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeAdopter(idAdopter);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
    }


    useEffect(() => {
        getAdopters()
    }, [])

    
    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop:true

            });


            if (res.isConfirmed) {
                await handleAdopterMessage(null);
            }
        }
        if (message && message.showIn === "list" && !loading) {

            displayAlert();
        }
    }, [message,loading])

    return (
        <>  
            <Backdrop
                sx={{
                    color: '#fff',
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
                <p style={{ marginLeft: 5 }}>Cargando ...</p>
            </Backdrop>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    margin: '0 5%',
                }}
            >
                {adopters.map((element, index) => (
                    <AdopterItem
                        item={element}
                        key={index}
                        removeAdopter={selectAdopterRemove}
                        selectAdopter={selectAdopter}
                    />
                ))}
            </div>
        </>
    )
}

const AdopterItem = ({ item, removeAdopter, selectAdopter }) => {
    return (
        <Card
            sx={{ maxWidth: 275, padding: 2, borderRadius: '4px', margin: '0.8rem' }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.rol !== '' ? item.rol : 'No registra'}
                </Typography>

                <Typography variant="h5" component="div">
                    {item.nombre}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.correo}
                </Typography>
                <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {
                    selectAdopter(item)
                }}>
                    <FaUserEdit
                        size={30}
                        cursor="pointer"

                    />
                </IconButton>
                <IconButton aria-label="share" onClick={() => {
                    removeAdopter(item.id_adoptante)
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
