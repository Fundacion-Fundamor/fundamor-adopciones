//eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useContext } from 'react'
import './form.scss'
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { GrClose } from 'react-icons/gr'
import PostContext from '../../context/post/postContext'

/**Componente encargado del registro y edición de un colaborador
 *
 * @param {*} param0
 * @returns
 */
export default function Form({ handleToggle }) {
  const { createPost, selectedPost, editPost, loading, message } = useContext(
    PostContext,
  )

  const [values, setValues] = useState({
    id_publicacion: selectedPost ? selectedPost.id_publicacion : '',
    titulo: selectedPost ? selectedPost.titulo : '',
    cuerpo: selectedPost ? selectedPost.cuerpo : '',
  })
  const [errors, setErrors] = useState({
    id_publicacion: null,
    titulo: null,
    cuerpo: null,
  })

  const onSubmit = async () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //se validan los campos del formulario

    if (values.titulo === '') {
      setErrors({ ...errors, titulo: 'Debe ingresar un titulo' })
    } else if (values.cuerpo === '') {
      setErrors({ ...errors, cuerpo: 'Debe ingresar un cuerpo' })
    } else {
      if (selectedPost) {
        //se editan los datos del colaborador
        editPost(values)
      } else {
        //se guardan los datos del colaborador
        createPost(values)
      }
    }
  }

  useEffect(() => {
    if (
      message &&
      message.category === 'success' &&
      message.showIn === 'form' &&
      selectedPost === null
    ) {
      setValues({
        id_publicacion: '',
        titulo: '',
        cuerpo: '',
      })
    }
  }, [message])
  return (
    <div
      style={{
        width: '50%',
        maxwidth: 1000,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        margin: 30,
        marginBottom: 30,
      }}
    >
      <div className="form-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {selectedPost ? (
            <h3>Edita la publicación</h3>
          ) : (
            <h3>Crear nueva publicación</h3>
          )}
          <GrClose
            size={selectedPost ? 25 : 35}
            color="#000"
            onClick={handleToggle}
            cursor="pointer"
          />
        </div>
        <div className="form-group">
          <TextField
            fullWidth
            error={errors.titulo != null}
            label="Titulo"
            helperText={errors.titulo}
            variant="standard"
            value={values.titulo}
            onChange={(event) => {
              setValues({ ...values, titulo: event.target.value })
              setErrors({ ...errors, titulo: null })
            }}
          />
        </div>

        <div className="form-group">
          <TextField
            fullWidth
            error={errors.cuerpo !== null}
            label="Cuerpo"
            helperText={errors.cuerpo}
            id="filled-multiline-static"
            multiline
            maxRows={20}
            defaultValue="Default Value"
            variant="filled"
            value={values.cuerpo}
            onChange={(event) => {
              setValues({ ...values, cuerpo: event.target.value })
              setErrors({ ...errors, cuerpo: null })
            }}
          />
        </div>

        {loading && (
          <div
            style={{
              marginTop: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress color="success" />
            <p style={{ marginLeft: 10 }}>Cargando...</p>
          </div>
        )}

        {message && message.showIn === 'form' && (
          <Alert
            severity={message.category}
            variant="filled"
            style={{ marginTop: 20, marginBottom: 5 }}
          >
            {message.text}
          </Alert>
        )}

        <Button
          variant="contained"
          style={{ width: '100%', marginTop: 25 }}
          onClick={() => {
            if (!loading) {
              onSubmit()
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
