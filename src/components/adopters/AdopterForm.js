//eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useContext } from 'react'
import './form.scss';
import { Alert, Button, Divider, Grid, Stack, TextField, useMediaQuery, useTheme, } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import AdopterContext from '../../context/adopter/adopterContext';
import { LoadingButton } from '@mui/lab';
import { AiOutlineSave } from 'react-icons/ai';
import { green, red } from '@mui/material/colors';


/**Componente encargado del registro y edición de un adoptante
 *
 * @param {*} param0 
 * @returns 
 */
export default function AdopterForm({ handleToggle }) {

    const { createAdopter, selectedAdopter, editAdopter, loading, message } = useContext(AdopterContext);

    const [values, setValues] = useState({
        name: selectedAdopter ? selectedAdopter.nombre : "",
        email: selectedAdopter ? selectedAdopter.correo ?? "" : "",
        ID: selectedAdopter ? selectedAdopter.id_adoptante : "",
        profession: selectedAdopter ? selectedAdopter.ocupacion ?? "" : "",
        address: selectedAdopter ? selectedAdopter.ciudad ?? "" : "",
        housePhone: selectedAdopter ? (selectedAdopter.telefono_casa ?? "") : "",
        phone: selectedAdopter ? (selectedAdopter.telefono_celular ?? "") : "",
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        ID: null,
        profession: null,
        address: null,
        phone: null
    });
    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));


    const onSubmit = async () => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //se validan los campos del formulario

        if (values.name === "") {
            setErrors({ ...errors, name: "Debe ingresar un nombre" });
        } else if (values.ID === "") {
            setErrors({ ...errors, ID: "Debe ingresar una identificación" });
        } else if (values.email !== "" && re.test(values.email) === false) {
            setErrors({ ...errors, email: "Debe ingresar un  correo válido" });
        } else if (values.profession === "") {
            setErrors({ ...errors, profession: "Debe especificar una profesión" });
        } else if (values.address === "") {
            setErrors({ ...errors, address: "Debe ingresar una dirección" });
        } else if (values.phone === "") {
            setErrors({ ...errors, phone: "Debe ingresar un número de celular" });
        } else {

            if (selectedAdopter) {
                //se editan los datos del adoptante
                editAdopter(values);
            } else {
                //se guardan los datos del adoptante
                createAdopter(values);
            }

        }
    }

    useEffect(() => {

        if (message && message.category === "success" && message.showIn === "form" && selectedAdopter === null) {
            setValues({
                name: "",
                email: "",
                ID: "",
                profession: "",
                address: "",
                housePhone: "",
                phone: "",


            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);


    return (
        <div style={{ width: matchDownSm ? 650 : 659, backgroundColor: "#fff", padding: 15, borderRadius: "12px", margin: 30, marginBottom: 30 }}>



            <div style={{ display: "flex", justifyContent: "space-between", padding: "15px",alignItems:"center" }}>
                {selectedAdopter ?
                    <h3>Edita los datos del adoptante </h3>
                    :
                    <h3>Registra algún adoptante para vincularlo a un proceso de adopción</h3>}
                <GrClose size={selectedAdopter ? 25 : 35} color="#000" onClick={handleToggle} cursor="pointer" />
            </div>

            <Grid container sx={{ padding: 3 }} spacing={3} >
                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.name != null}
                        label="Nombre y apellidos"
                        helperText={errors.name}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.name}
                        onChange={(event) => {
                            setValues({ ...values, name: event.target.value });
                            setErrors({ ...errors, name: null })
                        }}
                    />
                </Grid>

                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.ID !== null}
                        label="Identificación"
                        disabled={selectedAdopter !== null}
                        helperText={errors.ID}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.ID}
                        onChange={(event) => {
                            setValues({ ...values, ID: event.target.value });
                            setErrors({ ...errors, ID: null })
                        }}
                    />
                </Grid>

                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.email != null}
                        label="Correo electrónico"
                        helperText={errors.email}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.email}
                        onChange={(event) => {
                            setValues({ ...values, email: event.target.value });
                            setErrors({ ...errors, email: null })
                        }}
                    />
                </Grid>
                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.profession != null}
                        label="Profesión"
                        helperText={errors.profession}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.profession}
                        onChange={(event) => {
                            setValues({ ...values, profession: event.target.value });
                            setErrors({ ...errors, profession: null })
                        }}
                    />
                </Grid>
                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.address != null}
                        label="Dirección"
                        helperText={errors.address}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.address}
                        onChange={(event) => {
                            setValues({ ...values, address: event.target.value });
                            setErrors({ ...errors, address: null })
                        }}
                    />
                </Grid>
                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        error={errors.phone != null}
                        label="Celular"
                        helperText={errors.phone}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.phone}
                        onChange={(event) => {
                            setValues({ ...values, phone: event.target.value });
                            setErrors({ ...errors, phone: null })
                        }}
                    />
                </Grid>

                <Grid item md={6}
                    xs={12}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                    padding={1}
                >

                    <TextField
                        fullWidth
                        label="Teléfono fijo"
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                        value={values.housePhone}
                        onChange={(event) => {
                            setValues({ ...values, housePhone: event.target.value });
                            setErrors({ ...errors, housePhone: null })
                        }}
                    />
                </Grid>
            </Grid>


            {message && message.showIn === "form" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935", fontWeight: "bold", color: message.category === "success" ? green[600] : red[600] }} >{message.text}</Alert>}

            <Divider sx={{ mt: 2 }} />
            <Stack flexDirection="row" p={2} justifyContent={"flex-end"}>

                <Button variant="contained" color="inherit" style={{ borderRadius: "8px", marginTop: 25, marginRight: 12, }} onClick={() => handleToggle()}>Cerrar</Button>



                <LoadingButton loading={loading}
                    size="medium" variant="contained" color="primary" style={{ borderRadius: "8px", marginTop: 25, marginRight: 12 }}

                    onClick={() => {

                        if (!loading) {
                            onSubmit()

                        }
                    }}
                    startIcon={<AiOutlineSave size={20} />}

                >
                    Guardar
                </LoadingButton>
            </Stack>
        </div>
    )
}