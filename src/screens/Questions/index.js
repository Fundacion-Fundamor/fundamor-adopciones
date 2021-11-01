import { Alert, Backdrop, CircularProgress, Container, Typography, Modal, Box } from '@mui/material';

import React, { useContext, useState, useEffect } from 'react';
import EditModal from '../../components/questions/EditModal';
import Form from '../../components/questions/Form';
import QuestionList from '../../components/questions/List';
import QuestionContext from '../../context/question/questionContext';

export default function Question() {
    const { loading, message, selectQuestionEdit, selectedEditQuestion, handleQuestionMessage } = useContext(QuestionContext);
    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    }


    useEffect(() => {
        if (!showForm) {
            selectQuestionEdit(null);
            handleQuestionMessage(null);
        }
    }, [showForm])
    useEffect(() => {
        if (selectedEditQuestion) {
            setShowForm(!showForm)
        }
    }, [selectedEditQuestion]);

    return <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFF", height: "100%" }}>
        <Typography variant="h5" component="div" marginTop={5}>
            Gestiona las preguntas para evaluar a tus adoptantes
        </Typography>
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

        <Modal
            open={showForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: 'scroll' }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {showForm && <EditModal handleToggle={handleToggle} />}
            </Box>
        </Modal>
        <Form />
        {message && message.showIn === "list" && <Alert severity={message.category} variant="filled" style={{ marginTop: 20 }} >{message.text}</Alert>}

        <QuestionList />

    </Container>

}

