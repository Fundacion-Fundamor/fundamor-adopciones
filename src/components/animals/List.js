/* eslint-disable react-hooks/exhaustive-deps */
import './animal.scss'
import React, { useEffect, useContext, useState } from 'react'
import AnimalCard from '../../components/Card'
import AnimalContext from '../../context/animal/animalContext'
import { Box, Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { grey } from '@mui/material/colors'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { HiOutlineFilter } from 'react-icons/hi'
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));



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
        // setLocalData({ ...localData,  });
    }, [animals, localData.filters])




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
                    </Box>
                    <Box alignItems={"center"} display={"flex"} flexDirection={"row"}>

                        <Button
                            className="employeeBanner__button"
                            color="primary"
                            onClick={() => { history.push("/animals/new/-1"); }}
                            variant="contained"
                            startIcon={<AiOutlinePlus />}
                            sx={{ marginTop: matchDownSm ? 2 : 0, borderRadius: theme.custom.borderRadius }}
                        >
                            Agregar
                        </Button>


                        <IconButton
                            aria-label="edit"
                            sx={{
                                backgroundColor: "#ffa726", ml: 4,
                            }}
                            onClick={() => {
                                // console.log(params)
                                // selectAdopter(item)
                            }}
                        >
                            <HiOutlineFilter size={16} cursor="pointer" color={"white"} />
                        </IconButton>
                        <TextField
                            sx={{
                                ml: 3, "& .MuiOutlinedInput-root": {

                                    borderRadius: "18px!important"

                                }
                            }}
                            id="input-with-icon-textfield"
                            // label="TextField"
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
                            }}
                            variant="outlined"
                        />


                        {/* <FormControl sx={{borderRadius:12}}>
                            <TextField id="outlined" className={customClass.root} label="Outlined" variant="outlined" />
                        </FormControl> */}
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
                                <AnimalCard
                                    key={index}
                                    animal={element}
                                />
                            )
                        } else {
                            return null;
                        }
                    }
                    )}

                    {localData.list.length === 0 && !loading ? <h3>No hay animales registrados</h3> : null}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row", mt: 4 }}>

                    <Box flexDirection="row">
                        <IconButton
                            aria-label="edit"
                            sx={{
                                backgroundColor: "#ffa726", mr: 4,
                            }}
                            onClick={() => {
                                if (localData.currentPage > 1) {
                                    setLocalData({ ...localData, currentPage: localData.currentPage - 1 })
                                }
                            }}
                        >
                            <FaChevronLeft size={16} cursor="pointer" color={"white"} />
                        </IconButton>

                        {[...Array(localData.totalPages)].map((x, i) =>
                            <IconButton
                                key={i}
                                aria-label="edit"
                                sx={{
                                    backgroundColor: (i + 1) === localData.currentPage ? "red" : "transparent", marginX: 1, paddingX: 2
                                }}
                                onClick={() => {
                                    // console.log(params)
                                    setLocalData({ ...localData, currentPage: i + 1 })

                                }}
                            >
                                <Typography>
                                    {i + 1}
                                </Typography>
                            </IconButton>
                        )}


                        <IconButton
                            aria-label="edit"
                            sx={{
                                backgroundColor: "#ffa726", ml: 4,
                            }}
                            onClick={() => {
                                if (localData.currentPage < localData.totalPages) {
                                    setLocalData({ ...localData, currentPage: localData.currentPage + 1 })
                                }
                            }}
                        >
                            <FaChevronRight size={16} cursor="pointer" color={"white"} />
                        </IconButton>
                    </Box>



                    <Button
                        color="primary"
                        onClick={() => { history.push("/animals/new/-1"); }}
                        variant="text"
                        endIcon={<FaChevronDown />}
                        sx={{ borderRadius: theme.custom.borderRadius }}
                    >{localData.animalsPerPage} por página</Button>
                </CardActions>
            </Card>
        </Box>

    )
}
export default List