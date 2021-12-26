import { AppBar, Avatar, Box, Button, ButtonBase, Card, Chip, ClickAwayListener, Divider,  List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useRef, useContext } from 'react'
import {  useTheme } from '@mui/material/styles';
import { grey,  } from '@mui/material/colors';
import { AiOutlineLogout, AiOutlineMenu, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import Transitions from './Transitions';

import AuthContext from '../../context/auth/authContext';


export default function Topbar({ drawerOpen, handleDrawer }) {

    const theme = useTheme();

    const { logout, user } = useContext(AuthContext);
    const [selectedIndex, setSelectedIndex] = useState(-1);



    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        // if (route && route !== '') {
        //     navigate(route);
        // }
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{

                bgcolor: theme.custom.bg,
                transition: drawerOpen ? theme.transitions.create('width') : 'none'
            }}
        >
            <Toolbar sx={{ pt: "10px", justifyContent: "space-between" }}>
                <Box sx={{ flexDirection: "row", minWidth: "230px", display: "flex", alignItems: "center" }}>
                    <img
                        src={`./images/isotipo.png`}
                        alt={"logo"}
                        width={40}
                        height={40}
                        loading="lazy"
                    />
                    {/* </IconButton> */}
                    <Typography variant="t1" ml="8px" fontWeight={"700"} maxWidth={130} color={theme.custom.fc1} component="div" sx={{ flexGrow: 1 }}>
                        Fundamor
                    </Typography>

                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', width: "35px", height: "35px", marginRight: "10px", marginLeft: "10px" }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                transition: 'all .2s ease-in-out',
                                background: theme.custom.primary.light,
                                color: theme.custom.primary.dark,
                                '&:hover': {
                                    background: theme.custom.primary.dark,
                                    color: theme.custom.primary.light
                                }
                            }}
                            onClick={handleDrawer}
                            color="inherit"
                        >
                            <AiOutlineMenu />
                        </Avatar>
                    </ButtonBase>
                </Box>
                <Box>
                    {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', width: "35px", height: "35px", marginRight: "10px" }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                transition: 'all .2s ease-in-out',
                                background: theme.custom.primary.light,
                                color: theme.custom.primary.dark,
                                '&:hover': {
                                    background: theme.custom.primary.dark,
                                    color: theme.custom.primary.light
                                }
                            }}
                            // onClick={handleDrawer}
                            color="inherit"
                        >
                            <AiOutlineBell />
                        </Avatar>
                    </ButtonBase> */}
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.custom.primary.light,
                            backgroundColor: theme.custom.primary.light,
                            color: "white",
                            '&[aria-controls="menu-list-grow"], &:hover': {
                                borderColor: theme.custom.primary.dark,
                                background: `${theme.custom.primary.light}!important`,
                              
                                '& svg': {
                                    stroke: theme.custom.primary.light,
                                }
                            },
                            '& .MuiChip-label': {
                                lineHeight: 0
                            },
                            cursor: 'pointer',
                        }}
                        icon={
                            <Avatar

                                sx={{
                                    backgroundColor: theme.custom.secondary.dark,
                                    color:"white",
                                    margin: '8px 0 8px 8px !important',
                                    textTransform:"uppercase",
                                    width: 36, height: 36
                                }}

                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                            >{user.nombre.charAt(0)}</Avatar>
                        }
                        label={<AiOutlineSetting color={theme.custom.primary.dark} size="1.5rem" />}
                        variant="outlined"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="primary"
                    />

                    <Popper
                        placement="bottom-end"
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 14]
                                    }
                                }
                            ]
                        }}
                    >
                        {({ TransitionProps }) => (
                            <Transitions in={open} {...TransitionProps}>
                                <Paper sx={{ borderRadius: '12px'}}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <Card sx={{ borderRadius: '12px', width: 260 }}>
                                            <Box sx={{ p: 2 }}>
                                                <Stack marginBottom={"10px"}>
                                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                                        <Typography fontWeight={"600"} variant="t3">Hola,{" "}
                                                        
                                                            <Typography component="span" variant="t3" sx={{ fontWeight: 400 }}>
                                                                {user.nombre}
                                                            </Typography>
                                                            </Typography>
                                                        
                                                    </Stack>
                                                    <Typography variant="subtitle2" fontWeight={100} sx={{ textTransform: "capitalize" }} >{user.rol}</Typography>
                                                </Stack>
                                                <Divider />
                                            </Box>
                                            <Box sx={{ paddingX: 2 }}>

                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        // minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        },
                                                        '& .Mui-selected':{
                                                            backgroundColor: theme.custom.primary.light,
                                                            color:theme.custom.primary.dark
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: `8px`,

                                                            color: grey[600],
                                                            '&:hover': {
                                                                background: theme.custom.primary.light,

                                                            }
                                                        }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                                    >
                                                        <ListItemIcon sx={{
                                                            minWidth: "40px",
                                                            color: grey[600],
                                                            '&:hover': {
                                                                color: theme.custom.primary.dark,

                                                            }
                                                        }}>
                                                            <AiOutlineSetting />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Configurar sitio</Typography>} />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: `8px`,

                                                            color: grey[600],
                                                            '&:hover': {
                                                                background: theme.custom.primary.light,

                                                            },
                                                             '&:active': {
                                                                background: theme.custom.primary.light,

                                                            }
                                                        }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                    >
                                                        <ListItemIcon sx={{
                                                            minWidth: "40px",
                                                            color: grey[600],
                                                            '&:hover': {
                                                                color: theme.custom.primary.dark,

                                                            }
                                                        }}>
                                                            <AiOutlineUser />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Mi perfil</Typography>} />

                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: `8px`,

                                                            color: grey[600],
                                                            '&:hover': {
                                                                background: theme.custom.primary.light,

                                                            }
                                                        }}
                                                        selected={selectedIndex === 4}
                                                        onClick={() => logout()}
                                                    >
                                                        <ListItemIcon sx={{
                                                            minWidth: "40px",
                                                            color: grey[600],
                                                            '&:hover': {
                                                                color: theme.custom.primary.dark,

                                                            }
                                                        }}>
                                                            <AiOutlineLogout />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Salir</Typography>} />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </Card>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </Popper>
                </Box>
            </Toolbar>
        </AppBar>
    )

}