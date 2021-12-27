/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CircularProgress, Collapse, Grid, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Stack, TextField, Tooltip, Typography, useMediaQuery, useTheme, } from '@mui/material'

import { FaCat, FaChevronDown, FaChevronUp, FaDog, FaTrashAlt, FaUserCircle, FaUserEdit } from 'react-icons/fa'
import './list.scss'
import AdopterContext from '../../context/adopter/adopterContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { AiOutlineCheckCircle, AiOutlinePauseCircle, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai'
import { BiHelpCircle } from 'react-icons/bi'
import { grey } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'


export default function AdopterList() {
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
        } else {
          return null;
        }

      } else {
        return element;
      }

    })

    console.log(result.length)
    let totalPages = Math.ceil(result.length / localData.adoptersPerPage);
    setLocalData({ ...localData, currentPage: 1, list: result, totalPages: totalPages })
  }, [adopters, localData.adoptersPerPage, localData.filters])



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

          </Box>
          <Box alignItems={"center"} display={"flex"} flexDirection={"row"} sx={{ marginTop: matchDownSm ? 2 : 0 }}>




            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {

                  borderRadius: "10px!important"

                }
              }}
              fullWidth={true}
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

          {loading && adopters.length === 0 ?
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

  const theme = useTheme();

  return (
    <Card
      sx={{ width: 290, borderRadius: theme.custom.borderRadius, margin: '0.8rem', backgroundColor: grey[50] }}
      variant="outlined"
    >
      <CardContent>

        <Stack direction="row" alignItems={"center"}>
          <Avatar
            src="/images/animal-care.png"
            sx={{ width: 66, height: 66 }}
          >
            <FaUserCircle size={30} />
          </Avatar>
          <Typography sx={{ fontSize: 18, ml: 2, fontWeight: 600 }} color="text.secondary" gutterBottom>
            {item.nombre}
          </Typography>
        </Stack>
        <Stack mt={2}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="text.secondary">
            Correo
          </Typography>
          <Typography sx={{ fontSize: 13 }} color="text.secondary">
            {item.correo ?? "No registra"}
          </Typography>
        </Stack>


        <Grid container spacing={2} mt={0}>
          <Grid item md={6} xs={6} >

            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="text.secondary">
              Identificación
            </Typography>
            <Typography sx={{ fontSize: 13 }} color="text.secondary">
              {item.id_adoptante ?? "No registra"}
            </Typography>

          </Grid>

          <Grid item md={6} xs={6} >


            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="text.secondary">
              Dirección
            </Typography>
            <Typography sx={{ fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} color="text.secondary">
              {item.ciudad ?? "No registra"}
            </Typography>


          </Grid>
          <Grid item md={6} xs={6} >

            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="text.secondary">
              Teléfono fijo
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
              {item.telefono_casa ?? "No registra"}
            </Typography>

          </Grid>

          <Grid item md={6} xs={6} >

            <Typography sx={{ fontSize: 13, fontWeight: 600 }} color="text.secondary">
              Teléfono celular
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
              {item.telefono_celular ?? "No registra"}
            </Typography>

          </Grid>
        </Grid>
        <Stack alignItems={"center"} mt={1}>
          <AdoptionsAssociatedList adoptions={item.adoption} />
        </Stack>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "space-around", paddingBottom: 2 }} >


        <Button size="medium" variant="outlined" color="primary" sx={{ fontSize: 11, borderRadius: "8px" }}
          onClick={() => {
            selectAdopter(item)
          }}
          startIcon={<FaUserEdit />}
        >Editar</Button>
        <Button size="medium" variant="outlined" color="error" sx={{ fontSize: 11, borderRadius: "8px" }}
          startIcon={<FaTrashAlt />}
          onClick={() => {
            removeAdopter(item.id_adoptante)
          }}
        >Eliminar</Button>

      </CardActions>
    </Card>
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
        style: { borderRadius: 12}
      }}
    >
      <MenuItem onClick={() => handleClose(10)}>10 adoptantes</MenuItem>
      <MenuItem onClick={() => handleClose(30)}>30 adoptantes</MenuItem>
      <MenuItem onClick={() => handleClose(50)}>50 adoptantes</MenuItem>
    </Menu>
  </>)
}


const AdoptionsAssociatedList = ({ adoptions }) => {


  const [open, setOpen] = useState(false);

  let history = useHistory()

  const toggle = () => {

    setOpen(!open);
  };




  return (<>
    <Button size="medium" variant="text" color="success"
      onClick={() => toggle()}
      aria-describedby={"menu-rows"}
      fullWidth={true}
      endIcon={open ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
      sx={{ fontSize: 11, borderRadius: "8px" }} >Ver procesos</Button>

    <Collapse in={open} timeout="auto" unmountOnExit sx={{ width: "100%", backgroundColor: grey[100] }}>
      <List component="div" disablePadding sx={{ width: "100%" }} >
        {adoptions.map((element, index) => (
          <ListItemButton key={index} onClick={() => {


            history.push(`/adoptions/detail/${element.id_adopcion}`)
          }}>
            <ListItemIcon sx={{ minWidth: 26 }}>
              {element.animal.especie === "perro" ? <FaDog /> : <FaCat />}
            </ListItemIcon>
            <ListItemText disableTypography={true} primary={element.animal.nombre} sx={{ fontSize: 12 }} />
            <Tooltip title={element.estado === "finalizada" ?
              "La adopción ha finalizado exitosamente" :
              (element.estado === "en proceso" ?
                "La adopción se encuentra en proceso"
                : "La adopción está a la espera de ser revisada por un colaborador")}>
              <ListItemIcon sx={{ minWidth: 26 }}>
                {element.estado === "finalizada" ?
                  <AiOutlineCheckCircle />
                  : (element.estado === "en proceso" ?
                    <AiOutlineReload />
                    :
                    <AiOutlinePauseCircle />)
                }
              </ListItemIcon>
            </Tooltip>
          </ListItemButton>
        ))}
      </List>
    </Collapse>
  </>)


}