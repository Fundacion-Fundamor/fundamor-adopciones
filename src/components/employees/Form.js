import React, { useState } from 'react'

import './form.scss'

import { MoonLoader } from 'react-spinners';
import Select from 'react-select'

const options = [
    { value: 'administrador', label: 'Adminsitrador' },
    { value: 'colaborador', label: 'Colaborador' },
];

export default function Form({ saveEmployee }) {

    const [values, setValues] = useState({
        name: "",
        email: "",
        ID: "",
        password: "",
        role: ""
    });
    const [loading, setLoading] = useState(false);

    const [errorsRequest, setErrorsRequest] = useState([]);

    const onSubmit = async () => {

        //se validan los campos del formulario

        //se guarda el colaborador
        setLoading(true);

        
        const res=await saveEmployee(values.email, values.password, values.name, values.ID, values.role);


        //se setean los errores


        setLoading(false);
    }

    const override = `
    display: block;
    margin: 0 auto;
    border-color: red;`;

    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 15, margin: 30, marginBottom: 30 }}>
            <h3>Registra los colaboradores que tendrán acceso a la plataforma de adopción </h3>
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
                <MoonLoader color={"#007ee5"} loading={true} size={40} css={override} />
                <p>Cargando </p>
            </div>}
            <button type="button" class="ripple" onClick={() => { onSubmit() }}>Guardar</button>


        </div>
    )
}