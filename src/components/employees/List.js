import React, { useEffect, useState, useContext } from 'react'
import {
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material'

import { FaUserCircle, FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext'

export default function List() {
  const {
    employees,
    getEmployees,
    removeEmployee,
    selectEmployee,
    loading,
  } = useContext(EmployeeContext)
  const [itemRemove, setItemRemove] = useState(null)
  const selectEmployeeRemove = (idEmployee) => {
    setItemRemove(idEmployee)
  }
  useEffect(() => {
    getEmployees()
  }, [])

  useEffect(() => {
    setItemRemove(null)
  }, [employees])

  return (
    <>
      {/* <Snackbar open={errors} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar> */}

      <div>
        <Dialog
          open={itemRemove !== null}
          onClose={() => {
            setItemRemove(null)
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás seguro que deseas eliminar el empleado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setItemRemove(null)
              }}
            >
              Cancelar
            </Button>
            <Button onClick={() => removeEmployee(itemRemove)} autoFocus>
              SÍ
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Backdrop
        sx={{
          color: '#fff',
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <p style={{ marginLeft: 5 }}>Cargando ...</p>
      </Backdrop>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          margin: '0 5%',
        }}
      >
        {employees.map((element, index) => (
          <EmployeeItem
            item={element}
            key={index}
            removeEmployee={selectEmployeeRemove}
            selectEmployee={selectEmployee}
          />
        ))}
      </div>
    </>
  )
}

const EmployeeItem = ({ item, removeEmployee, selectEmployee }) => {
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
        <IconButton aria-label="add to favorites" onClick={() => {
          selectEmployee(item)
        }}>
          <FaUserEdit
            size={30}
            cursor="pointer"
           
          />
        </IconButton>
        <IconButton aria-label="share" onClick={() => {
          removeEmployee(item.id_empleado)
        }}>
          <FaTrashAlt
            size={25}
        
            cursor="pointer"
          />
        </IconButton>
      </CardActions>
    </Card>
  )
}
