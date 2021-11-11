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
  Pagination,
  CardMedia,
} from '@mui/material'

import { FaUserCircle, FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import './list.scss'
import EmployeeContext from '../../context/employee/employeeContext'
import { yellow } from '@mui/material/colors'
import { grid } from '@mui/system'

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

      <div className="container">
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
          background:'#343434',
          display:'flex',
          flexDirection:'column',
          alignItems:"center"
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
      sx={{ width: "clamp(350px, 50%, 1000px);", padding: 2, borderRadius: '4px', margin: '0.8rem' }}
    >
            <CardMedia
        component="img"
        height="194"
        image="/images/cat_3.jpg"
        alt="Imagen"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.rol}
        </Typography>

        <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt tempus pulvinar. Praesent consectetur pharetra massa, ac suscipit magna efficitur sit amet. Nulla eget congue elit, ut scelerisque ante. Nulla viverra vulputate magna sed cursus. Nam rutrum ipsum arcu, non posuere est maximus sit amet. Pellentesque hendrerit posuere nisi, in.
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
