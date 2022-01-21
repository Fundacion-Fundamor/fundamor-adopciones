/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import AdopterList from '../../components/adopters/AdopterList'
import './adopter.scss'
import AdopterForm from '../../components/adopters/AdopterForm'
import {
  Modal,
  Box,
} from '@mui/material'
import AdopterContext from '../../context/adopter/adopterContext'

export default function Adopter() {
  const {
    selectedAdopter,
    selectAdopter,
    handleAdopterMessage,
  } = useContext(AdopterContext)



  const [showForm, setShowForm] = useState(false)

  const handleToggle = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    if (!showForm) {
      selectAdopter(null)
      handleAdopterMessage(null)
    }
  }, [showForm])

  useEffect(() => {
    if (selectedAdopter) {
      setShowForm(!showForm)
    }
  }, [selectedAdopter])

  return (
    <>
      <AdopterList />
      <Modal
        open={showForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: 'scroll' }}
      >
        <Box tabIndex={""} sx={{ display: 'flex', justifyContent: 'center' }}>
          {showForm && <AdopterForm handleToggle={handleToggle} />}
        </Box>
      </Modal>
    </>
  )
}
