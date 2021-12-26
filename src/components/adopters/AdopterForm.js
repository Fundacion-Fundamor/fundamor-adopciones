//eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect, useContext } from 'react'
import './form.scss';
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, TextField, Select, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import AdopterContext from '../../context/adopter/adopterContext';


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

    const onSubmit = async () => {
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
    }, [message]);


    return (
        <div style={{ minWidth: 340, width: 400, backgroundColor: "#fff", padding: 15, borderRadius: 4, margin: 30, marginBottom: 30 }}>


            <div className="form-container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {selectedAdopter ?
                        <h3>Edita los datos del adoptante </h3>
                        :
                        <h3>Registra algún adoptante para vincularlo a un proceso de adopción</h3>}
                    <GrClose size={selectedAdopter ? 25 : 35} color="#000" onClick={handleToggle} cursor="pointer" />
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
                        disabled={selectedAdopter !== null}
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
                <div className="form-group">
                    <TextField
                        fullWidth
                        error={errors.profession != null}
                        label="Profesión"
                        helperText={errors.profession}
                        variant="standard"
                        value={values.profession}
                        onChange={(event) => {
                            setValues({ ...values, profession: event.target.value });
                            setErrors({ ...errors, profession: null })
                        }}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        fullWidth
                        error={errors.address != null}
                        label="Dirección"
                        helperText={errors.address}
                        variant="standard"
                        value={values.address}
                        onChange={(event) => {
                            setValues({ ...values, address: event.target.value });
                            setErrors({ ...errors, address: null })
                        }}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        error={errors.phone != null}
                        label="Celular"
                        helperText={errors.phone}
                        variant="standard"
                        value={values.phone}
                        onChange={(event) => {
                            setValues({ ...values, phone: event.target.value });
                            setErrors({ ...errors, phone: null })
                        }}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        fullWidth
                        label="Teléfono fijo"
                        variant="standard"
                        value={values.housePhone}
                        onChange={(event) => {
                            setValues({ ...values, housePhone: event.target.value });
                            setErrors({ ...errors, housePhone: null })
                        }}
                    />
                </div>



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