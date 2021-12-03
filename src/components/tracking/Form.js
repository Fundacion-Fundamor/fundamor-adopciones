import React, { useState, useEffect, useContext } from 'react'
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import TrackingContext from '../../context/tracking/trackingContext';



export default function Form({ handleModal, adoptionID }) {


    const { loading, message, createTracking } = useContext(TrackingContext)

    const [values, setValues] = useState({
        observations: ""
    })

    const [errors, setErrors] = useState({
        observations: null
    })

    const onSubmit = () => {

        if (values.observations === "") {
            setErrors({ observations: "Debe ingresar un texto" })
        } else {
            createTracking({ adoptionID, annotation: values.observations });
        }
    }

    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 4, margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <h3>Registra anotaciones del seguimiento a los procesos de adopción  </h3>
                    <GrClose size={25} color="#000" onClick={handleModal} cursor="pointer" />
                </div>
                <div className="form-group">

                    <div className="form-group">
                        <TextField
                            fullWidth
                            error={errors.observations !== null}
                            label="Anotaciones"
                            multiline={true}
                            rows={5}
                            helperText={errors.observations}
                            variant="standard"
                            value={values.observations}
                            onChange={(event) => {
                                setValues({ ...values, observations: event.target.value });
                                setErrors({ ...errors, observations: null })
                            }}
                        />
                    </div>


                    {
                        loading && <div style={{ marginTop: 15, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircularProgress color="success" />
                            <p style={{ marginLeft: 10 }}>Cargando...</p>
                        </div>
                    }

                    {message && message.showIn === "form" && <Alert severity={message.category} variant="filled" style={{ marginTop: 20, marginBottom: 5 }} >{message.text}</Alert>}

                    <Button variant="contained" style={{ width: "100%", marginTop: 25 }} onClick={() => { if (!loading) { onSubmit() } }}>Guardar</Button>


                </div>
            </div>
        </div>
    )
}