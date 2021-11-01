import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/employees/List'
import './employee.scss'

import Form from '../../components/employees/Form'
import {

  Button,
  Snackbar,
  Modal,
  Box,
  Alert,

} from '@mui/material'
import EmployeeContext from '../../context/employee/employeeContext'
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
        <div className="employeeBanner__header">
          <h1>Gestiona el acceso a la plataforma</h1>
        </div>
        <svg
          className="employeeBanner__divider"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f29f058e"
          
            d="M0,96L24,112C48,128,96,160,144,154.7C192,149,240,107,288,112C336,117,384,171,432,192C480,213,528,203,576,176C624,149,672,107,720,74.7C768,43,816,21,864,53.3C912,85,960,171,1008,192C1056,213,1104,171,1152,144C1200,117,1248,107,1296,112C1344,117,1392,139,1416,149.3L1440,160L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="employeeBanner__content">
        <Button
          className="employeeBanner__button"
          style={{ maxWidth: 220 }}
          color="error"
          onClick={handleToggle}
          variant="contained"
        >
          Agregar colaborador
        </Button>
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
