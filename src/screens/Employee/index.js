/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/employees/List'
import Form from '../../components/employees/Form'
import {
  Button,
  Modal,
  Box,
  CardContent,
  Card,
  CardActions,
  Typography,
  useTheme,
  Tooltip,
  IconButton,
  useMediaQuery
} from '@mui/material'
import EmployeeContext from '../../context/employee/employeeContext'
import { grey } from '@mui/material/colors'
import { BiHelpCircle } from 'react-icons/bi'

import { AiOutlinePlus } from "react-icons/ai";
export default function Employeee() {
  const {
    selectedEmployee,
    selectEmployee,
    handleEmployeeMessage,
  } = useContext(EmployeeContext)
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false)
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
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

    <>
      <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2,  }} >
        <CardActions sx={{ justifyContent: "space-between", flexDirection: matchDownSm ? "column" : "row" }}>
          <Box alignItems={"center"} display={"flex"}>
            <Tooltip title="Agrega, edita y elimina los colaboradores con acceso a la plataforma de adopción">
              <IconButton>
                <BiHelpCircle />
              </IconButton>
            </Tooltip>
            <Typography variant="t2">
              Listado de colaboradores
            </Typography>
          </Box>
          <Button
            color="primary"
            onClick={handleToggle}
            variant="contained"
            startIcon={<AiOutlinePlus />}
            sx={{ marginTop: matchDownSm ? 2 : 0, borderRadius: "8px", fontSize: 12, }}
          >
            Agregar
          </Button>
        </CardActions>
      </Card>
      <Card variant="outlined" sx={{ padding: 3, borderRadius: theme.custom.borderRadius }} >
        <CardContent>
          <List />
        </CardContent>
      </Card>

      <Modal
        open={showForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: 'scroll', }}
      >
        <Box tabIndex={""}  sx={{ display: 'flex', justifyContent: 'center', borderRadius: theme.custom.borderRadius }}>
          {showForm && <Form handleToggle={handleToggle} />}
        </Box>
      </Modal>

    </>
  )
}
