import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router';
import AdoptionContext from '../../context/adoption/adoptionContext';
import Form from '../tracking/Form';
import { Button, Modal, Box } from '@mui/material';
import ModalUpdate from './ModalUpdate';




export default function Detail() {


    const { message, loading, selectedAdoption, handleAdoptionMessage, getAdoption } = useContext(AdoptionContext);// contexto de adopcion
    const [showFormTracking, setshowFormTracking] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    let { adoptionId } = useParams();
    useEffect(() => {
        getAdoption(adoptionId);
    }, [])

    const toggleModalTracking = () => {
        setshowFormTracking(!showFormTracking);
    }
    const toggleModalEdit = () => {
        setShowFormEdit(!showFormEdit);
    }

    return <div>
        {selectedAdoption ? <p>{JSON.stringify(selectedAdoption)}</p> : null}
        {loading ? <p>Cargando...</p> : null}
        <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => toggleModalTracking()}>Nuevo segumiento</Button>

        <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => toggleModalEdit()}>Editar</Button>
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