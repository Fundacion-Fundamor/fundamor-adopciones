import React, { useEffect, useContext } from 'react'

import Utils from '../../Shared/utils'
import AdoptionContext from '../../context/adoption/adoptionContext'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Chip,
  Button,
  IconButton,
} from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function List() {
  const {
    getAdoptions,
    adoptions,
    message,
    loading,
    removeAdoption,
    handleAdoptionMessage,
  } = useContext(AdoptionContext) // contexto de adopciones

  useEffect(() => {
    getAdoptions()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: '0 5%',
      }}
    >
      {adoptions.map((element, index) => (
        <AdoptionItem adoption={element} key={index} />
      ))}
    </div>
  )
}

const AdoptionItem = ({ adoption }) => {
  let history = useHistory()
  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        borderRadius: '4px',
        margin: 5,
      }}
    >
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {'No registra'}
          </Typography> */}

        <Typography sx={{ mb: 0 }} variant="h5" component="div">
          {Utils.toTitleCase(adoption.animal.nombre)}
        </Typography>
        <Typography variant="overline" color="text.secondary">
          {adoption.animal.especie}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          {'Fecha de estudio:'}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2">
          {adoption.fecha_estudio}
        </Typography>
        <Typography sx={{}} variant="subtitle2" color="text.secondary">
          {'Adoptante:'}
        </Typography>
        <Typography variant="body2">
          {Utils.toTitleCase(adoption.adopter.nombre)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Chip color="primary" label={Utils.toTitleCase(adoption.estado)} />

        <Button
          size="small"
          onClick={() => {
            history.push(`/adoptions/new/-1`)
          }}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  )
}
