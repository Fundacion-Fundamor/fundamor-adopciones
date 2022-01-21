import React, { useState, useContext } from 'react'
import { Alert, FormControl, InputLabel, MenuItem, TextField, Select, Card, useMediaQuery, useTheme, Stack, Typography, CardContent, FormHelperText } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import AdoptionContext from '../../context/adoption/adoptionContext';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es';
import { grey } from '@mui/material/colors';
import { AiOutlineSave } from 'react-icons/ai';


/**Contenido del modal para actualizar el estado de una adopción,
 * el modal wrapper está en detail de adopción
 * 
 * @param {*} param0 
 * @returns 
 */
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

    const [error, setError] = useState(false)
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const onSubmit = () => {

        if (values.adoptionState === "finalizada" && values.adoptionFinalDate === null) {
            setError(true);
        } else {
            editAdoption(values);
        }

    }

    return (
        <Card style={{ minWidth: matchDownSm ? 250 : 350, maxWidth: 350, backgroundColor: "#fff", padding: 24, borderRadius: 15, margin: 30, marginBottom: 30 }}>



            <Stack direction="row" alignItems={"flex-start"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: 18, ml: 1, color: grey[800] }} variant="subtitle2">Actualizar proceso</Typography>


                <GrClose size={25} onClick={() => {
                    handleModal();
                }} cursor="pointer" />
            </Stack>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 3 }} >
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="animal-size"


                        sx={{
                            background: "white",
                            paddingX: "4px",
                        }}

                    >Estado de la adopción</InputLabel>
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
                {values.adoptionState === "finalizada" ? <LocalizationProvider dateAdapter={DateAdapter}  >
                    <DatePicker

                        label="Fecha de entrega"
                        value={values.adoptionFinalDate}
                        mask={'__/__/____'}
                        renderInput={(params) => <TextField sx={{ marginTop: 3 }} {...params} variant="outlined" helperText={"Debe ingresar una fecha de entrega"} error={error}
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }} fullWidth={true}


                        />}
                        onChange={(newValue) => {
                            if (values.adoptionState === "finalizada" && newValue === null) {
                                setError(true);
                            } else {
                                setError(false);
                            }
                            setValues({ ...values, adoptionFinalDate: newValue });

                        }}
                    />
                </LocalizationProvider> : null}

                <TextField
                    sx={{ marginTop: 4 }}
                    fullWidth
                    label="Observaciones"
                    multiline={true}
                    rows={5}
                    variant="outlined"
                    inputProps={{ maxLength: 300 }}
                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
                    value={values.observations}
                    onChange={(event) => {
                        setValues({ ...values, observations: event.target.value });
                    }}
                />
                <FormHelperText sx={{ textAlign: "left", width: "100%" }} >Máximo 300 caracteres</FormHelperText>

                {message && message.showIn === "form" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935" }} >{message.text}</Alert>}

                <LoadingButton loading={loading}
                    size="medium" variant="contained" color="primary" sx={{ mt: 5, width: "100%", fontSize: 12, height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}

                    onClick={() => {

                        if (!loading) {
                            onSubmit()

                        }
                    }}
                    startIcon={<AiOutlineSave size={20} />}

                >
                    Guardar
                </LoadingButton>

            </CardContent>
        </Card>
    )
}