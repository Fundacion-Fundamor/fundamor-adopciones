/* eslint-disable react-hooks/exhaustive-deps */
//eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useContext } from 'react'
import './form.scss';
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox, Typography } from '@mui/material';
import EmployeeContext from '../../context/employee/employeeContext';
import { grey } from '@mui/material/colors';
import { IoClose } from 'react-icons/io5';


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
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: "16px", margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: selectedEmployee?"flex-start":"center" }}>
                    {selectedEmployee ?
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >Edita los datos del colaborador </Typography>
                        :
                        <Typography variant="t2" sx={{ fontWeight: "600", color: grey[600] }} >
                            Nuevo colaborador
                        </Typography> }
                    <IoClose size={ 35} color={grey[600]} onClick={handleToggle} cursor="pointer" />
                </div>
                <div className="form-group">

                    <TextField
                        fullWidth
                        error={errors.name != null}
                        label="Nombre y apellidos"
                        helperText={errors.name}
                        variant="standard"
                        value={values.name}
                        onChange={(event) => {
                            setValues({ ...values, name: event.target.value });
                            setErrors({ ...errors, name: null })
                        }}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        error={errors.ID !== null}
                        label="Identificación"
                        disabled={selectedEmployee !== null}
                        helperText={errors.ID}
                        variant="standard"
                        value={values.ID}
                        onChange={(event) => {
                            setValues({ ...values, ID: event.target.value });
                            setErrors({ ...errors, ID: null })
                        }}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        fullWidth
                        error={errors.email != null}
                        label="Correo electrónico"
                        helperText={errors.email}
                        variant="standard"
                        value={values.email}
                        onChange={(event) => {
                            setValues({ ...values, email: event.target.value });
                            setErrors({ ...errors, email: null })
                        }}
                    />
                </div>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label" error={errors.role !== null} >Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.role}
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

                {selectedEmployee !== null && <FormControlLabel style={{ marginTop: 15 }} control={<Checkbox checked={values.enablePassword} onChange={() => { setValues({ ...values, enablePassword: !values.enablePassword }) }} />} label="Editar contraseña" />}
                {(values.enablePassword || selectedEmployee === null) && <>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            error={errors.password !== null}
                            label="Contraseña"
                            helperText={errors.password}
                            variant="standard"
                            value={values.password}
                            onChange={(event) => {
                                setValues({ ...values, password: event.target.value });
                                setErrors({ ...errors, password: null })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            fullWidth
                            error={errors.passwordConfirm !== null}
                            label="Confirmación de contraseña"
                            helperText={errors.passwordConfirm}
                            variant="standard"
                            value={values.passwordConfirm}
                            onChange={(event) => {
                                setValues({ ...values, passwordConfirm: event.target.value });
                                setErrors({ ...errors, passwordConfirm: null })
                            }}
                        />
                    </div>
                </>}

                {loading && <div style={{ marginTop: 15, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress color="success" />
                    <p style={{ marginLeft: 10 }}>Cargando...</p>
                </div>}

                {message && message.showIn === "form" && <Alert severity={message.category} variant="filled" style={{ marginTop: 20, marginBottom: 5 }} >{message.text}</Alert>}

                <Button variant="contained" style={{ width: "100%", marginTop: 25 }} onClick={() => { if (!loading) { onSubmit() } }}>Guardar</Button>
            </div>
        </div>
    )
}