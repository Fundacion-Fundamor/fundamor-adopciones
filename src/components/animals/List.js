/* eslint-disable react-hooks/exhaustive-deps */
import './animal.scss'
import React, { useEffect, useContext, useState } from 'react'
import AnimalContext from '../../context/animal/animalContext'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Menu, MenuItem, Pagination, Popover, Radio, RadioGroup, Skeleton, Stack, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { grey } from '@mui/material/colors'
import { AiOutlinePlus, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'
import { BiErrorAlt, BiHelpCircle } from 'react-icons/bi'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { HiOutlineFilter } from 'react-icons/hi'
import { FaChevronDown } from 'react-icons/fa'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { BiBadgeCheck } from "react-icons/bi"
function List() {


    //datos globales y locales
    const { animals, message, loading, getAnimals, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales
    const [localData, setLocalData] = useState({
        list: [],
        animalsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
        filters: {
            search: "",
            specie: "",
            state: ""
        }
    })

    //navegación
    let history = useHistory();
    let { path, url } = useRouteMatch();

    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const MySwal = withReactContent(Swal);

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true

            });


            if (res.isConfirmed) {
                await handleAnimalMessage(null);
            }
        }
        if (message && message.showIn === "list" && !loading) {

            displayAlert();
        }
    }, [message, loading])

    useEffect(() => {
        getAnimals();
    }, []);

    useEffect(() => {

        let result = animals.filter(element => {

            let condition = true;


            if (localData.filters.search !== "") {


                if (!(element.nombre.toLowerCase().includes(localData.filters.search.toLowerCase().trim()))) {
                    condition = false;
                }

            }

            if (localData.filters.state !== "") {
                if (element.estado !== localData.filters.state) {
                    condition = false;
                }
            }

            if (localData.filters.specie !== "") {
                if (element.especie !== localData.filters.specie) {
                    condition = false;
                }
            }

            return condition ? element : null;

        })

        console.log(result.length)
        let totalPages = Math.ceil(result.length / localData.animalsPerPage);
        setLocalData({ ...localData, currentPage: 1, list: result, totalPages: totalPages })
    }, [animals, localData.filters, localData.animalsPerPage])




    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
                    <Box alignItems={"center"} display={"flex"}>
                        <Tooltip title="Agrega, edita , busca y elimina los animales registrados en la plataforma de adopción">
                            <IconButton>
                                <BiHelpCircle />
                            </IconButton>

                        </Tooltip>
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Listado de animales
                        </Typography>

                        {matchDownSm ? <Button
                            color="primary"
                            onClick={() => { history.push("/animals/new/-1"); }}
                            variant="contained"
                            startIcon={<AiOutlinePlus />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Agregar
                        </Button> : null}

                    </Box>
                    <Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>


                        {!matchDownSm ? <Button
                            color="primary"
                            onClick={() => { history.push("/animals/new/-1"); }}
                            variant="contained"
                            startIcon={<AiOutlinePlus />}
                            sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
                        >
                            Agregar
                        </Button> : null}


                        <TextField
                            sx={{
                                ml: 3, "& .MuiOutlinedInput-root": {

                                    borderRadius: "10px!important"

                                }
                            }}
                            id="input-with-icon-textfield"
                            onChange={(event) => {
                                setLocalData({
                                    ...localData,
                                    filters: {
                                        ...localData.filters,
                                        search: event.target.value,
                                    }

                                })

                            }}
                            size='small'
                            placeholder='Busca'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineSearch />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <FilterManager handleFilters={(specie = null, state = null) => {

                                            setLocalData({
                                                ...localData, filters: {
                                                    ...localData.filters,
                                                    specie: specie ?? "",
                                                    state: state ?? "",
                                                }
                                            })


                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </Box>
                </CardActions>
            </Card>
            <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
                <CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
                    {localData.list.map((element, index) => {

                        let start = (localData.currentPage * localData.animalsPerPage) - localData.animalsPerPage;
                        let end = (localData.currentPage * localData.animalsPerPage);
                        if ((index + 1) > start && (index + 1) <= end) {
                            return (

                                <Card key={index} sx={{
                                    margin: 2, borderRadius: 4,
                                    transition: "all .2s ease-in-out",
                                    ':hover': {
                                        transform: "scale(1.1)",

                                    },

                                }}
                                    onClick={() => {

                                        history.push(`${url}/${element.id_animal}`);

                                    }}
                                >

                                    <div
                                        style={{

                                            paddingBottom: "133px",
                                            background: theme.custom.primary.light
                                        }}

                                    ></div>
                                    <Box maxWidth={280} maxHeight={300}

                                        sx={{ top: "-114px", position: "relative", marginX: 2 }}

                                    >

                                        <AnimalImage />
                                    </Box>
                                    <CardContent sx={{ flexDirection: "row", justifyContent: "space-between", position: "relative", display: "flex", marginTop: "-91px" }}>
                                        <Stack>
                                            <Typography sx={{ fontWeight: "600", fontSize: 14, textTransform: "uppercase", color: grey[600] }}>{element.nombre}</Typography>
                                            <Typography sx={{ fontWeight: "100", fontSize: 13, textTransform: "capitalize", color: grey[500] }}>{element.especie} {element.sexo}</Typography>
                                        </Stack>
                                        <Stack>
                                            <Chip color={
                                                element.estado === "Adoptado" ? "success" :
                                                    element.estado === "Sin adoptar" ? "warning" : "primary"
                                            }


                                                sx={{
                                                    textTransform: "capitalize",
                                                    borderRadius: "8px",
                                                    display: "flex",


                                                }}



                                                icon={

                                                    element.estado === "Adoptado" ? <BiBadgeCheck size={24} /> :
                                                        element.estado === "Sin adoptar" ? <BiErrorAlt size={24} /> : <AiOutlineReload size={24} />


                                                }
                                                label={element.estado === "Adoptado" || element.estado === "Sin adoptar" ? element.estado : "En proceso"}
                                            />
                                        </Stack>
                                    </CardContent>

                                </Card>
                                // <AnimalCard
                                //     key={index}
                                //     animal={element}
                                // />
                            )
                        } else {
                            return null;
                        }
                    }
                    )}

                    {loading && animals.length === 0 ?
                        <Stack direction="row" mt={8} alignItems="center"><CircularProgress />
                            <Typography sx={{ fontWeight: "500", ml: 2 }}>Cargando...</Typography>
                        </Stack> : null}
                    {animals.length === 0 && !loading ?
                        <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay animales registrados</Typography> : null}

                    {localData.list.length === 0 && !loading && animals.length !== 0 ?
                        <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay coincidencias</Typography> : null}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row", mt: 4 }}>


                    <Pagination color="primary" count={localData.totalPages}
                        page={localData.currentPage}
                        onChange={(event, value) => { setLocalData({ ...localData, currentPage: value }) }} />

                    <RowsManager numRows={localData.animalsPerPage} handleRows={(val) => {

                        setLocalData({ ...localData, animalsPerPage: val })
                    }} />


                </CardActions>
            </Card>
        </Box>

    )
}


const FilterManager = ({ handleFilters }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [specie, setSpecie] = useState(null);
    const [animalState, setAnimalState] = useState(null)

    const theme = useTheme();

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>

            <IconButton
                aria-describedby={id} variant="contained"
                sx={{
                    backgroundColor: theme.custom.primary.light,
                    color: theme.custom.primary.dark,
                    borderRadius: 2
                }}
                onClick={handleClick}
            >
                <HiOutlineFilter size={16} cursor="pointer" />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: { borderRadius: 12 }
                }}
            >
                <Box sx={{ padding: 2 }}>
                    <Typography sx={{ fontWeight: "600" }}>Filtros</Typography>
                    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                        <FormLabel component="legend" sx={{ fontSize: 12, }}>Especie</FormLabel>
                        <RadioGroup
                            aria-label="specie"
                            defaultValue=""
                            name="radio-buttons-group-1"
                            row
                            value={specie}
                            onChange={(e) => { setSpecie(e.target.value) }}
                        >
                            <FormControlLabel value="gato" control={<Radio />} label="Gato" />
                            <FormControlLabel value="perro" control={<Radio />} label="Perro" />

                        </RadioGroup>
                    </FormControl>
                    <Divider />



                    <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                        <FormLabel component="legend" sx={{ fontSize: 12 }}>Estado</FormLabel>
                        <RadioGroup
                            aria-label="state"
                            defaultValue=""
                            name="radio-buttons-group-2"
                            value={animalState}
                            onChange={(e) => { setAnimalState(e.target.value) }}
                        >
                            <FormControlLabel value="Adoptado" control={<Radio />} label="Adoptado" />
                            <FormControlLabel value="En proceso de adopción" control={<Radio />} label="En proceso" />
                            <FormControlLabel value="Sin adoptar" control={<Radio />} label="Sin adoptar" />
                        </RadioGroup>
                    </FormControl>

                    <Stack direction="row" justifyContent={"space-between"} sx={{ marginTop: 2 }}>
                        <Button

                            sx={{ color: "text.secondary" }}
                            onClick={() => {
                                handleClose()
                                setSpecie(null);
                                setAnimalState(null);
                                handleFilters();
                            }}
                            variant="text"

                        >Limpiar</Button>
                        <Button

                            color="primary"
                            onClick={() => {
                                handleClose()
                                handleFilters(specie, animalState)
                            }}
                            variant="contained"

                        >Aplicar</Button>
                    </Stack>
                </Box>
            </Popover></>
    )
}

const RowsManager = ({ numRows, handleRows }) => {

    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        if (value) {
            handleRows(value);
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    return (<>

        <Button
            aria-describedby={"menu-rows"}
            color="primary"
            onClick={(ev) => handleClick(ev)}
            variant="text"
            endIcon={<FaChevronDown />}
            sx={{ mt: matchDownSm ? 3 : 0 }}
        >{numRows} por página</Button>


        <Menu
            id={"menu-rows"}
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(null)}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            PaperProps={{
                style: { borderRadius: 12 }
            }}
        >
            <MenuItem onClick={() => handleClose(10)}>10 animales</MenuItem>
            <MenuItem onClick={() => handleClose(30)}>30 animales</MenuItem>
            <MenuItem onClick={() => handleClose(50)}>50 animales</MenuItem>
        </Menu>
    </>)
}


const AnimalImage = () => {


    const [isLoaded, setIsLoaded] = useState(false)

    return <>

        {!isLoaded ? <Skeleton variant="rectangular"  height={230} sx={{ borderRadius: "8px" }} /> : null}
        <CardMedia
            onLoad={() => { setIsLoaded(true) }}
            component="img"
            height="230"
            sx={{ borderRadius: "8px" }}
            image="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/6124cf315cafe8c3101f8bab/perro-slide_0.jpg"
            alt="green iguana"
        />

    </>

}
export default List