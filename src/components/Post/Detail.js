/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext} from 'react'
import { useParams, useHistory } from 'react-router';
import PostContext from '../../context/post/postContext';

import { Button, Box, Card, CardActions, Tooltip, IconButton, Typography, useMediaQuery, useTheme, Stack, CardMedia } from '@mui/material';
import { AiOutlineInfoCircle, AiOutlinePlus, } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaRegCalendar } from 'react-icons/fa';


export default function Detail() {


    const { message, loading, selectedPost, handlePostMessage, getPost, removePost } = useContext(PostContext);// contexto de adopcion
    let { postId } = useParams();
    const MySwal = withReactContent(Swal);


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    let history = useHistory();

  

    const onRemovePost = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar esta publicación?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removePost(postId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
    }


    useEffect(() => {
        if (selectedPost) {
            window.scrollTo(0, 0);
        }
    }, [selectedPost])

    useEffect(() => {
        getPost(postId);
    }, [])

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight:1.2  }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true,
            });


            if (res.isConfirmed) {

                await handlePostMessage(null);
                if (message.category === "success") {
                    history.push("/posts");
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
                        <Tooltip title="Esta vista respresenta la publicación que verá el publicco que viste la página">
                            <IconButton>
                                <BiHelpCircle />
                            </IconButton>

                        </Tooltip>
                        <Typography variant="t2" >
                            Detalles de la publicación
                        </Typography>


                    </Box>
                    <Stack direction={"row"} mt={matchDownSm ? 2 : "0"}>
                        <Button
                            color="primary"
                            onClick={() => { history.push("/posts/edit/" + postId); }}
                            variant="outlined"
                            startIcon={<AiOutlinePlus />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Editar
                        </Button>
                        <Button
                            color="error"
                            onClick={() => onRemovePost()}
                            variant="outlined"
                            startIcon={<FiTrash2 />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </CardActions>
            </Card>


            {selectedPost ? <Card variant="outlined" sx={{
                padding: 3, borderRadius: theme.custom.borderRadius,
                // flexWrap: "wrap",
                display: "flex",
            
                flexDirection: "column"
            }} >


                {selectedPost.postImage.length > 0 ? <Box alignItems={"center"}
                    justifyContent={"center"} display={"flex"} flexDirection={"column"} >


                    <Carousel showThumbs={false} >
                        {selectedPost.postImage.map((element, index) => (
                            <div key={index}>
                                <img
                                    style={{ objectFit: "contain", borderRadius: 8 }}
                                    width={"100%"}
                                    height={!matchDownSm ? "414px" : "auto"}
                                    src={`${process.env.REACT_APP_API_URL}/${element.ruta}`} alt="card" />

                            </div>))}
                    </Carousel>
              
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
                            <Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2" }} variant="subtitle2">Esta publicación no cuenta con imágenes, puede subirlas editando la publicación</Typography>

                        </Stack>
                    </Stack>
                }
                <Box  mt={5} flexDirection={"column"} display="flex">

                    <Typography variant="t1" sx={{ fontWeight: "900", color:"#1e4b57" }} >
                        {selectedPost.titulo}
                    </Typography>
                    <Stack direction="row" alignItems="center" mt={1} sx={{ background: theme.custom.primary.light, width:"100px", justifyContent:"center", p:1, borderRadius:"8px"}}>
                        <FaRegCalendar color={"white"}/>
                        <Typography variant="subtitle2" ml={1} sx={{ fontWeight: "700", color: "white" }} >
                            {new Date(selectedPost.fecha_creacion).toLocaleDateString()}
                        </Typography>
                    </Stack>
                  

                    <Typography variant="body1" sx={{ fontWeight: "400",  color:"#1e4b57", mt: 3 }} >
                        {selectedPost.cuerpo}
                    </Typography>
                </Box>


            </Card> : null}
        </Box>

    )
}