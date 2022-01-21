/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import AdoptionContext from '../../context/adoption/adoptionContext';
import Form from '../tracking/Form';
import { Button, Modal, Box, CardActions, Card, Tooltip, IconButton, Typography, useTheme, useMediaQuery, CardContent, Tabs, Tab, Divider, Chip, Stack, Grid } from '@mui/material';
import ModalUpdate from './ModalUpdate';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BiHelpCircle } from 'react-icons/bi';
import { IoDocumentTextOutline, IoNewspaperOutline, IoTimerOutline } from "react-icons/io5"
import { grey } from '@mui/material/colors';
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlinePlus, AiOutlineReload } from 'react-icons/ai';
import { FaRegEdit, FaWpforms } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';


export default function Detail() {


    const { message, loading, selectedAdoption, handleAdoptionMessage, getAdoption, getAdoptions, removeAdoption } = useContext(AdoptionContext);// contexto de adopcion
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
        if (showFormTracking) {
            getAdoption(adoptionId)
        }
        setshowFormTracking(!showFormTracking);
    }
    const toggleModalEdit = () => {

        if (showFormEdit) {
            if (message && message.showIn === "form" && message.category === "success") {
                getAdoption(adoptionId)
                getAdoptions();
            }
        }
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
            cancelButtonText: "Cancelar",
            preConfirm: async (response) => {

                await removeAdoption(adoptionId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })


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
                        <Typography variant="t2" >
                            Detalles del proceso
                        </Typography>


                    </Box>

                    <Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>


                        <Button
                            color="primary"
                            onClick={toggleModalEdit}
                            variant="outlined"
                            startIcon={<FaRegEdit />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Editar
                        </Button>



                        <Button
                            color="error"
                            onClick={onRemoveAdoption}
                            variant="outlined"
                            startIcon={<FiTrash2 />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Eliminar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
                <CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
                    {selectedAdoption ? <AdoptionTabs adoption={selectedAdoption} toggleModalTracking={toggleModalTracking} /> : null}
                </CardContent>
            </Card>

            <Modal
                open={showFormEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflowY: 'scroll' }}
            >

                <Box tabIndex={""} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {showFormEdit && <ModalUpdate handleModal={toggleModalEdit} adoptionId={selectedAdoption.id_adopcion} adoptionState={selectedAdoption.estado} observations={selectedAdoption.observaciones} finalDate={selectedAdoption.fecha_entrega} />}
                </Box>

            </Modal>
            <Modal
                open={showFormTracking}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflowY: 'scroll' }}
            >
                <div tabIndex={""} style={{ display: 'flex', justifyContent: 'center' }}>
                    {showFormTracking && <Form handleModal={toggleModalTracking} adoptionID={adoptionId} />}
                </div>

            </Modal>


        </Box>
    )


}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdoptionTabs = ({ adoption, toggleModalTracking }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
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

                <Box sx={{ p: 2, flexDirection: matchDownSm ? "column" : "row", justifyContent: "space-between", display: "flex" }}>

                    <Stack direction="row" alignItems={"center"}>

                        <Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary">
                            Inició el  {new Date(adoption.fecha_estudio + "T00:00:00").toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems={"center"} mt={matchDownSm ? 2 : 0}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, mr: 1 }} color="text.secondary">
                            Estado adopción
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

                </Box>
                <Divider sx={{ background: grey[600] }} />
                <CardContent sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
                    <Grid container spacing={2} mt={0}>
                        <Grid item md={4} xs={12} >
                            <Stack p={2}>
                                <Typography sx={{ fontSize: 15, fontWeight: 700 }} color="text.secondary">
                                    Empleado encargado
                                </Typography>
                                {adoption.empleado ? <>
                                    <Typography sx={{ fontSize: 14, fontWeight: 700, mt: 2, display: "flex" }} color="text.secondary">
                                        Nombre: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.empleado.nombre}</Typography></Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                        C.C <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.empleado.id_empleado}
                                        </Typography>

                                    </Typography>
                                </> :

                                    <Tooltip title="El empleado asignado será el próximo que cambie el estado del proceso de adopción">
                                        <Typography sx={{ fontSize: 13, fontWeight: 500, textDecorationLine: "underline", textDecorationStyle: "solid", mt: 2, cursor: "pointer" }} color="text.secondary">Sin definir
                                        </Typography></Tooltip>}
                            </Stack>
                        </Grid>
                        <Grid item md={8} xs={12} >
                            <Stack p={2}>
                                <Typography sx={{ fontSize: 15, fontWeight: 700 }} color="text.secondary">
                                    Observaciones
                                </Typography>

                                <Box sx={{ background: grey[100], mt: 2, p: 1, borderRadius: 2, display: "flex" }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: 500, }} color="text.secondary">
                                        {adoption.observaciones === "" ? "No registra" : adoption.observaciones}
                                    </Typography>
                                </Box>

                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ background: grey[600], width: "100%", P: 2 }} />
                    <Grid container spacing={2} mt={0}>
                        <Grid item md={4} xs={12} >
                            <Stack p={2}>
                                <Typography sx={{ fontSize: 15, fontWeight: 700 }} color="text.secondary">
                                    Adoptante involucrado
                                </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: 700, mt: 2, display: "flex" }} color="text.secondary">
                                    Nombre: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.nombre}</Typography></Typography>

                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    CC: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.id_adoptante ?? "No registra"}</Typography></Typography>


                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    Correo: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.correo ?? "No registra"}</Typography></Typography>

                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    Teléfono celular: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.telefono_celular ?? "No registra"}</Typography></Typography>


                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    Teléfono fijo: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.telefono_casa ?? "No registra"}</Typography></Typography>

                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    Ocupación: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.ocupacion ?? "No registra"}</Typography></Typography>


                                <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                    Dirección: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.adoptante.ciudad ?? "No registra"}</Typography></Typography>



                            </Stack>
                        </Grid>
                        <Grid item md={8} xs={12} >
                            <Stack p={2}>
                                <Typography sx={{ fontSize: 15, fontWeight: 700 }} color="text.secondary">
                                    Animal vinculado
                                </Typography>

                                <Stack direction={matchDownSm ? "column" : "row"} sx={{ background: grey[100], mt: 2, p: 1, borderRadius: 2 }}>
                                    {/* {adoption.animal.animalImage.length !== 0 ? <img src={`${process.env.REACT_APP_API_URL}/${adoption.animal.animalImage[0].ruta}`} alt="card" /> : */}
                                    <Stack direction={"column"} alignItems={"center"} sx={{ background: "#fff", borderRadius: theme.custom.borderRadius, pb: 1 }}>

                                        {adoption.animal.animalImage.length !== 0 ? <img style={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }} width={150} height={150} src={`${process.env.REACT_APP_API_URL}/${adoption.animal.animalImage[0].ruta}`} alt="card" /> :
                                            <img style={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }} width={150} height={150} src={`${process.env.REACT_APP_URL}/images/no_image.png`} alt="card" />}
                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            {adoption.animal.nombre}</Typography>
                                    </Stack>
                                    <Stack direction={"column"} ml={2}>
                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            Especie: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.animal.especie ?? "No registra"}</Typography></Typography>

                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            Edad : <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">2 meses</Typography></Typography>

                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            Esterilizado: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.animal.esterilizado ? "SI" : "NO"}</Typography></Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            Desparasitado: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.animal.desparasitado ? "SI" : "NO"}</Typography></Typography>

                                        <Typography sx={{ fontSize: 14, fontWeight: 700, display: "flex", mt: 1 }} color="text.secondary">
                                            Entregado: <Typography sx={{ fontSize: 13, fontWeight: 500, ml: 1 }} color="text.secondary">{adoption.fecha_entrega ? "El animal fue entregado en " + (new Date(adoption.fecha_entrega + "T00:00:00").toLocaleDateString()) : "El animal no ha sido entregado"}</Typography></Typography>

                                    </Stack>
                                </Stack>

                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card> :
                (value === 1 ?
                    <Card variant="outlined" sx={{ borderRadius: 3, mb: 2, mt: 2 }} >



                        <Stack p={2} alignItems={"center"} justifyContent={"center"} flexDirection={"row"} marginY={3}>

                            <FaWpforms color={grey[600]} size={32} />
                            <Typography sx={{ fontSize: 15, fontWeight: 700, textAlign: "center", marginLeft: 2 }} color="text.secondary">
                                Questionario respondido por el adoptante durante la creación de la adpoción
                            </Typography>


                        </Stack>
                        <Divider sx={{ background: grey[600], marginY: 2 }} />

                        <Stack marginX={5} padding={1} marginY={3} borderRadius={2} sx={{ background: grey[50] }}>

                            {adoption.preguntas.map((element, index) => (
                                <Stack key={index} p={1} sx={{ mb: 2 }} >
                                    <Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary">
                                        {index + 1}. {element.question.titulo}
                                    </Typography>
                                    <Stack mt={2}>
                                        <Typography sx={{ fontSize: 14, pl: 2 }} color="text.secondary">
                                            R: {element.respuesta}
                                        </Typography>
                                    </Stack>
                                </Stack>

                            ))}
                        </Stack>
                    </Card>
                    : <Card variant="outlined" sx={{ borderRadius: 3, mb: 2, mt: 2 }} >



                        <Stack p={2} alignItems={"center"} justifyContent={"center"}>
                            {adoption.estado !== "finalizada" ? <Tooltip title="Solo puede registrar observaciones de seguimiento cuando la adopción haya finalizado">
                                <Button
                                    color={"inherit"}
                                    variant="contained"
                                    startIcon={<AiOutlinePlus />}
                                    sx={{ borderRadius: "8px", fontSize: 12, }}
                                >
                                    Nueva observación
                                </Button>
                            </Tooltip> :
                                <Button
                                    color={"warning"}
                                    onClick={toggleModalTracking}

                                    variant="contained"
                                    startIcon={<AiOutlinePlus />}
                                    sx={{ borderRadius: "8px", fontSize: 12, }}
                                >
                                    Nueva observación
                                </Button>
                            }
                        </Stack>




                        <Stack p={2} sx={{ background: grey[50] }} >
                            {/* <Typography sx={{ fontSize: 15, fontWeight: 700, textAlign: "center",mb:4 }} color="text.secondary">
                                {adoption.seguimientos ? "Listado de segumientos" : "Aún no hay seguimientos"}
                            </Typography> */}

                            {adoption.seguimientos.map((element, index) => (<>
                                <Stack key={index} p={1} sx={{ borderBottomWidth: 1, }} >
                                    <Typography sx={{ fontSize: 14, fontWeight: 700 }} color="text.secondary">
                                        Registrado el {(new Date(element.fecha + "T00:00:00").toLocaleDateString())}
                                    </Typography>
                                    <Stack mt={2}>
                                        <Typography sx={{ fontSize: 14, }} color="text.secondary">
                                            {element.anotaciones}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Divider sx={{ background: grey[600], marginY: 2 }} />
                            </>
                            ))}

                            {adoption.seguimientos.length === 0 ?
                                <Typography sx={{ fontSize: 14, fontWeight: 500, textAlign: "center" }} color="text.secondary">
                                    Esta adopción aún no tiene segimientos registrados
                                </Typography>
                                : null}
                        </Stack>
                    </Card>)
            }

        </Box>
    )
}