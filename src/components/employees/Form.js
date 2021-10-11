import React, { useState, useEffect } from 'react'
import './form.scss';
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import { GrClose } from 'react-icons/gr';


/**Componente encargado del registro y edición de un colaborador
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Form({ saveEmployee, handleToggle, employee = null }) {

    const [values, setValues] = useState({
        name: employee ? employee.nombre : "",
        email: employee ? employee.correo : "",
        ID: employee ? employee.id_empleado : "",
        password: "",
        passwordConfirm: "",
        role: employee ? employee.rol : "",
        enablePassword: employee === null
    });


    const [errors, setErrors] = useState({
        name: null,
        email: null,
        ID: null,
        password: null,
        passwordConfirm: null,
        role: null
    });


    const [loading, setLoading] = useState(false);
    const [errorRequest, setErrorRequest] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const onSubmit = async () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //se validan los campos del formulario

        if (values.name === "") {
            setErrors({ ...errors, ["name"]: "Debe ingresar un nombre" });
        } else if (values.ID === "") {
            setErrors({ ...errors, ["ID"]: "Debe ingresar una identificación" });
        } else if (values.email === "" || re.test(values.email) === false) {
            setErrors({ ...errors, ["email"]: "Debe ingresar un  correo válido" });
        } else if (values.role === "") {
            setErrors({ ...errors, ["role"]: "Debe seleccionar un rol" });
        } else if (values.enablePassword && values.password === "") {
            setErrors({ ...errors, ["password"]: "Debe ingresar una contraseña" });
        } else if (values.enablePassword && values.password.length < 6) {
            setErrors({ ...errors, ["password"]: "La contraseña debe tener mínimo 6 caracteres" });
        } else if (values.enablePassword && values.password !== values.passwordConfirm) {
            setErrors({ ...errors, ["passwordConfirm"]: "Las contraseñas no coinciden" });
        } else {


            setLoading(true);
            setErrorRequest(null);
            setSuccessMessage(null);

            //se guardan los datos del colaborador
            const res = await saveEmployee(values, employee !== null);

            if (!res.state) {
                setErrorRequest(res.msg);
            } else {

                if (employee === null) {
                    setValues({
                        ...values, ...{
                            name: "",
                            email: "",
                            ID: "",
                            password: "",
                            role: "",
                            passwordConfirm: ""
                        }
                    });
                }
                setSuccessMessage(res.msg);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        setSuccessMessage(null);
    }, [values])

    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 15, margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {employee ?
                        <h3>Edita los datos del colaborador </h3>
                        :
                        <h3>Registra los colaboradores que tendrán acceso a la plataforma de adopción </h3>}
                    <GrClose size={employee ? 25 : 35} color="#000" onClick={handleToggle} cursor="pointer" />
                </div>
                <div class="form-group">

                    <TextField
                        fullWidth
                        error={errors.name}
                        label="Nombre y apellidos"
                        helperText={errors.name}
                        variant="standard"
                        value={values.name}
                        onChange={(event) => {
                            setValues({ ...values, ["name"]: event.target.value });
                            setErrors({ ...errors, ["name"]: null })
                        }}
                    />
                </div>

                <div class="form-group">
                    <TextField
                        fullWidth
                        error={errors.ID}
                        label="Identificación"
                        disabled={employee !== null}
                        helperText={errors.ID}
                        variant="standard"
                        value={values.ID}
                        onChange={(event) => {
                            setValues({ ...values, ["ID"]: event.target.value });
                            setErrors({ ...errors, ["ID"]: null })
                        }}
                    />
                </div>
                <div class="form-group">
                    <TextField
                        fullWidth
                        error={errors.email}
                        label="Correo electrónico"
                        helperText={errors.email}
                        variant="standard"
                        value={values.email}
                        onChange={(event) => {
                            setValues({ ...values, ["email"]: event.target.value });
                            setErrors({ ...errors, ["email"]: null })
                        }}
                    />
                </div>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label" error={errors.role} >Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.role}
                        label="Seleccione el rol"
                        onChange={(event) => {
                            setValues({
                                ...values, ["role"]: event.target.value
                            });
                            setErrors({ ...errors, ["role"]: null });
                        }}
                        error={errors.role}
                    >
                        <MenuItem value={"administrador"}>Administrador</MenuItem>
                        <MenuItem value={"colaborador"}>Colaborador</MenuItem>
                    </Select>
                    {errors.role && <FormHelperText error={true}>{errors.role}</FormHelperText>}
                </FormControl>

                {employee !== null && <FormControlLabel style={{ marginTop: 15 }} control={<Checkbox defaultChecked checked={values.enablePassword} onChange={() => { setValues({ ...values, ["enablePassword"]: !values.enablePassword }) }} />} label="Editar contraseña" />}
                {(values.enablePassword || employee === null) && <>
                    <div class="form-group">
                        <TextField
                            fullWidth
                            error={errors.password}
                            label="Contraseña"
                            helperText={errors.password}
                            variant="standard"
                            value={values.password}
                            onChange={(event) => {
                                setValues({ ...values, ["password"]: event.target.value });
                                setErrors({ ...errors, ["password"]: null })
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <TextField
                            fullWidth
                            error={errors.passwordConfirm}
                            label="Confirmación de contraseña"
                            helperText={errors.passwordConfirm}
                            variant="standard"
                            value={values.passwordConfirm}
                            onChange={(event) => {
                                setValues({ ...values, ["passwordConfirm"]: event.target.value });
                                setErrors({ ...errors, ["passwordConfirm"]: null })
                            }}
                        />
                    </div>
                </>}

                {loading && <div style={{ marginTop: 15, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress color="success" />
                    <p style={{ marginLeft: 10 }}>Cargando...</p>
                </div>}

                {successMessage && <Alert severity="success" variant="filled" style={{ marginTop: 20, }}  >{successMessage}</Alert>}

                {errorRequest && <Alert severity="error" variant="filled" style={{ marginTop: 20, marginBottom: 5 }} >{errorRequest}</Alert>}

                <Button variant="contained" style={{ width: "100%", marginTop: 25 }} onClick={() => { if (!loading) { onSubmit() } }}>Guardar</Button>
            </div>
        </div>
    )
}