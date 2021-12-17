import { AppBar, Avatar, Box, Button, ButtonBase, Chip, ClickAwayListener, CssBaseline, List, ListItemButton, Paper, Popper, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { AiOutlineBell, AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai';
import Transitions from './Transitions';
import PerfectScrollbar from 'react-perfect-scrollbar';
const drawerWidth = 90


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

export default function Dashboard() {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    const [selectedIndex, setSelectedIndex] = useState(-1);
    // Handle left drawer
    const [leftDrawerOpened, setLeftDrawerOpened] = useState(true)

    const handleLeftDrawerToggle = () => {
        setLeftDrawerOpened(!leftDrawerOpened)
    }

    // useEffect(() => {
    //     dispatch({ type: SET_MENU, opened: !matchDownMd });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [matchDownMd]);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };


    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (


        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.custom.bg,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <img
                        src={`./images/isotipo.png`}
                        alt={"logo"}
                        width={40}
                        height={40}
                        loading="lazy"
                    />
                    {/* </IconButton> */}
                    <Typography variant="t1" ml="8px" fontWeight={"700"} color={theme.custom.fc1} component="div" sx={{ flexGrow: 1 }}>
                        Fundamor
                    </Typography>

                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', width: "35px", height: "35px", marginRight: "10px" }}>
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
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <AiOutlineMenu />
                        </Avatar>
                    </ButtonBase>


                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', width: "35px", height: "35px", marginRight: "10px" }}>
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
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <AiOutlineBell />
                        </Avatar>
                    </ButtonBase>
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.palette.primary.light,
                            backgroundColor: theme.palette.primary.light,
                            '&[aria-controls="menu-list-grow"], &:hover': {
                                borderColor: theme.palette.primary.main,
                                background: `${theme.palette.primary.main}!important`,
                                color: theme.palette.primary.light,
                                '& svg': {
                                    stroke: theme.palette.primary.light
                                }
                            },
                            '& .MuiChip-label': {
                                lineHeight: 0
                            },
                            cursor: 'pointer',
                        }}
                        icon={
                            <Avatar
                                src={"`./images/isotipo.png`"}
                                sx={{
                                    // ...theme.typography.mediumAvatar,
                                    margin: '8px 0 8px 8px !important',

                                    width: 36, height: 36
                                }}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                color="inherit"
                            />
                        }
                        label={<AiOutlineSetting color={theme.palette.primary.main} size="1.5rem" />}
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
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <Box border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                            <Box sx={{ p: 2 }}>
                                                <Stack>
                                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                                        <Typography variant="h4">Good Morning,</Typography>
                                                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                            Johne Doe
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="subtitle2">Project Admin</Typography>
                                                </Stack>
                                      
                                            </Box>
                                            <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                                <Box sx={{ p: 2 }}>

                                                    <List
                                                        component="nav"
                                                        sx={{
                                                            width: '100%',
                                                            maxWidth: 350,
                                                            minWidth: 300,
                                                            backgroundColor: theme.palette.background.paper,
                                                            borderRadius: '10px',
                                                            [theme.breakpoints.down('md')]: {
                                                                minWidth: '100%'
                                                            },
                                                            '& .MuiListItemButton-root': {
                                                                mt: 0.5
                                                            }
                                                        }}
                                                    >
                                                        {/* <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 0}
                                                            onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                                        >
                                                            <ListItemIcon>
                                                                <IconSettings stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                        </ListItemButton>
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 1}
                                                            onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                        >
                                                            <ListItemIcon>
                                                                <IconUser stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    <Grid container spacing={1} justifyContent="space-between">
                                                                        <Grid item>
                                                                            <Typography variant="body2">Social Profile</Typography>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Chip
                                                                                label="02"
                                                                                size="small"
                                                                                sx={{
                                                                                    bgcolor: theme.palette.warning.dark,
                                                                                    color: theme.palette.background.default
                                                                                }}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                            selected={selectedIndex === 4}
                                                            onClick={handleLogout}
                                                        >
                                                            <ListItemIcon>
                                                                <IconLogout stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                        </ListItemButton> */}
                                                    </List>
                                                </Box>
                                            </PerfectScrollbar>
                                        </Box>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <h2>Sidebar</h2>
            {/* <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} /> */}

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}

                {/* <Outlet /> */}
            </Main>
            {/* <Customization /> */}
        </Box >
    )
}