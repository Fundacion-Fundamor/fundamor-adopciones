/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardActions, CardContent, Divider, FormHelperText, Grid, IconButton, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material'

import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi'
import FoundationContext from '../../context/foundation/foundationContext';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



/**Renderiza la vista que permite actualizar los datos de la fundación
 * 
 * @returns 
 */
export default function Config() {

    const theme = useTheme();

    const { getFoundation, currentFoundation, updateFoundationData, handleFoundationMessage, loading, message } = useContext(FoundationContext);

    const [tmpFoundation, setTmpFoundation] = useState(
        {
            correo: "",
            cuenta_donaciones: "",
            direccion: "",
            mision: "",
            telefono: "",
            vision: "",
            url_video: "",
            url_mapa: ""
        }
    )

    const MySwal = withReactContent(Swal)

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true

            });


            if (res.isConfirmed) {
                await handleFoundationMessage(null);
            }
        }
        if (message && message.showIn === "form" && !loading) {

            displayAlert();
        }

    }, [message, loading])

    useEffect(() => {
        if (currentFoundation) {
            setTmpFoundation({

                correo: currentFoundation.correo ? currentFoundation.correo : "",
                cuenta_donaciones: currentFoundation.cuenta_donaciones ? currentFoundation.cuenta_donaciones : "",
                direccion: currentFoundation.direccion ? currentFoundation.direccion : "",
                mision: currentFoundation.mision ? currentFoundation.mision : "",
                telefono: currentFoundation.telefono ? currentFoundation.telefono : "",
                vision: currentFoundation.vision ? currentFoundation.vision : "",
                url_video: currentFoundation.url_video ? currentFoundation.url_video : "",
                url_mapa: currentFoundation.url_mapa ? currentFoundation.url_mapa : "",

            })
        }
    }, [currentFoundation]);


    useEffect(() => {
        getFoundation();
    }, []);

    return (


        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

                    <Tooltip title="Actualice la información de su organización">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2"  >
                        Mi sitio
                    </Typography>
                </CardActions>

            </Card>
            <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius }} >

                <Stack p={3}>
                    <Typography variant="t2" sx={{ fontWeight: "800" }} >
                        Configuración del sitio
                    </Typography>

                </Stack>
                <Divider />
                <CardContent sx={{ flexDirection: "column", alignItems: "flex-start", display: "flex", padding: 3, }}>

                    <Grid container spacing={3} mt={0} padding={2} >
                        <Grid item md={6} xs={12} justifyContent={"center"} alignItems={"center"} display={"flex"}>
                            <Box p={5} maxWidth={380} maxHeight={380} sx={{
                                backgroundColor: "white", borderRadius: 8,
                                boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.12)",


                            }}>
                                <img style={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", width: "100%", height: "auto" }} src={`${process.env.REACT_APP_URL}/images/imagotipo.png`} alt="card" />
                            </Box>

                        </Grid>

                        <Grid item md={6} xs={12} flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"} display={"flex"} >

                            <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 16 }} >
                                Información de contacto
                            </Typography>
                            <Divider style={{ marginTop: 2, marginBottom: 2, width: "100%" }} />
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                    mt: 3
                                }}
                                value={tmpFoundation.telefono}
                                label="Teléfono"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ height: "20px", padding: "15px" }}
                                fullWidth={true}

                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, telefono: event.target.value })
                                }}
                            />
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                    mt: 3
                                }}
                                value={tmpFoundation.correo}
                                label="Correo"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ height: "20px", padding: "15px" }}
                                fullWidth={true}
                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, correo: event.target.value })
                                }}

                            />

                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                    mt: 3
                                }}
                                value={tmpFoundation.direccion}
                                label="Dirección"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ height: "20px", padding: "15px" }}
                                fullWidth={true}
                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, direccion: event.target.value })
                                }}

                            />
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                    mt: 3
                                }}
                                value={tmpFoundation.url_mapa}
                                label="Url del mapa"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                fullWidth={true}

                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, url_mapa: event.target.value })
                                }}

                            />
                        </Grid>

                    </Grid>
                    <Grid container spacing={3} mt={0} padding={2} >


                        <Grid item md={12} xs={12} >
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                }}
                                value={tmpFoundation.mision}
                                label="Misión"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ maxLength: 255 }}
                                fullWidth={true}
                                multiline={true}

                                minRows={3}
                                maxRows={8}
                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, mision: event.target.value })
                                }}

                            />
                            <FormHelperText >Máximo 255 caracteres</FormHelperText>

                        </Grid>

                        <Grid item md={12} xs={12} >

                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                }}
                                value={tmpFoundation.vision}
                                label="Visión"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ height: "20px", padding: "15px", maxLength: 255 }}
                                fullWidth={true}
                                multiline={true}

                                minRows={3}
                                maxRows={8}
                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, vision: event.target.value })
                                }}
                            />
                            <FormHelperText >Máximo 255 caracteres</FormHelperText>
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                }}
                                value={tmpFoundation.url_video}
                                label="Url del video"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ maxLength: 300 }}
                                fullWidth={true}

                                variant="outlined"
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, url_video: event.target.value })
                                }}

                            />
                            <FormHelperText >Máximo 300 caracteres</FormHelperText>

                        </Grid>

                        <Grid item md={12} xs={12} >

                            <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 16 }} >
                                Donaciones
                            </Typography>
                            <Divider style={{ marginTop: 2, marginBottom: 2 }} />

                        </Grid>

                        <Grid item md={12} xs={12} >

                            <TextField
                                sx={{
                                    "& .MuiOutlinedInput-root": {

                                        borderRadius: "10px!important"

                                    },
                                }}
                                placeholder='Ej Cuenta de ahorros Bancomío No 00000000'
                                value={tmpFoundation.cuenta_donaciones}
                                label="Información de la cuenta"
                                InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                inputProps={{ maxLength: 600 }}
                                fullWidth={true}
                                variant="outlined"
                                multiline={true}
                                rows={3}
                                onChange={(event) => {
                                    setTmpFoundation({ ...tmpFoundation, cuenta_donaciones: event.target.value })
                                }}

                            />

                        </Grid>

                        <Grid item md={12} xs={12} >
                            <LoadingButton loading={loading} variant="outlined"
                                size="medium" color="primary" sx={{ mt: 3, fontSize: 12, height: 40, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}
                                onClick={() => {

                                    if (!loading) {
                                        updateFoundationData(tmpFoundation)

                                    }
                                }}
                                startIcon={<AiOutlineSave />}

                            >
                                Guardar cambios
                            </LoadingButton>


                        </Grid>
                    </Grid>

                </CardContent>

            </Card >

        </Box >
    )
}