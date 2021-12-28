import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import AdoptionContext from '../../context/adoption/adoptionContext';
import Form from '../tracking/Form';
import { Button, Modal, Box, CardActions, Card, Tooltip, IconButton, Typography, useTheme, useMediaQuery, CardContent, Tabs, Tab, Divider, Chip, Stack } from '@mui/material';
import ModalUpdate from './ModalUpdate';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BiHelpCircle } from 'react-icons/bi';
import { IoDocumentTextOutline, IoNewspaperOutline, IoTimerOutline } from "react-icons/io5"
import { grey } from '@mui/material/colors';
import { GrDocumentUser } from 'react-icons/gr';
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlineReload } from 'react-icons/ai';


export default function Detail() {


    const { message, loading, selectedAdoption, handleAdoptionMessage, getAdoption, removeAdoption } = useContext(AdoptionContext);// contexto de adopcion
    const [showFormTracking, setshowFormTracking] = useState(false)
    const [showFormEdit, setShowFormEdit] = useState(false)
    let { adoptionId } = useParams();
    const MySwal = withReactContent(Swal);

    let history = useHistory();

    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
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

    return (


        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
                    <Box alignItems={"center"} display={"flex"}>
                        <Tooltip title="Revisa y edita los detalles del proceso de adopción">
                            <IconButton>
                                <BiHelpCircle />
                            </IconButton>

                        </Tooltip>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Detalles del proceso
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
                <CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
                    {selectedAdoption ? <AdoptionTabs adoption={selectedAdoption} /> : null}
                </CardContent>
            </Card>
        </Box>
    )

    // <div>
    //     {selectedAdoption ? <p>{JSON.stringify(selectedAdoption)}</p> : null}
    //     {loading ? <p>Cargando...</p> : null}
    //     <Button size="medium" variant="contained" color="primary" sx={{ marginTop: 5 }} onClick={() => toggleModalTracking()}>Nuevo segumiento</Button>

    //     <Button size="medium" variant="contained" color="primary" sx={{ marginTop: 5 }} onClick={() => toggleModalEdit()}>Editar</Button>
    //     <Button size="medium" variant="contained" color="error" sx={{ marginTop: 5 }} onClick={() => onRemoveAdoption()}>Eliminar adopción</Button>

    //     <Modal
    //         open={showFormTracking}
    //         aria-labelledby="modal-modal-title"
    //         aria-describedby="modal-modal-description"
    //         style={{ overflowY: 'scroll' }}
    //     >
    //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //             {showFormTracking && <Form handleModal={toggleModalTracking} adoptionID={adoptionId} />}
    //         </Box>


    //     </Modal>

    //     <Modal
    //         open={showFormEdit}
    //         aria-labelledby="modal-modal-title"
    //         aria-describedby="modal-modal-description"
    //         style={{ overflowY: 'scroll' }}
    //     >

    //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    //             {showFormEdit && <ModalUpdate handleModal={toggleModalEdit} adoptionId={selectedAdoption.id_adopcion} adoptionState={selectedAdoption.estado} observations={selectedAdoption.observaciones} finalDate={selectedAdoption.fecha_entrega} />}
    //         </Box>

    //     </Modal>
    // </div>
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdoptionTabs = ({ adoption }) => {

    console.log(adoption)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                // indicatorColor={theme.custom.primary.dark}
                >
                    <Tab icon={<IoNewspaperOutline size={24} />} sx={{ fontSize: 14, fontWeight: "bold", textTransform: "capitalize" }} label="Adopción" {...a11yProps(0)} />
                    <Tab icon={<IoDocumentTextOutline size={24} />} sx={{ fontSize: 14, fontWeight: "bold", textTransform: "capitalize" }} label="Questionario" {...a11yProps(1)} />
                    <Tab icon={<IoTimerOutline size={24} />} sx={{ fontSize: 14, fontWeight: "bold", textTransform: "capitalize" }} label="Seguimientos" {...a11yProps(2)} />
                </Tabs>
            </Box>

            {value === 0 ? <Card variant="outlined" sx={{ borderRadius: 3, mb: 2, mt: 2 }} >

                <Box sx={{ p: 2, flexDirection: "row", justifyContent: "space-between", display: "flex" }}>
                    <Stack direction="row" alignItems={"center"}>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, mr: 1 }} color="text.secondary">
                            Estado
                        </Typography>
                        <Chip color={adoption.estado === "finalizada" ?
                            "success"
                            : (adoption.estado === "en proceso" ?
                                "primary"
                                :
                                "warning")
                        }


                            sx={{ textTransform: "capitalize" }}



                            icon={adoption.estado === "finalizada" ?
                                <AiOutlineCheckCircle size={24} />
                                : (adoption.estado === "en proceso" ?
                                    <AiOutlineReload size={24} />
                                    :
                                    <AiOutlinePauseCircle size={24} />)
                            }
                            label={adoption.estado} />
                    </Stack>
                    <Stack direction="row" alignItems={"center"}>

                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} color="text.secondary">
                            Inició el {adoption.fecha_estudio}
                        </Typography>
                    </Stack>
                </Box>
                <Divider sx={{ background: grey[600] }} />
                <CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>

                </CardContent>
            </Card> :
                (value === 1 ?
                    <Box></Box>
                    : <Box></Box>)
            }

        </Box>
    )
}