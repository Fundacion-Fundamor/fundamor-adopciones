import { Container, Typography } from '@mui/material';

import React from 'react';
import Form from '../../components/questions/Form';
import QuestionList from '../../components/questions/List';

export default function Question() {

    return <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFF", height: "100%" }}>
        <Typography variant="h5" component="div" marginTop={5}>
            Registra las preguntas para evaluar a tus adoptantes
        </Typography>

        <Form />

        <QuestionList />

    </Container>

}

