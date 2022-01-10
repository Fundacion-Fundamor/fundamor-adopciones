/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, CircularProgress, Typography, Modal, Box, Card, useTheme, useMediaQuery, CardActions, Tooltip, IconButton, Button, Stack, Divider } from '@mui/material';

import React, { useContext, useState, useEffect } from 'react';
import EditModal from '../../components/questions/EditModal';
import Form from '../../components/questions/Form';
import QuestionList from '../../components/questions/List';
import QuestionContext from '../../context/question/questionContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BiHelpCircle } from 'react-icons/bi';
import { grey } from '@mui/material/colors';


/**Gestion de preguntas involucradas al momento de crear una adopción
 * 
 * @returns 
 */
export default function Question() {

    const { loading, message, selectQuestionEdit, selectedEditQuestion, handleQuestionMessage, getQuestions } = useContext(QuestionContext);
    const [showForm, setShowForm] = useState(false);

    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));


    const MySwal = withReactContent(Swal);
    const handleToggle = () => {
        setShowForm(!showForm);
    }


    useEffect(() => {
        if (!showForm) {
            selectQuestionEdit(null);

        }
    }, [showForm]);

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true

            });


            if (res.isConfirmed) {

                await handleQuestionMessage(null);
                if (message.category === "success") {
                    getQuestions();
                }
            }
        }
        if (message && !loading) {

            displayAlert();
        }
    }, [message, loading])

    useEffect(() => {
        if (selectedEditQuestion) {
            setShowForm(!showForm)
        }
    }, [selectedEditQuestion]);

    return (

        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
                    <Box alignItems={"center"} display={"flex"}>
                        <Tooltip title="Gestiona las preguntas para evaluar a tus adoptantes, estas preguntas deberán ser contestadas al momento de crear una nueva adopción">
                            <IconButton>
                                <BiHelpCircle />
                            </IconButton>

                        </Tooltip>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Preguntas de adopción
                        </Typography>


                    </Box>

                </CardActions>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius }} >

                {/* <Stack direction={"row"} padding={3}>
                    <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600], fontSize: 16 }} >
                        Nueva pregunta
                    </Typography>
                </Stack>
                <Divider /> */}


                <Form />

                {/* <Stack padding={3}>
                    <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 16, color: grey[600] }} >
                        Preguntas registradas
                    </Typography>
                </Stack>
                <Divider style={{ marginTop: 2, marginBottom: 2 }} /> */}

                <Divider />
                <QuestionList />
            </Card>


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
        </Box>

    )

}

