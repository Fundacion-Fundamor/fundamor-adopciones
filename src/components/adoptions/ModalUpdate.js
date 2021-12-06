import React, { useState, useEffect, useContext } from 'react'
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import AdoptionContext from '../../context/adoption/adoptionContext';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es';

export default function ModalUpdate({ handleModal, observations, finalDate, adoptionState, adoptionId }) {
    moment.locale('es');
    moment.updateLocale('es', {
        relativeTime: {
            future: "en %s",
            past: "%s ",
            s: 'unos segundos',
            ss: '%d segundos',
            m: "un minuto",
            mm: "%d minutos",
            h: "an hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d dias",
            w: "una semana",
            ww: "%d semanas",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        }
    });

    const { loading, message, editAdoption } = useContext(AdoptionContext)

    const [values, setValues] = useState({
        adoptionId: adoptionId,
        observations: observations,
        adoptionFinalDate: finalDate,
        adoptionState: adoptionState,
    })



    const onSubmit = () => {

        editAdoption(values);

    }

    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 4, margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <h3>Actualiza el estado de la adopción  </h3>
                    <GrClose size={25} color="#000" onClick={handleModal} cursor="pointer" />
                </div>
                <div className="form-group">

                    <FormControl fullWidth variant="standard">
                        <InputLabel id="animal-size"  >Estado de la adopción</InputLabel>
                        <Select

                            labelId="animal-size"
                            id="animal-size-select"
                            value={values.adoptionState}
                            label="Seleccione el estado"
                            onChange={(event) => {
                                setValues({
                                    ...values, adoptionState: event.target.value
                                });

                            }}
                        >
                            <MenuItem value={"en espera"}>En espera</MenuItem>
                            <MenuItem value={"en proceso"}>En proceso</MenuItem>
                            <MenuItem value={"finalizada"}>Finalizada</MenuItem>

                        </Select>

                    </FormControl>
                    {values.adoptionState === "finalizada" ? <LocalizationProvider dateAdapter={DateAdapter} >
                        <DatePicker

                            label="Fecha de entrega"
                            value={values.adoptionFinalDate}
                            mask={'__/__/____'}
                            renderInput={(params) => <TextField sx={{ marginTop: 3 }} {...params} variant="standard" fullWidth={true} />}
                            onChange={(newValue) => {

                                setValues({ ...values, adoptionFinalDate: newValue });

                            }}
                        />
                    </LocalizationProvider> : null}
                    <div className="form-group">
                        <TextField
                            sx={{ marginTop: 2 }}
                            fullWidth
                            label="Observaciones"
                            multiline={true}
                            rows={5}
                            variant="standard"
                            value={values.observations}
                            onChange={(event) => {
                                setValues({ ...values, observations: event.target.value });
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