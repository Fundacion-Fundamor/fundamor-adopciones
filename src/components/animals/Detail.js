import React, { useContext, useEffect, useRef } from 'react'

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
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,

} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AiOutlinePlus, AiOutlineReload } from 'react-icons/ai';
import { BiBadgeCheck, BiErrorAlt, BiHelpCircle } from 'react-icons/bi';
import { green, grey } from '@mui/material/colors';
import Slider from "react-slick";


const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    // centerPadding: '60px',
    focusOnSelect: true
};

const slickSettings2 = {
    dots: false,
    infinite: true,

    slidesToShow: 1,
    slidesToScroll: 1,
    // centerMode: true,
    centerPadding: '60px',

};
export default function Detail() {
    const { selectedAnimal, message, loading, getAnimal, removeAnimal, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales

    const slider1 = useRef(null)
    const slider2 = useRef(null)
    console.log(selectedAnimal)
    let { animalId } = useParams();
    const MySwal = withReactContent(Swal);
    let history = useHistory();


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const onRemoveAnimal = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar el animal?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeAnimal(animalId);
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
                    history.push("/gallery");
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

                        {matchDownSm ? <Button
                            color="primary"
                            onClick={() => { history.push("/adoptions/new/-1"); }}
                            variant="contained"
                            startIcon={<AiOutlinePlus />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Editar
                        </Button> : null}

                    </Box>
                    <Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>


                        {!matchDownSm ? <Button
                            color="primary"
                            onClick={() => { history.push("/adoptions/new/-1"); }}
                            variant="contained"
                            startIcon={<AiOutlinePlus />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Editar
                        </Button> : null}


                    </Box>
                </CardActions>
            </Card>
            {selectedAnimal ? <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >


                <Grid container >
                    <Grid item md={6} xs={12} display={"flex"} alignItems={"center"}
                        justifyContent={"center"} flexDirection={"column"} >



                        <Box p={1} maxWidth={"450px"} minWidth={"20px"} >
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
                                            maxHeight={"450px"}
                                            src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="card" />
                                    </div>

                                    // <CardMedia
                                    //     // onLoad={() => { setIsLoaded(true) }}
                                    //     component="img"
                                    //     key={index}
                                    //     height="400"
                                    //     sx={{ borderRadius: "8px", maxWidth:"400px !important"}}
                                    //     image={`${process.env.REACT_APP_API_URL}/${element.ruta}`}
                                    //     alt="green iguana"
                                    // />


                                ))}

                            </Slider>
                        </Box>
                        <Box paddingX={"30px"} pt={1} maxWidth={"445px"} sx={{ background: "gray" }}>


                            <Slider {...slickSettings}
                                afterChange={(index) => {
                                    console.log(index)

                                }}
                                ref={slider1}
                                asNavFor={slider2.current}

                            >

                                {selectedAnimal.animalImage.map((element, index) => (
                                    <div key={index} style={{ background: "red" }}>
                                        <img
                                            style={{ objectFit: "cover", borderRadius: 8 }}
                                            width={90}
                                            height={90}
                                            src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="card" />
                                    </div>
                                ))}

                            </Slider>
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12} >

                        <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>

                            <Stack direction={"column"}>
                                <Stack sx={{ background: green[100], borderRadius: 1, width: 70 }}>

                                    <Typography sx={{
                                        fontSize: 14, fontWeight: 100, textTransform: "capitalize", textAlign: "center"


                                    }} color={green[500]}>
                                        {selectedAnimal.especie}
                                    </Typography>
                                </Stack>
                                <Typography sx={{ fontSize: 22, fontWeight: 600 }} color="text.secondary">
                                    {selectedAnimal.nombre}
                                </Typography>

                            </Stack>
                            <Chip color={
                                selectedAnimal.estado === "Adoptado" ? "success" :
                                    selectedAnimal.estado === "Sin adoptar" ? "warning" : "primary"
                            }


                                sx={{
                                    textTransform: "capitalize",
                                    borderRadius: "8px",
                                    display: "flex",


                                }}



                                icon={

                                    selectedAnimal.estado === "Adoptado" ? <BiBadgeCheck size={24} /> :
                                        selectedAnimal.estado === "Sin adoptar" ? <BiErrorAlt size={24} /> : <AiOutlineReload size={24} />


                                }
                                label={selectedAnimal.estado === "Adoptado" || selectedAnimal.estado === "Sin adoptar" ? selectedAnimal.estado : "En proceso"}
                            />
                        </Stack>

                        <Typography sx={{ fontSize: 16, mt: 2 }} color="text.secondary">
                            {selectedAnimal.caracteristicas ?? "No registra características"}
                        </Typography>

                    </Grid>
                </Grid>
            </Card> : null
            }
        </Box >
        // <div>
        //     <h1>SUPER VISTA DE PERFIL DE MASCOTA PARA EMPLEADO O PARA EL PUBLICO</h1>

        //     <p>datos del animal</p>
        //     {loading ? <p>cargando..</p> : 
        //         <p>{JSON.stringify(selectedAnimal)}</p>
        //     }

        //     <Button size="medium" variant="contained" color="success" onClick={() => {
        //         history.push(`/animals/edit/${animalId}`);

        //     }}>Editar</Button>
        //     {/*Validar que solo se pueda iniciar un proceso si no se está en alguno actualmente */}
        //     <Button size="medium" variant="contained" color="primary" onClick={() => {
        //         history.push(`/adoptions/new/${animalId}`);

        //     }}>Nuevo proceso de adopción</Button>
        //     <Button size="medium" variant="contained" color="error" onClick={() => onRemoveAnimal()}>Eliminar</Button>

        // </div>
    );
}