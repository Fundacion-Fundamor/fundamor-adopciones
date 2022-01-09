import { Box, Button, Card, CardActions, CardContent, Divider, FormHelperText, Grid, IconButton, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSave } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi'
import FoundationContext from '../../context/foundation/foundationContext';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Config() {

    const theme = useTheme();
    const matchDownSm = useMediaQuery('(max-width:1280px)');
 

    const { getFoundation, currentFoundation, updateFoundationData, handleFoundationMessage, loading, message } = useContext(FoundationContext);

    const [tmpFoundation, setTmpFoundation] = useState(currentFoundation)

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
        getFoundation();
    }, [])
    return (


        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

                    <Tooltip title="Actualice la información de su organización">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                        Mi sitio
                    </Typography>
                </CardActions>

            </Card>
            <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius }} >

                <Stack p={3}>
                    <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 18, color: grey[600] }} >
                        Configuración del sitio
                    </Typography>

                </Stack>
                <Divider />
                <CardContent sx={{ flexDirection: matchDownSm ? "column" : "row", alignItems: matchDownSm ? "center" : "flex-start", display: "flex", padding: 3, }}>

                    <Box p={5} marginRight={matchDownSm ? 0 : 3} maxWidth={380} maxHeight={380} sx={{
                        backgroundColor: "white", borderRadius: 8,
                        boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.12)",
                        mb: matchDownSm ? 3 : 0,

                    }}>
                        <img style={{ objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", width: "100%", height: "auto" }} src={`${process.env.REACT_APP_URL}/images/imagotipo.png`} alt="card" />
                    </Box>
                    <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius, display: "flex", flexDirection: "column", width: "100%", }} >

                        <Stack p={2}>
                            <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 14, color: grey[600] }} >
                                Acerca de
                            </Typography>

                        </Stack>
                        <Divider />

                        <Grid container spacing={3} mt={0} padding={2} >
                            <Grid item md={6} xs={12} >
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
                                    rows={3}
                                    variant="outlined"
                                    onChange={(event) => {
                                        setTmpFoundation({ ...tmpFoundation, mision: event.target.value })
                                    }}

                                />
                                <FormHelperText >Máximo 255 caracteres</FormHelperText>

                            </Grid>

                            <Grid item md={6} xs={12} >

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
                                    rows={3}
                                    variant="outlined"
                                    onChange={(event) => {
                                        setTmpFoundation({ ...tmpFoundation, vision: event.target.value })
                                    }}
                                />
                                <FormHelperText >Máximo 255 caracteres</FormHelperText>
                            </Grid>

                            <Grid item md={12} xs={12} >

                                <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 14, color: grey[600] }} >
                                    Información de contacto
                                </Typography>
                                <Divider style={{ marginTop: 2, marginBottom: 2 }} />

                            </Grid>

                            <Grid item md={6} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
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


                            </Grid>

                            <Grid item md={6} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
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

                            </Grid>


                            <Grid item md={12} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
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
                            </Grid>

                            <Grid item md={12} xs={12} >

                                <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 14, color: grey[600] }} >
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
                                    value={tmpFoundation.cuenta_donaciones}
                                    label="Cuenta de ahorros"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ maxLength: 45 }}
                                    fullWidth={true}
                                    variant="outlined"
                                    onChange={(event) => {
                                        setTmpFoundation({ ...tmpFoundation, cuenta_donaciones: event.target.value })
                                    }}

                                />
                            </Grid>

                            <Grid item md={12} xs={12} >
                                <LoadingButton loading={loading} variant="outlined"
                                    size="medium" variant="outlined" color="primary" sx={{ mt: 3, fontSize: 12, height: 40, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}
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
                    </Card>
                </CardContent>

            </Card >

        </Box >
    )
}