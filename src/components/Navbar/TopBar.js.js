import { AppBar, Avatar, Box, ButtonBase, Card, Chip, ClickAwayListener, Divider, List, ListItemButton, ListItemIcon, ListItemText, Popper, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState, useRef, useContext } from 'react'
import { useTheme } from '@mui/material/styles';
import { AiOutlineLogout, AiOutlineMenu, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import Transitions from './Transitions';

import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
import BreadCumbContext from '../../context/breadcumb/breadcumbContext';


export default function Topbar({ drawerOpen, handleDrawer }) {

    const theme = useTheme();

    const { logout, user } = useContext(AuthContext);
    const { selectPage, currentPage } = useContext(BreadCumbContext);


    const history = useHistory()

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleListItemClick = (event, index, route = '') => {
        selectPage(index)
        handleClose(event);

        history.push(route)
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
            <Toolbar sx={{ padding: "10px  16px", justifyContent: "space-between" }}>
                <Box sx={{ flexDirection: "row", minWidth: "230px", display: "flex", alignItems: "center", fontFamily: "Nunito" }}>
                    <img
                        src={`./images/isotipo.png`}
                        alt={"logo"}
                        width={40}
                        height={40}
                        loading="lazy"
                    />
                    {/* </IconButton> */}
                    <Typography variant="t1" ml="8px" fontWeight={"900"} color="#de6426" maxWidth={130} component="div" sx={{ flexGrow: 1 }}>
                        Fundamor
                    </Typography>

                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', width: "35px", height: "35px", marginRight: "10px", marginLeft: "10px" }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                transition: 'all .2s ease-in-out',
                                background: theme.custom.primary.light,
                                color: "white",
                                '&:hover': {
                                    background: theme.custom.primary.dark,

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
                                borderColor: theme.custom.secondary.dark,
                                background: `${theme.custom.secondary.dark}!important`,

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
                                    background: "#E0B47F",
                                    color: "white",
                                    fontWeight: 800,
                                    margin: '8px 0 8px 8px !important',
                                    textTransform: "uppercase",
                                    width: 36, height: 36
                                }}

                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                            // color={theme.custom.secondary.dark}
                            >{user ? user.nombre.charAt(0) : ""}</Avatar>
                        }
                        label={<AiOutlineSetting color={"white"} size="1.5rem" />}
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

                                <ClickAwayListener onClickAway={handleClose}>
                                    <Card sx={{ borderRadius: '12px', width: 260, boxShadow: " 0px 2px 12px -5px rgb(0 0 0 / 60%)" }} variant="outlined">
                                        <Box sx={{ p: 2 }}>
                                            <Stack marginBottom={"10px"}>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography fontWeight={"800"} variant="t3">Hola,{" "}

                                                        <Typography component="span" variant="t3" sx={{ fontWeight: 400 }}>
                                                            {user ? user.nombre : ""}
                                                        </Typography>
                                                    </Typography>

                                                </Stack>
                                                <Typography variant="subtitle2" fontWeight={400} sx={{ textTransform: "capitalize" }} >{user.rol}</Typography>
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
                                                    '& .Mui-selected': {
                                                        background: theme.custom.primary.light,
                                                        backgroundColor: `${theme.custom.primary.light}!important`,
                                                        color: "white",
                                                        '& .MuiListItemIcon-root': {
                                                            color: "white",
                                                        },
                                                    },
                                                    '& .Mui-selected:hover': {
                                                        background: theme.custom.primary.light,
                                                        color: "white",
                                                        '& .MuiListItemIcon-root': {
                                                            color: "white",
                                                        },
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `8px`,
                                                        fontWeight: 700,
                                                        color: theme.custom.primary.dark,
                                                        '&:hover': {
                                                            '& .MuiListItemIcon-root': {
                                                                color: "white",
                                                            },
                                                            color: "white",
                                                            background: theme.custom.primary.light,

                                                        }
                                                    }}
                                                    selected={currentPage === 1}
                                                    onClick={(event) => handleListItemClick(event, 1, '/siteConfig')}
                                                >
                                                    <ListItemIcon sx={{
                                                        minWidth: "40px",
                                                        color: theme.custom.primary.light,
                                                        '&:hover': {
                                                            color: "white",

                                                        }
                                                    }}>
                                                        <AiOutlineSetting />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Configurar sitio</Typography>} />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `8px`,
                                                        fontWeight: 700,
                                                        color: theme.custom.primary.dark,
                                                        '&:hover': {
                                                            '& .MuiListItemIcon-root': {
                                                                color: "white",
                                                            },
                                                            color: "white",
                                                            background: theme.custom.primary.light,

                                                        }
                                                    }}
                                                    selected={currentPage === 2}
                                                    onClick={(event) => handleListItemClick(event, 2, '/profile')}
                                                >
                                                    <ListItemIcon sx={{
                                                        minWidth: "40px",
                                                        color: theme.custom.primary.light,
                                                        '&:hover': {
                                                            color: "white",

                                                        }
                                                    }}>
                                                        <AiOutlineUser />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Mi perfil</Typography>} />

                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{
                                                        borderRadius: `8px`,
                                                        fontWeight: 700,
                                                        color: theme.custom.primary.dark,
                                                        '&:hover': {
                                                            '& .MuiListItemIcon-root': {
                                                                color: "white",
                                                            },
                                                            color: "white",
                                                            background: theme.custom.primary.light,

                                                        }
                                                    }}

                                                    onClick={() => {
                                                        localStorage.removeItem("token");
                                                        logout()
                                                
                                                        history.replace("http://localhost:4000".replace,"landing")
                                                        window.location.replace("http://localhost:4000");

                                                       
                                                    }}
                                                >
                                                    <ListItemIcon sx={{
                                                        minWidth: "40px",
                                                        color: theme.custom.primary.light,

                                                        '&:hover': {
                                                            color: "white",

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

                            </Transitions>
                        )}
                    </Popper>
                </Box>
            </Toolbar>
        </AppBar>
    )

}