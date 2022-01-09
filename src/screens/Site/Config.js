import { Box, Card, CardActions, CardContent, Divider, Grid, IconButton, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { BiHelpCircle } from 'react-icons/bi'




export default function Config() {

    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

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
                <CardContent sx={{ flexDirection: matchDownSm ? "column" : "row", display: "flex", padding: 3, }}>

                    <Box p={5} marginRight={3} maxWidth={380} maxHeight={380} sx={{
                        backgroundColor: "white", borderRadius: 8,
                        boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.12)"


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
                                    // value={userInSession.nombre}
                                    label="Misión"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}
                                    multiline={true}
                                    rows={3}
                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

                            </Grid>

                            <Grid item md={6} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
                                    }}
                                    // value={userInSession.nombre}
                                    label="Visión"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}
                                    multiline={true}
                                    rows={3}
                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

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
                                    // value={userInSession.nombre}
                                    label="Teléfono"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}

                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

                            </Grid>

                            <Grid item md={6} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
                                    }}
                                    // value={userInSession.nombre}
                                    label="Correo"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}

                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

                            </Grid>


                            <Grid item md={12} xs={12} >

                                <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        },
                                    }}
                                    // value={userInSession.nombre}
                                    label="Dirección"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}

                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

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
                                    // value={userInSession.nombre}
                                    label="Cuenta de ahorros"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    inputProps={{ height: "20px", padding: "15px" }}
                                    fullWidth={true}

                                    variant="outlined"
                                // onChange={(event) => {
                                //     setUserInSession({ ...userInSession, nombre: event.target.value })
                                // }}
                                // onBlur={() => {

                                //     console.log(userInSession.correo)
                                //     if (userInSession.nombre.trim() === "") {

                                //         setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                                //     } else {
                                //         setErrors({ ...errors, nombre: null })

                                //     }

                                // }}
                                />

                                {/* {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>} */}

                            </Grid>
                        </Grid>
                    </Card>
                </CardContent>

            </Card>

        </Box>
    )
}