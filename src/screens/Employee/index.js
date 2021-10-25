import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/employees/List'
import './employee.scss'

import Form from '../../components/employees/Form'
import {
  Backdrop,
  Button,
  Snackbar,
  Modal,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material'
import EmployeeContext from '../../context/employee/employeeContext'
import { FaBlackberry } from 'react-icons/fa'

export default function Employeee() {
  const {
    selectedEmployee,
    message,
    selectEmployee,
    handleEmployeeMessage,
  } = useContext(EmployeeContext)

  const [errors, setErrors] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleToggle = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    if (!showForm) {
      selectEmployee(null)
      handleEmployeeMessage(null)
    }
  }, [showForm])

  useEffect(() => {
    if (selectedEmployee) {
      setShowForm(!showForm)
    }
  }, [selectedEmployee])

  return (
    <div className="employee-container">
      <Snackbar
        sx={{
          color: 'success.main',
        }}
        open={errors != null}
        autoHideDuration={6000}
        onClose={() => {
          console.log('%%%%')
        }}
        message={errors}
      >
        {/* <Alert severity="success" sx={{ width: '100%' }}>
                    {errors}
                </Alert> */}

      </Snackbar>

      <div className="employeeBanner">
        <svg
          className="employeeBanner__divider"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e19405"
            fill-opacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,160C384,149,480,107,576,96C672,85,768,107,864,133.3C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <div className="employeeBanner__content">
          <h1>Gestiona el acceso a la plataforma</h1>
          <Button
            style={{ marginTop: '3rem', maxWidth: 220 }}
            color="error"
            onClick={handleToggle}
            variant="contained"
          >
            Agregar colaborador
          </Button>
        </div>
      </div>
      <div className="employee__content">
        {message && message.showIn === 'list' && (
          <Alert
            severity={message.category}
            variant="filled"
            style={{ marginTop: 20, marginBottom: 5 }}
          >
            {message.text}
          </Alert>
        )}
      </div>

      <Modal
        open={showForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: 'scroll' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {showForm && <Form handleToggle={handleToggle} />}
        </Box>
      </Modal>

      <List />
    </div>
  )
}
