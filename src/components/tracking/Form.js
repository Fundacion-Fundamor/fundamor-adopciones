import React, { useState, useContext } from 'react'
import { Alert, TextField, useTheme, useMediaQuery, Card, Stack, Typography, CardContent, FormHelperText } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import TrackingContext from '../../context/tracking/trackingContext';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment';
import 'moment/locale/es';
import { grey } from '@mui/material/colors';
import { AiOutlineSave } from 'react-icons/ai';


/**Formulario de registro de anotaciones sobre un proceso de adopción
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Form({ handleModal, adoptionID }) {


    const { loading, message, createTracking, handleTrackingMessage } = useContext(TrackingContext)


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));


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


        <Card style={{ minWidth: matchDownSm ? 250 : 350, maxWidth: 350, backgroundColor: "#fff", padding: 24, borderRadius: 15, margin: 30, marginBottom: 30 }}>



            <Stack direction="row" alignItems={"flex-start"} justifyContent={"space-between"}>
                <Typography sx={{ fontSize: 18, ml: 1, color: grey[800] }} variant="subtitle2">Nueva anotación </Typography>


                <GrClose size={25} onClick={() => {
                    handleModal();
                    handleTrackingMessage()
                }} cursor="pointer" />
            </Stack>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 3 }} >
                <LocalizationProvider dateAdapter={DateAdapter} >
                    <DatePicker
                        label="Fecha del seguimiento"
                        maxDate={new moment()}
                        value={new moment()}
                        mask={'__/__/____'}
                        onChange={(newValue) => {


                        }}

                        disabled
                        renderInput={(params) => <TextField fullWidth={true} {...params} variant="standard" />}
                    />
                </LocalizationProvider>

                <TextField
                    fullWidth
                    error={errors.observations !== null}
                    label="Anotaciones"
                    multiline={true}
                    rows={5}
                    helperText={errors.observations}
                    variant="outlined"
                    InputLabelProps={{ style: { background: "#fafafa", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px", } }}
                    sx={{ mt: 3, backgroundColor: "#fafafa" }}
                    value={values.observations}
                    onChange={(event) => {
                        setValues({ ...values, observations: event.target.value });
                        setErrors({ ...errors, observations: null })
                    }}
                />

                <FormHelperText sx={{ textAlign: "left", width: "100%" }} >Máximo 500 caracteres</FormHelperText>




                {message && message.showIn === "form" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935" }} >{message.text}</Alert>}



                <LoadingButton loading={loading}
                    size="medium" variant="contained" color="primary" sx={{ fontSize: 12, width: "100%", mt: 3, height: 40, px: 5, alignItems: "center", borderRadius: "8px" }}

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