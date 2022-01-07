import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors';
import React, { useContext, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import { IoKeypad } from 'react-icons/io5';
import AuthContext from '../../context/auth/authContext';



export default function Profile() {


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { logout, user } = useContext(AuthContext);

    const [indexTab, setIndexTab] = useState(0)
    return (

        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: matchDownSm ? "column" : "row" }}>

                    <Tooltip title="Actualiza tu información de perfil">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                        Mi perfil
                    </Typography>
                </CardActions>

            </Card>
            <Card variant="outlined" sx={{ borderRadius: theme.custom.borderRadius }} >
                <Stack p={3}>
                    <Typography variant="t2" sx={{ fontWeight: "600", fontSize: 18, color: grey[600] }} >
                        Configuración de la cuenta
                    </Typography>

                </Stack>
                <Divider />

                <CardContent sx={{ flexDirection: "row", display: "flex", padding: 0 }}>

                    <Stack direction={"column"} minWidth={300} display={"flex"} p={2}>

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
                        // selected={selectedIndex === 1}
                        // onClick={(event) => handleListItemClick(event, 1, '/profile')}
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
                                <ListItemText sx={{ margin: 0, padding: 0, mt: -1 }} primary={<Typography variant="caption">Actualiza tu información</Typography>} />
                            </Stack>
                        </ListItemButton>

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
                        // selected={selectedIndex === 1}
                        // onClick={(event) => handleListItemClick(event, 1, '/profile')}
                        >
                            <ListItemIcon sx={{
                                minWidth: "40px",
                                color: grey[600],
                                '&:hover': {
                                    color: theme.custom.primary.dark,

                                }
                            }}>
                                <IoKeypad style={{ fontWeight: "bold" }} />
                            </ListItemIcon>
                            <Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
                                <ListItemText primary={<Typography sx={{ fontSize: 13 }} variant="subtitle2">Cambiar contraseña</Typography>} />
                                <ListItemText sx={{ margin: 0, padding: 0, mt: -1 }} primary={<Typography variant="caption">Actualiza tu contraseña</Typography>} />
                            </Stack>
                        </ListItemButton>

                    </Stack>

                    {indexTab === 0 ? <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", borderLeftWidth: 1, borderLeftStyle: "solid", borderColor: grey[300] }} p={2} >


                        <Stack direction={"row"} alignItems={"center"} >
                            <Avatar

                                sx={{
                                    backgroundColor: theme.custom.secondary.dark,
                                    color: "white",

                                    textTransform: "uppercase",
                                    width: 56, height: 56
                                }}

                                // ref={anchorRef}

                                aria-haspopup="true"
                                color="inherit"
                            >{user ? user.nombre.charAt(0) : ""}</Avatar>
                            <Typography sx={{ fontSize: 13, textTransform: "capitalize", ml: 1 }} variant="subtitle2">{user.rol}</Typography>
                        </Stack>

                        <Grid container spacing={2} mt={0}>
                            <Grid item md={6} xs={12} >

                                <TextField
                                    sx={{
                                        height:"90px",
                                        "& .MuiOutlinedInput-root": {

                                            borderRadius: "10px!important"

                                        }
                                    }}

                                    label="Nombre"
                                    InputLabelProps={{ style: { background: "white",paddingLeft:"5px",paddingRight:"5px" } }}

                                    fullWidth={true}
                                    id="input-with-icon-textfield"
                                    // onChange={(event) => {
                                    //     setLocalData({
                                    //         ...localData,
                                    //         filters: {
                                    //             ...localData.filters,
                                    //             search: event.target.value,
                                    //         }

                                    //     })

                                    // }}
                                    size='small'


                                    variant="outlined"
                                />

                            </Grid>
                        </Grid>


                    </Box> : <Stack>

                    </Stack>}

                </CardContent>
            </Card>

        </Box>
    )
}
