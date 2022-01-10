/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react'

import {
    useParams,
    useHistory
} from "react-router-dom";
import AnimalContext from '../../context/animal/animalContext';
import {
    Box,
    Button,
    Card,
    CardActions,
    Chip,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    Divider,
    CardMedia
} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineReload } from 'react-icons/ai';
import { BiBadgeCheck, BiBookAdd, BiErrorAlt, BiHelpCircle } from 'react-icons/bi';
import { green, grey } from '@mui/material/colors';
import Slider from "react-slick";
import moment from 'moment';
import { FiTrash2 } from 'react-icons/fi';

const slickSettings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    centerPadding: '60px',

};

/**Vista de detalles del animal para el personal de la fundación
 * 
 * 
 * @returns 
 */
export default function Detail() {


    let { animalId } = useParams();

    moment.locale('es');
    moment.updateLocale('es', {
        relativeTime: {
            future: "en %s",
            past: "%s ",
            s: 'unos segundos',
            ss: '%d segundos',
            m: "un minuto",
            mm: "%d minutos",
            h: "an hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d dias",
            w: "una semana",
            ww: "%d semanas",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        }
    });


    const { selectedAnimal, message, loading, getAnimal, removeAnimal, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales

    const [slickSettings, setslickSettings] = useState(

        {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            // centerPadding: '60px',
            focusOnSelect: true
        }

    )
    const slider1 = useRef(null)
    const slider2 = useRef(null)

    const MySwal = withReactContent(Swal);
    let history = useHistory();


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches = useMediaQuery('(min-width:1280px)');


    useEffect(() => {
        if (matchDownSm) {
            setslickSettings({ ...slickSettings, slidesToShow: 2 })
        } else {
            setslickSettings({ ...slickSettings, slidesToShow: 3 })

        }
    }, [matchDownSm])

    useEffect(() => {
        if (selectedAnimal) {
            window.scrollTo(0, 0);
            setslickSettings({ ...slickSettings, infinite: selectedAnimal.animalImage.length > 3 })
        }
    }, [selectedAnimal])

    const onRemoveAnimal = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar el animal?, se eliminarán todos los datos asociados a este, imágenes, adopciones, seguimientos y questionarios",
            icon: "question",
            confirmButtonText: 'Aceptar',
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeAnimal(animalId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
    }

    useEffect(() => {
        getAnimal(animalId);
    }, []);

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true,
            });


            if (res.isConfirmed) {

                await handleAnimalMessage(null);
                if (message.category === "success") {
                    history.push("/animals");
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
                        <Tooltip title="Edita  y actualiza los datos del animal seleccionado">
                            <IconButton>
                                <BiHelpCircle />
                            </IconButton>

                        </Tooltip>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Detalle del animal
                        </Typography>

                    </Box>
                    <Box alignItems={"center"} display={"flex"} flexDirection={matchDownSm ? "column" : "row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>

                        <Button
                            color="secondary"
                            onClick={() => { history.push("/adoptions/new/" + animalId); }}
                            variant="contained"
                            startIcon={<BiBookAdd />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2, width: "100%" }}
                        >
                            Iniciar proceso
                        </Button>
                        <Stack direction={"row"} mt={matchDownSm ? 2 : "0"}>
                            <Button
                                color="primary"
                                onClick={() => { history.push("/animals/edit/" + animalId); }}
                                variant="outlined"
                                startIcon={<AiOutlinePlus />}
                                sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                            >
                                Editar
                            </Button>
                            <Button
                                color="error"
                                onClick={() => onRemoveAnimal()}
                                variant="outlined"
                                startIcon={<FiTrash2 />}
                                sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                            >
                                Eliminar
                            </Button>
                        </Stack>

                    </Box>
                </CardActions>
            </Card>
            {selectedAnimal ? <Card variant="outlined" sx={{
                padding: 3, borderRadius: theme.custom.borderRadius,
                // flexWrap: "wrap",
                display: "flex",
                flexDirection: !matches ? "column" : "row"
            }} >


                {selectedAnimal.animalImage.length > 0 ? <Box alignItems={"center"}
                    justifyContent={"center"} display={"flex"} flexDirection={"column"} >



                    <Box p={1} maxWidth={!matchDownSm ? "430px" : "100%"} minWidth={"20px"} alignItems={"center"} >
                        <Slider {...slickSettings2}

                            arrows={false}
                            draggable={false}
                            fade={true}
                            // cssEase='linear'
                            ref={slider2}
                            asNavFor={slider1.current}
                        >

                            {selectedAnimal.animalImage.map((element, index) => (
                                <div key={index} style={{ background: "red", maxWidth: "150px" }}>
                                    <img
                                        style={{ objectFit: "cover", borderRadius: 8 }}
                                        width={"100%"}
                                        height={!matchDownSm ? "414px" : "auto"}
                                        src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="card" />
                                </div>



                            ))}

                        </Slider>
                    </Box>

                    <Box paddingX={"30px"} pt={1} width={matchDownSm ? "289px" : "445px"} sx={{ background: theme.custom.primary.light, borderRadius: 2 }}>


                        <Slider {...slickSettings}

                            ref={slider1}
                            asNavFor={slider2.current}

                        >

                            {selectedAnimal.animalImage.map((element, index) => (
                                <div key={index} style={{ background: "red" }}>
                                    <img
                                        style={{ objectFit: "cover", borderRadius: 8 }}
                                        width={matchDownSm ? 60 : 90}
                                        height={matchDownSm ? 60 : 90}
                                        src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="card" />
                                </div>
                            ))}

                        </Slider>
                    </Box>
                </Box> :

                    <Stack direction={"column"} alignItems={"center"}>
                        <CardMedia

                            component="img"
                            height="230"
                            sx={{ borderRadius: "8px", objectFit: "contain" }}
                            image={`/images/no_image.png`}
                            alt="imagen de la mascota"
                        />

                        <Stack flexDirection={"row"} alignItems={"flex-start"} display={"flex"}>
                            <AiOutlineInfoCircle color='#1976d2' size={24} />
                            <Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2" }} variant="subtitle2">El animal no cuenta con imágenes, puede subirlas editando los datos del animal</Typography>

                        </Stack>
                    </Stack>
                }
                <Box width={"100%"} mt={!matches ? 3 : "0"} marginLeft={!matches ? 0 : 4} >

                    <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>

                        <Stack direction={"column"}>

                            <Typography sx={{ fontSize: 22, fontWeight: 600 }} color="text.secondary">
                                {selectedAnimal.nombre}
                            </Typography>

                            <Stack direction={"row"} sx={{ borderRadius: 1, width: 95, justifyContent: "space-between" }}>

                                <Stack direction={"row"} sx={{ background: green[100], borderRadius: 1, paddingX: 1, justifyContent: "space-between" }}>

                                    <Typography sx={{
                                        fontSize: 14, fontWeight: 100, textTransform: "capitalize", textAlign: "center"


                                    }} color={green[500]}>
                                        {selectedAnimal.especie}
                                    </Typography>


                                </Stack>

                                <Stack direction={"row"} sx={{ background: theme.custom.primary.light, borderRadius: 1, paddingX: 1, ml: 1, justifyContent: "space-between" }}>

                                    <Typography sx={{
                                        fontSize: 14, fontWeight: 100, textTransform: "capitalize", textAlign: "center"


                                    }} color={theme.custom.primary.dark}>
                                        {selectedAnimal.sexo}
                                    </Typography>


                                </Stack>
                            </Stack>
                        </Stack>
                        <Chip color={
                            selectedAnimal.estado === "Adoptado" ? "success" :
                                selectedAnimal.estado === "Sin adoptar" ? "warning" : "primary"
                        }

                            variant='solid'
                            sx={{

                                textTransform: "capitalize",
                                borderRadius: "6px",
                                borderTopRightRadius: "16px",
                                borderBottomLeftRadius: "16px",

                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 1,
                                '& .MuiChip-icon': {
                                    marginLeft: "0",
                                    marginRight: "0"
                                }
                            }}



                            icon={

                                selectedAnimal.estado === "Adoptado" ? <BiBadgeCheck size={24} /> :
                                    selectedAnimal.estado === "Sin adoptar" ? <BiErrorAlt size={24} /> : <AiOutlineReload size={24} />


                            }

                            label={selectedAnimal.estado === "Adoptado" || selectedAnimal.estado === "Sin adoptar" ? selectedAnimal.estado : "En proceso"}
                        />
                    </Stack>

                    <Typography sx={{ fontSize: 14, mt: 2, mb: 2 }} color="text.secondary">
                        {selectedAnimal.caracteristicas ?? "No registra características"}
                    </Typography>

                    <Divider />
                    <Typography sx={{ fontSize: 16, mt: 2, fontWeight: 600 }} color="text.secondary">
                        Información adicional
                    </Typography>

                    <Grid container mt={3} spacing={1}>
                        <Grid item md={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Color
                            </Typography>
                        </Grid>

                        <Grid item md={10} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary">
                                {selectedAnimal.color}
                            </Typography>
                        </Grid>
                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Esterilizado
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {selectedAnimal.esterilizado ? "Si" : "No"}
                            </Typography>
                        </Grid>

                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Desparasitado
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {selectedAnimal.desparasitado ? "Si" : "No"}
                            </Typography>
                        </Grid>

                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Edad
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {moment(selectedAnimal.fecha_nacimiento, "YYYYMMDD").fromNow()} (aprox)

                            </Typography>
                        </Grid>

                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Tamaño
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary">
                                {selectedAnimal.tamanio}
                            </Typography>
                        </Grid>

                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Fecha de rescate
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary">
                                {selectedAnimal.fecha_rescate ? (new Date(selectedAnimal.fecha_rescate + "T00:00:00").toLocaleDateString()) : "No registra"}
                            </Typography>
                        </Grid>
                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Sitio de rescate
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary">
                                {selectedAnimal.sitio_rescate ?? "No registra"}
                            </Typography>
                        </Grid>

                        <Grid item md={2} mt={2} xs={12} display={"flex"} alignItems={"center"}>

                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary">
                                Vacunas
                            </Typography>
                        </Grid>

                        <Grid item md={10} mt={2} xs={12} display={"flex"} alignItems={"center"} >

                            <Typography sx={{ fontSize: 14, textTransform: "capitalize" }} color="text.secondary">
                                {selectedAnimal.vacunas ?? "No registra"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

            </Card> : null
            }
        </Box >

    );
}