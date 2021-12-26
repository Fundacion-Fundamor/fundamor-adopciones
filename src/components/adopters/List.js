/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CircularProgress,  IconButton, InputAdornment, Menu, MenuItem, Pagination, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'

import { FaChevronDown, FaTrashAlt, FaUserEdit } from 'react-icons/fa'
import './list.scss'
import AdopterContext from '../../context/adopter/adopterContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { grey } from '@mui/material/colors'


export default function List() {
  const {
    adopters,
    getAdopters,
    removeAdopter,
    selectAdopter,
    loading,
    message,
    handleAdopterMessage,
  } = useContext(AdopterContext)

  const MySwal = withReactContent(Swal)



  const [localData, setLocalData] = useState({
    list: [],
    adoptersPerPage: 10,
    totalPages: 0,
    currentPage: 1,
    filters: {
      search: "",
    }
  })


  //layout y theming
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {

    const displayAlert = async () => {
      let res = await MySwal.fire({
        title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
        allowOutsideClick: false,
        icon: message.category,
        backdrop: true

      });


      if (res.isConfirmed) {
        await handleAdopterMessage(null);
      }
    }
    if (message && message.showIn === "list" && !loading) {

      displayAlert();
    }
  }, [message, loading])

  useEffect(() => {
    getAdopters();
  }, []);

  useEffect(() => {

    let result = adopters.filter(element => {

      if (localData.filters.search !== "") {

        if (element.nombre.toLowerCase().includes(localData.filters.search.toLowerCase().trim()) ||
          element.id_adoptante.toLowerCase().includes(localData.filters.search.toLowerCase().trim())) {

          return element;
        }else{
          return null;
        }

      } else {
        return element;
      }

    })

    console.log(result.length)
    let totalPages = Math.ceil(result.length / localData.adoptersPerPage);
    setLocalData({ ...localData, currentPage: 1, list: result, totalPages: totalPages })
  }, [adopters, localData.adoptersPerPage,localData.filters])



  const selectAdopterRemove = async (idAdopter) => {
    MySwal.fire({
      title: (
        <p style={{ fontSize: 22, fontWeight: 'bold' }}>{'Confirmación'}</p>
      ),
      text:
        '¿Está seguro que desea eliminar este adoptante?, tenga en cuenta que se eliminarán todas las adopciones asociadas a este adoptante',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      backdrop: true,
      preConfirm: async (response) => {
        await removeAdopter(idAdopter)
        return true
      },

      allowOutsideClick: () => !MySwal.isLoading(),
    })
  }

  useEffect(() => {
    getAdopters()
  }, [])

  useEffect(() => {
    const displayAlert = async () => {
      let res = await MySwal.fire({
        title: (
          <p style={{ fontSize: 22, fontWeight: 'bold' }}>{message.text}</p>
        ),
        allowOutsideClick: false,
        icon: message.category,
        backdrop: true,
      })

      if (res.isConfirmed) {
        await handleAdopterMessage(null)
      }
    }
    if (message && message.showIn === 'list' && !loading) {
      displayAlert()
    }
  }, [message, loading])


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
        <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
          <Box alignItems={"center"} display={"flex"}>
            <Tooltip title="Edita y elimina los adoptantes que estan vinculados a procesos de adopción">
              <IconButton>
                <BiHelpCircle />
              </IconButton>

            </Tooltip>
            <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
              Listado de adoptantes
            </Typography>

            {/* {matchDownSm ? <Button
              className="employeeBanner__button"
              color="primary"
              onClick={() => { history.push("/adopters/new/-1"); }}
              variant="contained"
              startIcon={<AiOutlinePlus />}
              sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
            >
              Agregar
            </Button> : null} */}

          </Box>
          <Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>


            {/* {!matchDownSm ? <Button
              color="primary"
              // onClick={() => { history.push("/adopters/new/-1"); }}  
              variant="contained"
              startIcon={<AiOutlinePlus />}
              sx={{ borderRadius: "8px", fontSize: 12, ml: 2 }}
            >
              Agregar
            </Button> : null} */}


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

              }}
              variant="outlined"
            />
          </Box>
        </CardActions>
      </Card>
      <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
        <CardContent sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", padding: 0, justifyContent: "center", alignItems: "center" }}>
          {localData.list.map((element, index) => {

            let start = (localData.currentPage * localData.adoptersPerPage) - localData.adoptersPerPage;
            let end = (localData.currentPage * localData.adoptersPerPage);
            if ((index + 1) > start && (index + 1) <= end) {
              return (
                <AdopterCard
                  key={index}
                  item={element}
                  removeAdopter={selectAdopterRemove}
                  selectAdopter={selectAdopter}
                />
              )
            } else {
              return null;
            }
          }
          )}

          {loading ?
            <Stack direction="row" mt={8} alignItems="center"><CircularProgress />
              <Typography sx={{ fontWeight: "500", ml: 2 }}>Cargando...</Typography>
            </Stack> : null}
          {adopters.length === 0 && !loading ?
            <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay adopteres registrados</Typography> : null}

          {localData.list.length === 0 && !loading && adopters.length !== 0 ?
            <Typography sx={{ fontWeight: "600", mt: 8 }}>No hay coincidencias</Typography> : null}
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row", mt: 4 }}>


          <Pagination color="primary" count={localData.totalPages}
            page={localData.currentPage}
            onChange={(event, value) => { setLocalData({ ...localData, currentPage: value }) }} />

          <RowsManager numRows={localData.adoptersPerPage} handleRows={(val) => {

            setLocalData({ ...localData, adoptersPerPage: val })
          }} />


        </CardActions>
      </Card>
    </Box>
  )
}

const AdopterCard = ({ item, removeAdopter, selectAdopter }) => {
  return (
    <Card
      sx={{ maxWidth: 275, padding: 2, borderRadius: '4px', margin: '0.8rem' }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.rol !== '' ? item.rol : 'No registra'}
        </Typography>

        <Typography variant="h5" component="div">
          {item.nombre}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.correo}
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="edit"
          onClick={() => {
            selectAdopter(item)
          }}
        >
          <FaUserEdit size={30} cursor="pointer" />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            removeAdopter(item.id_adoptante)
          }}
        >
          <FaTrashAlt size={25} cursor="pointer" />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const RowsManager = ({ numRows, handleRows }) => {


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
      <MenuItem onClick={() => handleClose(10)}>10 adoptantes</MenuItem>
      <MenuItem onClick={() => handleClose(30)}>30 adoptantes</MenuItem>
      <MenuItem onClick={() => handleClose(50)}>50 adoptantes</MenuItem>
    </Menu>
  </>)
}