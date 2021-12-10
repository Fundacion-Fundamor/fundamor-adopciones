import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import AdoptionContext from '../../context/adoption/adoptionContext';
import Form from '../tracking/Form';
import { Button, Modal, Box } from '@mui/material';
import ModalUpdate from './ModalUpdate';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function Detail() {


    const { message, loading, selectedAdoption, handleAdoptionMessage, getAdoption,removeAdoption } = useContext(AdoptionContext);// contexto de adopcion
    const [showFormTracking, setshowFormTracking] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    let { adoptionId } = useParams();
    const MySwal = withReactContent(Swal);

    let history = useHistory();
    useEffect(() => {
        getAdoption(adoptionId);
    }, [])

    const toggleModalTracking = () => {
        setshowFormTracking(!showFormTracking);
    }
    const toggleModalEdit = () => {
        setShowFormEdit(!showFormEdit);
    }
    const onRemoveAdoption = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar esta adopción?, se eliminarán las respuestas registradas del formulario y solo se eliminará el adoptante si no esta asociado a otros procesos de adopción.",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeAdoption(adoptionId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
        // let res = await MySwal.fire({
        //     title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
        //     text: "¿Está seguro que desea eliminar el animal?",
        //     icon: "question",
        //     confirmButtonText: 'Aceptar',
        //     showCancelButton: true,

        // });


        // if (res.isConfirmed) {
        //     // MySwal.close();
        //     await removeAnimal(animalId);
        // }

    }

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true,
            });


            if (res.isConfirmed) {

                await handleAdoptionMessage(null);
                if (message.category === "success") {
                    history.push("/adoptions");
                }
            }
        }
        if (message && message.showIn === "detail" && !loading) {

            displayAlert();
        }

    }, [message, loading]);

    return <div>
        {selectedAdoption ? <p>{JSON.stringify(selectedAdoption)}</p> : null}
        {loading ? <p>Cargando...</p> : null}
        <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => toggleModalTracking()}>Nuevo segumiento</Button>

        <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => toggleModalEdit()}>Editar</Button>
        <Button size="medium" variant="contained" color="error" sx={{ marginTop: 5 }} onClick={() => onRemoveAdoption()}>Eliminar adopción</Button>

        <Modal
            open={showFormTracking}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showFormTracking && <Form handleModal={toggleModalTracking} adoptionID={adoptionId} />}
            </Box>


        </Modal>

        <Modal
            open={showFormEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showFormEdit && <ModalUpdate handleModal={toggleModalEdit} adoptionId={selectedAdoption.id_adopcion} adoptionState={selectedAdoption.estado} observations={selectedAdoption.observaciones} finalDate={selectedAdoption.fecha_entrega} />}
            </Box>

        </Modal>
    </div>
}