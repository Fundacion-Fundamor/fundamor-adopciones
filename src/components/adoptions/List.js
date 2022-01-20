/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import AdoptionContext from '../../context/adoption/adoptionContext'
import {
  Box, Button, Card, CardActions, CardContent, Divider, FormControl,
  Chip,
  FormControlLabel, FormLabel, IconButton, Menu, MenuItem, Pagination, Popover, Radio, RadioGroup, Stack, Tooltip, Typography, useMediaQuery, useTheme, Avatar,
} from '@mui/material'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { grey } from '@mui/material/colors'
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlinePlus, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { HiOutlineFilter } from 'react-icons/hi'
import { FaChevronDown } from 'react-icons/fa'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function List() {


  //datos globales y locales
  const { adoptions, message, loading, getAdoptions, handleAdoptionMessage } = useContext(AdoptionContext); // contexto de adopciones
  const [localData, setLocalData] = useState({
    list: [],
    adoptionsPerPage: 10,
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
        await handleAdoptionMessage(null);
      }
    }
    if (message && message.showIn === "list" && !loading) {

      displayAlert();
    }
  }, [message, loading])

  useEffect(() => {
    getAdoptions();
  }, []);

  useEffect(() => {

    let result = adoptions.filter(element => {

      let condition = true;


      if (localData.filters.search !== "") {


        if (!(element.animal.nombre.toLowerCase().includes(localData.filters.search.toLowerCase().trim()))) {
          condition = false;
        }

      }

      if (localData.filters.state !== "") {
        if (element.estado !== localData.filters.state) {
          condition = false;
        }
      }

      if (localData.filters.specie !== "") {
        if (element.animal.especie !== localData.filters.specie) {
          condition = false;
        }
      }

      return condition ? element : null;

    })

    let totalPages = Math.ceil(result.length / localData.adoptionsPerPage);
    setLocalData({ ...localData, currentPage: 1, list: result, totalPages: totalPages })
  }, [adoptions, localData.filters, localData.adoptionsPerPage])




  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
        <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
          <Box alignItems={"center"} display={"flex"}>
            <Tooltip title="Crea, edita , busca y elimina procesos de adopción registrados en la plataforma">
              <IconButton>
                <BiHelpCircle />
              </IconButton>

            </Tooltip>
            <Typography variant="t2">
              Listado de adopciones
            </Typography>

            {matchDownSm ? <Button
              color="primary"
              onClick={() => { history.push("/adoptions/new/-1"); }}
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
              onClick={() => { history.push("/adoptions/new/-1"); }}
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

            let start = (localData.currentPage * localData.adoptionsPerPage) - localData.adoptionsPerPage;
            let end = (localData.currentPage * localData.adoptionsPerPage);
            if ((index + 1) > start && (index + 1) <= end) {
              return (
                <AdoptionCard key={index} adoption={element} />
              )
            } else {
              return null;
            }
          }
          )}

          {loading && adoptions.length === 0 ?
            <Stack direction="row" mt={8} alignItems="center"><CircularProgress />
              <Typography sx={{ fontWeight: "500", ml: 2 }}>Cargando...</Typography>
            </Stack> : null}
          {adoptions.length === 0 && !loading ?
            <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay adopciones registrados</Typography> : null}

          {localData.list.length === 0 && !loading && adoptions.length !== 0 ?
            <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay coincidencias</Typography> : null}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row", mt: 4 }}>


          <Pagination color="primary" count={localData.totalPages}
            page={localData.currentPage}
            onChange={(event, value) => { setLocalData({ ...localData, currentPage: value }) }} />

          <RowsManager numRows={localData.adoptionsPerPage} handleRows={(val) => {

            setLocalData({ ...localData, adoptionsPerPage: val })
          }} />


        </CardActions>
      </Card>
    </Box>

  )
}


const FilterManager = ({ handleFilters }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [specie, setSpecie] = useState(null);
  const [adoptionState, setAdoptionState] = useState(null)

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
          color: "white",
          borderRadius: 2 , "&:hover": {
            backgroundColor: theme.custom.primary.dark,

          }
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
              value={adoptionState}
              onChange={(e) => { setAdoptionState(e.target.value) }}
            >
              <FormControlLabel value="finalizada" control={<Radio />} label="Finalizada" />
              <FormControlLabel value="en proceso" control={<Radio />} label="En proceso" />
              <FormControlLabel value="en espera" control={<Radio />} label="En espera" />
            </RadioGroup>
          </FormControl>

          <Stack direction="row" justifyContent={"space-between"} sx={{ marginTop: 2 }}>
            <Button

              sx={{ color: "text.secondary" }}
              onClick={() => {
                handleClose()
                setSpecie(null);
                setAdoptionState(null);
                handleFilters();
              }}
              variant="text"

            >Limpiar</Button>
            <Button

              color="primary"
              onClick={() => {
                handleClose()
                handleFilters(specie, adoptionState)
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
      <MenuItem onClick={() => handleClose(10)}>10 adopciones</MenuItem>
      <MenuItem onClick={() => handleClose(30)}>30 adopciones</MenuItem>
      <MenuItem onClick={() => handleClose(50)}>50 adopciones</MenuItem>
    </Menu>
  </>)
}


const AdoptionCard = ({ adoption }) => {

  let history = useHistory()
  const theme = useTheme();


  let imageUri = null;

  if (adoption.animal.animalImage.length !== 0) {

    imageUri = `${process.env.REACT_APP_API_URL}/${adoption.animal.animalImage[0].ruta}`;
  } else {

    if (adoption.animal.especie === "perro") {
      imageUri = "/images/pawprint.png"
    } else {
      imageUri = "/images/cat.png"
    }

  }

  return (
    <Card
      sx={{
        width: 285,
        borderRadius: theme.custom.borderRadius,
        margin: 5,
        background: grey[50]
      }}
      variant={"outlined"}
    >
      <CardContent>
        <Stack direction="row" justifyContent={"space-between"} mb={2}>
          <Stack justifyContent={"space-between"}>
            <Typography sx={{ mb: 0, textTransform: "capitalize", fontWeight: 800, color: grey[600] }} variant="h5" component="div" >
              {adoption.animal.nombre}
            </Typography>
            <Typography variant="overline" sx={{fontWeight:"600"}} color="text.secondary">
              {adoption.animal.especie}
            </Typography>
          </Stack>
          <Avatar
            src={imageUri}
            sx={{ width: 50, height: 50 }}

          />

        </Stack>


        <Typography variant="subtitle2" color="text.secondary">
          {'Fecha de estudio:'}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 12 }} variant="body2">
          {adoption.fecha_estudio}
        </Typography>
        <Typography sx={{}} variant="subtitle2" color="text.secondary">
          {'Adoptante:'}
        </Typography>
        <Typography variant="body2" sx={{ textTransform: "capitalize", fontSize: 12 }} >
          {adoption.adopter.nombre}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around', mb: 2 }}>

        <Chip color={adoption.estado === "finalizada" ?
          "success"
          : (adoption.estado === "en proceso" ?
            "primary"
            :
            "warning")
        }


          sx={{ textTransform: "capitalize" }}



          icon={adoption.estado === "finalizada" ?
            <AiOutlineCheckCircle size={24} />
            : (adoption.estado === "en proceso" ?
              <AiOutlineReload size={24} />
              :
              <AiOutlinePauseCircle size={24} />)
          }
          label={adoption.estado} />

        <Button
          size="small"
          onClick={() => {
            history.push(`/adoptions/detail/${adoption.id_adopcion}`)
          }}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card >
  )
}

export default List


