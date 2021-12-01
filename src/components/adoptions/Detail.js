import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router';
import AdoptionContext from '../../context/adoption/adoptionContext';
import Form from '../tracking/Form';
import { Button, Modal, Box } from '@mui/material';




export default function Detail() {


    const { message, loading, selectedAdoption, handleAdoptionMessage, getAdoption } = useContext(AdoptionContext);// contexto de adopcion
    const [showForm, setShowForm] = useState(false)
    let { adoptionId } = useParams();
    useEffect(() => {
        getAdoption(adoptionId);
    }, [])

    const handleToggle = () => {
        setShowForm(!showForm);
    }

    return <div>
        {selectedAdoption ? <p>{JSON.stringify(selectedAdoption)}</p> : null}
        {loading ? <p>Cargando...</p> : null}
        <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => handleToggle()}>Nuevo segumiento</Button>
        <Modal
            open={showForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showForm && <Form handleModal={handleToggle} adoptionID={adoptionId} />}
            </Box>
        </Modal>
    </div>
}