/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useContext } from 'react'
import './form.scss';
import { Alert, FormControl, InputLabel, Grid, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox, Typography, Stack, Button, Divider, useMediaQuery, useTheme } from '@mui/material';
import EmployeeContext from '../../context/employee/employeeContext';
import { green, grey, red } from '@mui/material/colors';
import { IoClose } from 'react-icons/io5';
import { LoadingButton } from '@mui/lab';
import { AiOutlineSave } from 'react-icons/ai';


/**Componente encargado del registro y edición de un colaborador
 *
 * @param {*} param0 
 * @returns 
 */
export default function Form({ handleToggle }) {

    const { createEmployee, selectedEmployee, editEmployee, loading, message } = useContext(EmployeeContext);

    const [values, setValues] = useState({
        name: selectedEmployee ? selectedEmployee.nombre : "",
        email: selectedEmployee ? selectedEmployee.correo : "",
        ID: selectedEmployee ? selectedEmployee.id_empleado : "",
        password: "",
        passwordConfirm: "",
        role: selectedEmployee ? selectedEmployee.rol : "",
        enablePassword: selectedEmployee === null
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        ID: null,
        password: null,
        passwordConfirm: null,
        role: null
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
        } else if (values.email === "" || re.test(values.email) === false) {
            setErrors({ ...errors, email: "Debe ingresar un  correo válido" });
        } else if (values.role === "") {
            setErrors({ ...errors, role: "Debe seleccionar un rol" });
        } else if (values.enablePassword && values.password === "") {
            setErrors({ ...errors, password: "Debe ingresar una contraseña" });
        } else if (values.enablePassword && values.password.length < 6) {
            setErrors({ ...errors, password: "La contraseña debe tener mínimo 6 caracteres" });
        } else if (values.enablePassword && values.password !== values.passwordConfirm) {
            setErrors({ ...errors, passwordConfirm: "Las contraseñas no coinciden" });
        } else {

            if (selectedEmployee) {
                //se editan los datos del colaborador
                editEmployee(values);
            } else {
                //se guardan los datos del colaborador
                createEmployee(values);
            }

        }
    }

    useEffect(() => {

        if (message && message.category === "success" && message.showIn === "form" && selectedEmployee === null) {
            setValues({
                name: "",
                email: "",
                ID: "",
                password: "",
                passwordConfirm: "",
                role: selectedEmployee ? selectedEmployee.rol : "",
                enablePassword: selectedEmployee === null

            });
        }
    }, [message]);
    return (
        <div style={{ width: matchDownSm ? 650 : 659,  backgroundColor: "#fff", padding: 15, borderRadius: "16px", margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: selectedEmployee ? "flex-start" : "center" }}>
                    {selectedEmployee ?
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >Edita los datos del colaborador </Typography>
                        :
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Nuevo colaborador
                        </Typography>}
                    <IoClose size={35} color={grey[600]} onClick={handleToggle} cursor="pointer" />
                </div>
                <Grid container spacing={3} mt={2} >
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

                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
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
                            disabled={selectedEmployee !== null}
                            helperText={errors.ID}
                            variant="outlined"
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
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
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
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

                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-label"
                                sx={{
                                    background: "white",
                                    paddingX: "4px",
                                }}
                                error={errors.role !== null} >Rol</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.role}
                                variant='outlined'
                                label="Seleccione el rol"
                                onChange={(event) => {
                                    setValues({
                                        ...values, role: event.target.value
                                    });
                                    setErrors({ ...errors, role: null });
                                }}
                                error={errors.role !== null}
                            >
                                <MenuItem value={"administrador"}>Administrador</MenuItem>
                                <MenuItem value={"colaborador"}>Colaborador</MenuItem>
                            </Select>
                            {errors.role && <FormHelperText error={true}>{errors.role}</FormHelperText>}
                        </FormControl>

                    </Grid>


                </Grid>







                {selectedEmployee !== null && <FormControlLabel style={{ marginTop: 15 }} control={<Checkbox checked={values.enablePassword} onChange={() => { setValues({ ...values, enablePassword: !values.enablePassword }) }} />} label="Editar contraseña" />}

                {(values.enablePassword || selectedEmployee === null) && <Stack >

                    <TextField
                        fullWidth
                        error={errors.password !== null}
                        label="Contraseña"
                        helperText={errors.password}
                        variant="outlined"
                        sx={{my:2}}
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
                        value={values.password}
                        onChange={(event) => {
                            setValues({ ...values, password: event.target.value });
                            setErrors({ ...errors, password: null })
                        }}
                    />


                    <TextField
                        fullWidth
                        error={errors.passwordConfirm !== null}
                        label="Confirmación de contraseña"
                        helperText={errors.passwordConfirm}
                        variant="outlined"
                        InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", borderRadius: "12px" } }}
                        value={values.passwordConfirm}
                        onChange={(event) => {
                            setValues({ ...values, passwordConfirm: event.target.value });
                            setErrors({ ...errors, passwordConfirm: null })
                        }}
                    />

                </Stack>}


                {message && message.showIn === "form" && <Alert severity={message.category} variant="standard" style={{ marginTop: 20, borderRadius: 12, marginBottom: 5, borderWidth: 1, borderStyle: "solid", borderColor: message.category === "success" ? "#66bb6a" : "#e53935", fontWeight: "bold", color: message.category === "success" ? green[600] : red[600] }} >{message.text}</Alert>}

                <Divider sx={{ mt: 2 }} />

                <Stack flexDirection="row" justifyContent={"flex-end"}>

                    <Button variant="contained" color="inherit" style={{ borderRadius: "8px", marginTop: 25, marginRight: 12, }} onClick={() => handleToggle()}>Cerrar</Button>



                    <LoadingButton loading={loading}
                        size="medium" variant="contained" color="primary" style={{ borderRadius: "8px", marginTop: 25, }}

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
        </div>
    )
}