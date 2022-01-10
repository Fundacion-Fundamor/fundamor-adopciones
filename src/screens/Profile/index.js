/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, FormHelperText, Grid, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineInfoCircle, AiOutlineSave } from 'react-icons/ai';
import { BiCheckCircle, BiHelpCircle } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import { IoKeypad } from 'react-icons/io5';
import AuthContext from '../../context/auth/authContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Profile() {


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { user, message, handleAuthMessage, loading, } = useContext(AuthContext);

    const [indexTab, setIndexTab] = useState(0);

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
                await handleAuthMessage(null);
            }
        }
        if (message && message.showIn === "profile" && !loading) {

            displayAlert();
        }
    }, [message, loading])
    
    return (

        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

                    <Tooltip title="Actualice su información de perfil">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                        Mi perfil
                    </Typography>
                </CardActions>

            </Card>
            {user ? <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius }} >
                <Stack p={3}>
                    <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 18, color: grey[600] }} >
                        Configuración de la cuenta
                    </Typography>

                </Stack>
                <Divider />

                <CardContent sx={{ flexDirection: matchDownSm ? "column" : "row", display: "flex", padding: 0 }}>

                    <Stack direction={"column"} minWidth={300} display={"flex"} p={2} maxHeight={matchDownSm ? "100%" : 30}>

                        <ListItemButton
                            sx={{
                                borderRadius: `8px`,

                                color: grey[600],
                                // '&:hover': {
                                //     background: theme.custom.primary.light,

                                // },
                                // '&:active': {
                                //     background: theme.custom.primary.light,

                                // }
                            }}
                            selected={indexTab === 0}
                            onClick={(event) => setIndexTab(0)}
                        >
                            <ListItemIcon sx={{
                                minWidth: "40px",
                                color: grey[600],
                                '&:hover': {
                                    color: theme.custom.primary.dark,

                                }
                            }}>
                                <FaUserTie style={{ fontWeight: "bold" }} />
                            </ListItemIcon>
                            <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                                <ListItemText primary={<Typography sx={{ fontSize: 13 }} variant="subtitle2">Perfil del usuario</Typography>} />
                                <ListItemText sx={{ margin: 0, padding: 0, mt: -1 }} primary={<Typography variant="caption">Actualice su información</Typography>} />
                            </Stack>
                        </ListItemButton>

                        <ListItemButton
                            sx={{
                                borderRadius: `8px`,

                                color: grey[600],

                                '& .css-ns70o-MuiButtonBase-root-MuiListItemButton-root.Mui-selected ': {
                                    backgroundColor: "red!important",


                                },
                                '&:active': {
                                    background: theme.custom.primary.light,
                                }

                            }}
                            selected={indexTab === 1}
                            onClick={(event) => setIndexTab(1)}

                        >
                            <ListItemIcon sx={{
                                minWidth: "40px",
                                color: grey[600],
                                '&:hover': {
                                    color: theme.custom.primary.dark,

                                },

                            }}
                            >
                                <IoKeypad style={{ fontWeight: "bold" }} />
                            </ListItemIcon>
                            <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                                <ListItemText primary={<Typography sx={{ fontSize: 13 }} variant="subtitle2">Cambiar contraseña</Typography>} />
                                <ListItemText sx={{ margin: 0, padding: 0, mt: -1 }} primary={<Typography variant="caption">Actualice su contraseña</Typography>} />
                            </Stack>
                        </ListItemButton>

                    </Stack>

                    {indexTab === 0 ?

                        <UserProfileSection />
                        : <PasswordSection />}

                </CardContent>
                <Divider style={{ marginBottom: 37 }} />
            </Card> : null}


        </Box>
    )
}


const UserProfileSection = () => {

    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { updateUserData, user, loading, } = useContext(AuthContext);

    const [userInSession, setUserInSession] = useState(user)
    const [errors, setErrors] = useState({

        name: null, email: null
    })


    const onSaveChanges = async () => {

        if (userInSession.nombre.trim() === "") {

            setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
        } else if (regexEmail.test(userInSession.correo) === false) {

            setErrors({ ...errors, email: "Debe ingresar un email válido" })
        } else {

            updateUserData({
                correo: userInSession.correo,
                id_empleado: userInSession.id_empleado,
                nombre: userInSession.nombre
            });
        }

    }



    return (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", borderTopWidth: matchDownSm ? 1 : 0, borderLeftWidth: matchDownSm ? 0 : 1, borderTopStyle: !matchDownSm ? "none" : "solid", borderLeftStyle: matchDownSm ? "none" : "solid", borderColor: grey[300] }} p={3} >


        <Stack direction={"row"} alignItems={"center"} >
            <Avatar

                sx={{
                    backgroundColor: theme.custom.secondary.dark,
                    color: "white",

                    textTransform: "uppercase",
                    width: 66, height: 66,
                    "& img": {
                        width: "70%",
                        height: "70%"
                    }

                }}
                src='/images/human.png'
                aria-haspopup="true"
                color="inherit"
            />

            <Typography sx={{ fontSize: 16, textTransform: "capitalize", ml: 1 }} variant="subtitle2">{user.rol}</Typography>
            <BiCheckCircle style={{ marginLeft: 5 }} color='#3bbceb' size={24} />
        </Stack>

        <Grid container spacing={3} mt={0}>
            <Grid item md={6} xs={12} >
                <>
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {

                                borderRadius: "10px!important"

                            },
                        }}
                        value={userInSession.nombre}
                        label="Nombre"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        inputProps={{ height: "20px", padding: "15px" }}
                        fullWidth={true}
                        variant="outlined"
                        onChange={(event) => {
                            setUserInSession({ ...userInSession, nombre: event.target.value })
                        }}
                        onBlur={() => {

                            console.log(userInSession.correo)
                            if (userInSession.nombre.trim() === "") {

                                setErrors({ ...errors, nombre: "Debe ingresar un nombre" })
                            } else {
                                setErrors({ ...errors, nombre: null })

                            }

                        }}
                    />

                    {errors.nombre && <FormHelperText error={true}>{errors.nombre}</FormHelperText>}
                </>


            </Grid>
            <Grid item md={6} xs={12} >

                <TextField
                    sx={{
                        "& .MuiOutlinedInput-root": {

                            borderRadius: "10px!important"

                        },
                    }}
                    value={userInSession.id_empleado}
                    label="Identificación"
                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                    inputProps={{ height: "20px", padding: "15px" }}
                    fullWidth={true}
                    disabled={true}

                    variant="outlined"
                />

            </Grid>

            <Grid item md={12} xs={12} >
                <>
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {

                                borderRadius: "10px!important"

                            },
                        }}

                        value={userInSession.correo}
                        label="Correo electrónico"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        inputProps={{ height: "10px", }}
                        fullWidth={true}
                        variant="outlined"
                        onChange={(event) => {
                            setUserInSession({ ...userInSession, correo: event.target.value })
                        }}

                        onBlur={() => {


                            if (regexEmail.test(userInSession.correo) === false) {

                                setErrors({ ...errors, email: "Debe ingresar un email válido" })
                            } else {
                                setErrors({ ...errors, email: null })

                            }

                        }}
                    />


                    {errors.email && <FormHelperText error={true}>{errors.email}</FormHelperText>}
                </>

            </Grid>



            <Grid item md={12} xs={12} >

                <Button size="medium" variant="outlined" color="primary" sx={{ mt: 3, fontSize: 12, height: 40, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}
                    onClick={() => onSaveChanges()}
                    startIcon={<AiOutlineSave />}
                >Guardar cambios</Button>

            </Grid>
        </Grid>


    </Box>)
}

const PasswordSection = () => {


    const { updateUserPassword, loading } = useContext(AuthContext);
    const [values, setValues] = useState({

        actualPassword: "",
        newPassword: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({

        actualPassword: null,
        newPassword: null,
        passwordConfirm: null


    })


    const onSubmit = () => {



        if (values.actualPassword.trim() === "") {
            setErrors({ ...errors, actualPassword: "Debe ingresar su contraseña actual" })
        } else if (values.newPassword.length < 6) {
            setErrors({ ...errors, newPassword: "La contraseña debe tener al menos 6 caracteres" })

        } else if (values.newPassword.trim() !== "" && values.passwordConfirm !== values.newPassword) {
            setErrors({ ...errors, passwordConfirm: "La contraseñas no coinciden" })

        } else {
            updateUserPassword(values.actualPassword, values.passwordConfirm)
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", borderLeftWidth: 1, borderLeftStyle: "solid", borderColor: grey[300] }} p={3} >



            <Grid container spacing={3} mt={0}>

                <Grid item md={12} xs={12} flexDirection={"row"} alignItems={"center"} display={"flex"}>
                    <AiOutlineInfoCircle  color='#1976d2' size={24}/>
                    <Typography sx={{ fontSize: 12, ml: 1,color:"#1976d2"}} variant="subtitle2">Si desea actualizar su contraseña, debe ingresar su contraseña actual y posteriormente la nueva contraseña </Typography>

                </Grid>
                <Grid item md={12} xs={12} >

                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {

                                borderRadius: "10px!important"

                            },
                        }}

                        value={values.actualPassword}
                        label="Contraseña actual"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        inputProps={{ height: "10px", }}
                        fullWidth={true}
                        variant="outlined"
                        onChange={(event) => {
                            setValues({ ...values, actualPassword: event.target.value })
                        }}

                        onBlur={() => {
                            if (errors.actualPassword) {
                                setErrors({ ...errors, actualPassword: null })

                            }
                        }}
                    />
                    {errors.actualPassword && <FormHelperText error={true}>{errors.actualPassword}</FormHelperText>}

                </Grid>
                <Grid item md={6} xs={12} >

                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px!important"
                            },
                        }}

                        label="Nueva contraseña"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        inputProps={{ height: "20px", padding: "15px" }}
                        fullWidth={true}
                        variant="outlined"
                        value={values.newPassword}
                        onChange={(event) => {
                            setValues({ ...values, newPassword: event.target.value })
                        }}

                        onBlur={() => {


                            if (values.newPassword.trim() !== "") {

                                if (values.newPassword.length < 6) {
                                    setErrors({ ...errors, newPassword: "La contraseña debe tener al menos 6 caracteres" })
                                } else if (errors.newPassword) {

                                    setErrors({ ...errors, newPassword: null })

                                }
                            } else {
                                if (errors.newPassword) {

                                    setErrors({ ...errors, newPassword: null })

                                }
                            }


                        }}
                    />
                    {errors.newPassword && <FormHelperText error={true}>{errors.newPassword}</FormHelperText>}

                </Grid>
                <Grid item md={6} xs={12} >

                    <TextField
                        sx={{
                            // height: "90px",

                            "& .MuiOutlinedInput-root": {

                                borderRadius: "10px!important"

                            },
                        }}
                        value={values.passwordConfirm}
                        label="Confirmación de contraseña"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        inputProps={{ height: "20px", padding: "15px" }}
                        fullWidth={true}
                        variant="outlined"
                        onChange={(event) => {
                            setValues({ ...values, passwordConfirm: event.target.value })
                        }}

                        onBlur={() => {

                            if (values.newPassword.trim() !== "" && values.newPassword !== values.passwordConfirm) {

                                setErrors({ ...errors, passwordConfirm: "La contraseñas no coinciden" })

                            } else if (errors.passwordConfirm) {

                                setErrors({ ...errors, passwordConfirm: null });

                            }

                        }}

                    />
                    {errors.passwordConfirm && <FormHelperText error={true}>{errors.passwordConfirm}</FormHelperText>}


                </Grid>




                <Grid item md={12} xs={12} >

                    <Button size="medium" variant="outlined" color="primary" sx={{ mt: 3, fontSize: 12, height: 40, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}
                        onClick={() => onSubmit()}
                        startIcon={<AiOutlineSave />}
                    >Establecer nueva contraseña</Button>

                </Grid>
            </Grid>


        </Box>
    )
}