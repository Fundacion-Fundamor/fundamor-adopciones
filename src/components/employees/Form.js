import React, { useState, useEffect } from 'react'
import './form.scss';
import Select from 'react-select'
import { Alert, Button, CircularProgress } from '@mui/material';
import { BiMenuAltLeft } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';


const options = [
    { value: 'administrador', label: 'Adminsitrador' },
    { value: 'colaborador', label: 'Colaborador' },
];

export default function Form({ saveEmployee, handleToggle, }) {

    const [values, setValues] = useState({
        name: "",
        email: "",
        ID: "",
        password: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorRequest, setErrorRequest] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const onSubmit = async () => {

        //se validan los campos del formulario

        //se guarda el colaborador
        setLoading(true);
        setErrorRequest(null);
        setSuccessMessage(null);

        const res = await saveEmployee(values.email, values.password, values.name, values.role, values.ID);

        if (!res.state) {
            setErrorRequest(res.msg);
        } else {

            setValues({
                name: "",
                email: "",
                ID: "",
                password: "",
                role: ""
            });

            setSuccessMessage(res.msg);
        }
        //se setean los errores


        setLoading(false);
    }

    const override = `
    display: block;
    margin: 0 auto;
    border-color: red;`;

    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 15, margin: 30, marginBottom: 30 }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Registra los colaboradores que tendrán acceso a la plataforma de adopción </h3>
                <GrClose size={35} color="#000" onClick={handleToggle} />
            </div>
            <div class="form-group">

                <input className="form-input" type="text" name="name" value={values.name} onChange={(event) => {
                    setValues({ ...values, ["name"]: event.target.value });
                }} required={true} />
                <label className="form-label"> Nombre: </label>
                <div class="login__bar"></div>
            </div>



            <div class="form-group">

                <input className="form-input" type="text" value={values.ID} onChange={(event) => {
                    setValues({ ...values, ["ID"]: event.target.value });
                }} required={true} />
                <label className="form-label" > Identificacion: </label>
                <div class="login__bar"></div>
            </div>
            <div class="form-group">

                <input className="form-input" type="text" value={values.email} onChange={(event) => {
                    setValues({ ...values, ["email"]: event.target.value });
                }} required={true} />
                <label className="form-label"> Correo: </label>
                <div class="login__bar"></div>
            </div>

            <div class="form-group">

                <input className="form-input" type="text" value={values.password} onChange={(event) => {
                    setValues({ ...values, ["password"]: event.target.value });
                }} required={true} />
                <label className="form-label" > Contraseña: </label>
                <div class="login__bar"></div>
            </div>

            <div style={{ marginTop: 20 }}>
                <Select placeholder={"Seleccione el rol"} options={options} onChange={(option) => { setValues({ ...values, ["role"]: option.value }); }} />
                <div class="login__bar"></div>
            </div>

            {loading && <div style={{ marginTop: 15, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CircularProgress color="success" />
                <p>Cargando </p>
            </div>}

            {successMessage && <Alert severity="success" variant="filled" style={{ marginTop: 25, marginBottom: 5 }}  >{successMessage}</Alert>}

            {errorRequest && <Alert severity="error" variant="filled" style={{ marginTop: 25, marginBottom: 5 }} >{errorRequest}</Alert>}

            <Button variant="contained" style={{ width: "100%", marginTop: 25 }} onClick={() => { onSubmit() }}>Guardar</Button>

        </div>
    )
}