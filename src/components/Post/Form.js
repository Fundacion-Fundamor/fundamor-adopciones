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
import PostContext from '../../context/employee/employeeContext'

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
    title: selectedPost ? selectedPost.titulo : '',
    cuerpo: selectedPost ? selectedPost.correo : '',
    ID: selectedPost ? selectedPost.id_post : '',
    password: '',
    passwordConfirm: '',
    role: selectedPost ? selectedPost.rol : '',
    enablePassword: selectedPost === null,
  })
  const [errors, setErrors] = useState({
    title: null,
    cuerpo: null,
    ID: null,
    password: null,
    passwordConfirm: null,
    role: null,
  })

  const onSubmit = async () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //se validan los campos del formulario

    if (values.title === '') {
      setErrors({ ...errors, title: 'Debe ingresar un titulo' })
    } else if (values.ID === '') {
      setErrors({
        ...errors,
        ID: 'El ID de la publicación no puede estar vacío',
      })
    } else if (values.cuerpo === '' || re.test(values.cuerpo) === false) {
      setErrors({
        ...errors,
        cuerpo: 'El cuerpo de la publicación no puede ir vacío',
      })
    } else {
      if (selectedPost) {
        //se editan los datos de la publicación
        editPost(values)
      } else {
        //se guardan los datos de la publicación
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
        title: '',
        cuerpo: '',
        ID: '',
      })
    }
  }, [message])
  return (
    <div
      style={{
        minWidth: 340,
        width: 400,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        margin: 30,
        marginBottom: 30,
      }}
    >
      <div className="form-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {selectedPost ? (
            <h3>Edita los datos de la publicación</h3>
          ) : (
            <h3>Nueva publicación </h3>
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
            error={errors.title}
            label="Titulo"
            helperText={errors.title}
            variant="standard"
            value={values.title}
            onChange={(event) => {
              setValues({ ...values, title: event.target.value })
              setErrors({ ...errors, title: null })
            }}
          />
        </div>

        <TextField
          id="filled-multiline-static"
          label="Cuerpo"
          multiline
          rows={6}
          defaultValue="Descripción de la publicación"
          variant="filled"
          value={values.cuerpo}
          onChange={(event) => {
            setValues({ ...values, cuerpo: event.target.value })
            setErrors({ ...errors, cuerpo: null })
          }}
        />

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
