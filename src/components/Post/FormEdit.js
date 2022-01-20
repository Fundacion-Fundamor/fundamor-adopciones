/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from 'react'
import './form.scss'
import {
    Button,
    TextField,
    Box,
    Card,
    CardActions,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    CardContent,
    ImageList,
    Chip,
    ImageListItem,
    ImageListItemBar,
    Stack,
    Divider,
} from '@mui/material'

import PostContext from '../../context/post/postContext'
import { grey } from '@mui/material/colors'
import { BiHelpCircle, BiTrashAlt } from 'react-icons/bi'
import ImageUploading from 'react-images-uploading';
import { AiOutlineInfoCircle, AiOutlineSave } from 'react-icons/ai'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'


const maxNumber = 8; //max number images
/**Componente encargado del registro y edición de un colaborador
 *
 * @param {*} param0
 * @returns
 */
export default function FormEdit() {
    const { handlePostMessage, editPost, loading, message,selectedPost } = useContext(PostContext)

    const MySwal = withReactContent(Swal);
    const [values, setValues] = useState({
        postId: '',
        title: '',
        body: '',

    })

    const [images, setImages] = useState([]);

    const [imagesRemove, setImagesRemove] = useState([]);
    const [errors, setErrors] = useState({
        postId: null,
        title: null,
        body: null,
        
    })

    /**Captura el cambio al seleccionar una nueva imágen
        * 
        * @param {*} imageList 
        * @param {*} addUpdateIndex 
        */
    const onChangeImages = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    let history = useHistory();


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const onSubmit = async () => {

        //se validan los campos del formulario

        if (values.title === '') {
            setErrors({ ...errors, title: 'Debe ingresar un título' })
        } else if (values.body === '') {
            setErrors({ ...errors, body: 'Debe ingresar un cuerpo' })
        } else {
            let tmp = []; //imágenes nuevas

            images.forEach(element => {
                if (element.ruta === undefined) {
                    tmp.push(element);
                }
            })
            console.log(tmp)
            console.log(imagesRemove)
            console.log(values)
            //se guardan los datos del colaborador
            editPost(values, tmp, imagesRemove);

        }
    }

    useEffect(() => {
        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,

            });


            if (res.isConfirmed) {

                await handlePostMessage(null);

                if (message.category === "success") {
                    history.push("/posts");
                }
            }
        }
        if (message && message.showIn === "edit") {

            displayAlert();
        }

    }, [message]);


    useEffect(() => {

        if (selectedPost) {
            setValues(
                {
                    postId: selectedPost.id_publicacion,
                    title: selectedPost.titulo.trim(),
                    body: selectedPost.cuerpo,
                    images: selectedPost.postImage
                }
            );
            setImages(selectedPost.postImage);
        }
    }, [selectedPost])
    
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

                    <Tooltip title="Edita la publicaion seleccionada">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2"  >
                        Editar publicación
                    </Typography>
                </CardActions>

            </Card>
            <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius, justifyContent: "center", display: "flex", flexDirection: matchDownSm ? "column" : "row" }} >
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChangeImages}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    maxFileSize={5000000}
                    acceptType={['jpg', 'png']}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                    }) => (
                        // write your building UI
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#ededed", padding: 12, borderRadius: 12, margin: 22 }}>




                            {imageList.length !== 0 && false ? <Button size="small" onClick={onImageRemoveAll} variant="contained" color="info">Eliminar Todo</Button> : null}

                            <Button onClick={onImageUpload} size="small" sx={{ marginTop: 2, borderRadius: "8px" }} color={isDragging ? "info" : "primary"} variant="contained" >Seleccionar imágenes</Button>
                            <Chip sx={{ marginTop: 2 }} label={imageList.length + "/8"} />
                            {errors && <div>
                                {errors.maxNumber && <span>Solo puede adjuntar un máximo de {maxNumber} imágenes</span>}
                                {errors.acceptType && <span>Este tipo de archivo no está soportado</span>}
                                {errors.maxFileSize && <span>Cada imágen debe pesar máximo 5Mb</span>}

                            </div>}
                            <div style={{ marginTop: imageList.length > 0 ? 15 : 0, display: "flex" }}>

                                <ImageList sx={{ width: "100%", }} cols={matchDownSm ? 1 : imageList.length > 2 ? 2 : imageList.length} >
                                    {imageList.map((image, index) => (
                                        <ImageListItem key={index} sx={{ borderRadius: 8, }}>
                                            {image['data_url'] !== undefined ? <img
                                                src={image['data_url']}
                                                alt="imagen de la publicación"
                                                loading="lazy"
                                                style={{ maxWidth: 200, borderRadius: 8, minHeight: 160, objectFit: "cover" }}

                                            /> :
                                                <img
                                                    style={{ maxWidth: 200, borderRadius: 8, minHeight: 160, objectFit: "cover" }}

                                                    src={`${process.env.REACT_APP_API_URL}/${image.ruta}`}
                                                    alt="imagen de la publicación"
                                                    loading="lazy" />

                                            }
                                            <ImageListItemBar
                                                subtitle={index === 0 ? "Principal" : "Secundaria"}
                                                sx={{ backgroundColor: index === 0 ? theme.custom.primary.dark : "rgba(0, 0, 0, 0.5)", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about this`}
                                                        onClick={() => {
                                                            if (imageList[index].ruta !== undefined) {
                                                                setImagesRemove([...imagesRemove, imageList[index]]);
                                                            }
                                                            onImageRemove(index)
                                                        }}
                                                    >
                                                        <BiTrashAlt />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                            <Stack flexDirection={"row"} alignItems={"center"} display={"flex"}>
                                <AiOutlineInfoCircle color='#1976d2' size={24} />
                                <Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2" }} variant="subtitle2">La imagen principal de la publicación corresponderá a la primera que sea seleccionada </Typography>

                            </Stack>
                        </div>
                    )}
                </ImageUploading>

                <CardContent sx={{ maxWidth: 600, justifyContent: "center", p: 5 }}>
                    <TextField
                        fullWidth
                        error={errors.title != null}
                        label="Titulo"
                        helperText={errors.title}
                        variant="outlined"
                        multiline={true}
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.title}
                        onChange={(event) => {
                            setValues({ ...values, title: event.target.value })
                            setErrors({ ...errors, title: null })
                        }}
                    />



                    <TextField
                        fullWidth
                        error={errors.body !== null}
                        label="Cuerpo"
                        helperText={errors.body}
                        multiline
                        minRows={5}
                        // maxRows={20}
                        variant="outlined"
                        value={values.body}
                        sx={{ mt: 4 }}
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        onChange={(event) => {
                            setValues({ ...values, body: event.target.value })
                            setErrors({ ...errors, body: null })
                        }}
                    />


                    <Divider sx={{ mt: 5 }} />
                    <Box sx={{ justifyContent: "space-between", padding: 3, }} display="flex">

                        <Button size="medium" variant="contained" color='inherit'

                            sx={{

                                color: grey[600],
                                fontSize: 12, height: 40, px: 5, mr: 4, alignItems: "center", borderRadius: "8px", fontWeight: "bold"
                            }}
                            onClick={() => {

                                history.goBack()

                            }}>Cancelar</Button>

                        <LoadingButton loading={loading}
                            size="medium" variant="contained" color="success" sx={{ fontSize: 12, height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}

                            onClick={() => {

                                if (!loading) {
                                    onSubmit()

                                }
                            }}
                            startIcon={<AiOutlineSave size={20} />}

                        >
                            Guardar
                        </LoadingButton>
                    </Box>

                </CardContent>
            </Card>
        </Box >

    )
}
