
import {
    Paper,
    Container,
    Button,
    Grid,
    Box,
    TextField,
    IconButton,
    Chip,
    Checkbox,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Autocomplete,

} from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { GrDocumentText } from 'react-icons/gr'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { BiTrashAlt } from 'react-icons/bi';
import moment from 'moment';
import 'moment/locale/es';
import AnimalContext from '../../context/animal/animalContext';
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const steps = [
    "Selecciona el animal",
    "Selecciona el adoptante",
    "Llena el formulario",
    "Crea la adopción"
]


/**Formulario de registro para animales
 * 
 * Solo los campos requeridos en la bd son validados
 * @returns 
 */
export default function Form() {
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

    let history = useHistory();

    const MySwal = withReactContent(Swal);
    const [currentStep, setCurrentStep] = useState(0);
    const { message, loading, handleAnimalMessage, animals, getAnimals } = useContext(AnimalContext); // contexto de animales

    const [showAdopterForm, setShowAdopterForm] = useState(false);


    const toggleAdopterForm = () => {

        setShowAdopterForm(!showAdopterForm);
    }
    const [values, setValues] = useState({

        name: "",
        specie: "",
        birthday: null,
        characteristics: "",
        rescueSite: "",
        rescueDate: null,
        color: "",
        vaccine: "",
        sterilized: false,
        dewormed: false,
        size: "",
        animalState: "Sin adoptar",
        gender: "",
        images: []
    });

    const [errors, setErrors] = useState({
        name: null,
        specie: null,
        birthday: null,
        characteristics: null,
        rescueSite: null,
        rescueDate: null,
        color: null,
        vaccine: null,
        sterilized: null,
        dewormed: null,
        size: null,
        animalState: null,
        gender: null

    });


    const [adopterValues, setAdopterValues] = useState({
        name: "",
        email: "",
        ID: "",
        profession: "",
        address: "",
        housePhone: "",
        phone: "",
    });

    const [adopterErrors, setAdopterErrors] = useState({
        name: null,
        email: null,
        ID: null,
        profession: null,
        address: null,
        phone: null
    });


    const [animalSelected, setAnimalSelected] = useState(null);
    const [inputAnimalValue, setInputAnimalValue] = useState('');
    const [adopterSelected, setAdopterSelected] = useState(null);
    const [inputAdopterValue, setInputAdopterValue] = useState('');


    const validateAdopterForm = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (adopterValues.name === "") {
            setAdopterErrors({ ...adopterErrors, name: "Debe ingresar un nombre" });
        } else if (adopterValues.ID === "") {
            setAdopterErrors({ ...adopterErrors, ID: "Debe ingresar una identificación" });
        } else if (adopterValues.email !== "" && re.test(adopterValues.email) === false) {
            setAdopterErrors({ ...adopterErrors, email: "Debe ingresar un  correo válido" });
        } else if (adopterValues.profession === "") {
            setAdopterErrors({ ...adopterErrors, profession: "Debe especificar una profesión" });
        } else if (adopterValues.address === "") {
            setAdopterErrors({ ...adopterErrors, address: "Debe ingresar una dirección" });
        } else if (adopterValues.phone === "") {
            setAdopterErrors({ ...adopterErrors, phone: "Debe ingresar un número de celular" });
        } else {
            return true;
        }
        return false;
    }
    const next = () => {
        if (currentStep !== 4) {
            if (currentStep === 0) {
                if (animalSelected !== null) {
                    setCurrentStep(currentStep + 1);
                } else {
                    console.log("debe seleccionar un animal");
                }
            } else if (currentStep === 1) {
                if (adopterSelected !== null) {//? cambiar cuando haga la correccion
                    setCurrentStep(currentStep + 1);
                } else if (adopterSelected === null && showAdopterForm && validateAdopterForm()) {

                    setCurrentStep(currentStep + 1);

                } else {
                    console.log("debe seleccionar un adoptante");
                }
            }
            else if (currentStep === 2) {
                if (adopterSelected === null) {//? cambiar cuando haga la correccion
                    setCurrentStep(currentStep + 1);
                } else {
                    console.log("debe seleccionar un adoptante");
                }
            } else if (currentStep === 3) {
                setCurrentStep(currentStep + 1);
            }

        }
    }
    const previous = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
        }
    }
    /**Captura el cambio al seleccionar una nueva imágen
     * 
     * @param {*} imageList 
     * @param {*} addUpdateIndex 
     */


    /**Se validan los campos requeridos en la bd
     * 
     */
    const onSubmit = async () => {

        if (values.name === "") {
            setErrors({ ...errors, name: "Debe ingresar un nombre" });
        } else if (values.specie === "") {
            setErrors({ ...errors, specie: "Debe seleccionar una especie" });
        } else if (values.birthday === null) {
            setErrors({ ...errors, birthday: "Debe seleccionar una fecha" });
        } else if (values.color === "") {
            setErrors({ ...errors, color: "Debe seleccionar un color" });
        } else if (values.gender === "") {
            setErrors({ ...errors, gender: "Debe seleccionar una opción" });
        } else if (values.size === "") {
            setErrors({ ...errors, size: "Debe seleccionar un tamaño" });
        } else {

        }
    }

    useEffect(() => {
        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,

            });


            if (res.isConfirmed) {

                await handleAnimalMessage(null);
                history.push("/gallery");
            }
        }
        if (message && message.showIn === "form") {

            displayAlert();
        }

    }, [message]);

    useEffect(() => {
        getAnimals();
    }, [])

    return (
        <Container maxWidth="sm" sx={{ marginBottom: 5, marginTop: 5 }}>
            <Paper elevation={3}>
                <div style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#2E2E2E",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex"
                }}>
                    <h3 style={{ color: "#FFF" }}>Nueva adopción</h3>
                </div>

                <Stepper activeStep={currentStep} alternativeLabel sx={{ marginTop: 5 }}>
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box component="div" sx={{ margin: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {currentStep === 0 ?

                        <Autocomplete
                            id=""
                            sx={{ width: "90%", marginTop: 5 }}
                            options={animals}
                            value={animalSelected}
                            disableClearable
                            onChange={(event, newValue) => {

                                setAnimalSelected(newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputAnimalValue(newInputValue);
                            }}
                            getOptionLabel={(option, props) => option.id_animal.toString() + " " + option.nombre.toString()}
                            inputValue={inputAnimalValue}
                            lang="Colombia"
                            renderOption={(props, option) => {
                                return (
                                    <Box key={option.id_animal.toString()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {/* {option.animalImage.length !== 0 ? <img width="20" src={`${process.env.REACT_APP_API_URL}/${option.animalImage[0].ruta}`} alt="card" /> :
                                            <img width="20" src={`${process.env.REACT_APP_URL}/images/sin_imagen.png`} alt="card" />} */}

                                        {option.id_animal}{" "}{option.nombre}
                                    </Box>
                                )
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Ingresa el nombre"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />


                        : null}
                    {currentStep === 1 ?
                        <>
                            {!showAdopterForm ? <Autocomplete
                                id=""
                                sx={{ width: "90%", marginTop: 5 }}
                                options={[]}
                                value={adopterSelected}
                                disableClearable
                                onChange={(event, newValue) => {

                                    setAdopterSelected(newValue);
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setInputAdopterValue(newInputValue);
                                }}
                                getOptionLabel={(option, props) => option.id_adoptante.toString() + " " + option.nombre.toString()}
                                inputValue={inputAdopterValue}
                                lang="Colombia"
                                renderOption={(props, option) => {
                                    return (
                                        <Box key={option.id_adoptante.toString()} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {/* {option.animalImage.length !== 0 ? <img width="20" src={`${process.env.REACT_APP_API_URL}/${option.animalImage[0].ruta}`} alt="card" /> :
                                            <img width="20" src={`${process.env.REACT_APP_URL}/images/sin_imagen.png`} alt="card" />} */}

                                            {option.id_adoptante}{" "}{option.nombre}
                                        </Box>
                                    )
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Identificación del adoptante"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}

                            /> : null}
                            <Button size="medium" variant="contained" sx={{ marginTop: 5 }} color="info" onClick={() => toggleAdopterForm()} >{showAdopterForm ? "Buscar adoptante" : "Registrar adoptante"}</Button>

                            {showAdopterForm ?
                                <div style={{ width: "90%", display: "flex", flexDirection: "column" }}>
                                    <div className="form-group">

                                        <TextField
                                            fullWidth
                                            error={adopterErrors.name != null}
                                            label="Nombre y apellidos"
                                            helperText={adopterErrors.name}
                                            variant="standard"
                                            value={adopterValues.name}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, name: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, name: null })
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            error={adopterErrors.ID !== null}
                                            label="Identificación"
                                            helperText={adopterErrors.ID}
                                            variant="standard"
                                            value={adopterValues.ID}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, ID: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, ID: null })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            error={adopterErrors.email != null}
                                            label="Correo electrónico"
                                            helperText={adopterErrors.email}
                                            variant="standard"
                                            value={values.email}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, email: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, email: null })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            error={adopterErrors.profession != null}
                                            label="Profesión"
                                            helperText={adopterErrors.profession}
                                            variant="standard"
                                            value={adopterValues.profession}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, profession: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, profession: null })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            error={adopterErrors.address != null}
                                            label="Dirección"
                                            helperText={adopterErrors.address}
                                            variant="standard"
                                            value={adopterValues.address}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, address: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, address: null })
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            error={adopterErrors.phone != null}
                                            label="Celular"
                                            helperText={adopterErrors.phone}
                                            variant="standard"
                                            value={adopterValues.phone}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, phone: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, phone: null })
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <TextField
                                            fullWidth
                                            label="Teléfono fijo"
                                            variant="standard"
                                            value={adopterValues.housePhone}
                                            onChange={(event) => {
                                                setAdopterValues({ ...adopterValues, housePhone: event.target.value });
                                                setAdopterErrors({ ...adopterErrors, housePhone: null })
                                            }}
                                        />
                                    </div>
                                </div>

                                : null


                            }
                        </>
                        : null}
                    {currentStep === 2 ? <p>paso 3</p> : null}
                    {currentStep === 3 ?

                        <Grid container sx={{ padding: 3 }} >
                            <Grid item md={6}
                                xs={12}
                                justifyContent="center"
                                display="flex"
                                flexDirection="column"
                                padding={1}
                            >

                                <LocalizationProvider dateAdapter={DateAdapter} >
                                    <DatePicker
                                        label="Fecha de estudio"

                                        value={new moment()}
                                        disabled
                                        mask={'__/__/____'}


                                        renderInput={(params) => <TextField {...params} variant="standard" />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item md={6}
                                xs={12}
                                justifyContent="center"
                                display="flex"
                                flexDirection="column"
                                padding={1}
                            >
                                <TextField label="Colaborador encargado"
                                    variant="standard"
                                    value={"colaborador del context"}
                                    disabled

                                />
                            </Grid>

                            <Grid item xs={12} md={6}
                                justifyContent="flex-end"
                                flexDirection="column"
                                display="flex"
                                padding={1}
                            >
                                <TextField label="Animal involucrado"
                                    variant="standard"
                                    value={animalSelected.nombre}
                                    disabled

                                />
                            </Grid>


                            <Grid item xs={12} md={6}
                                justifyContent="flex-start"
                                flexDirection="row"
                                display="flex"
                                padding={1}
                            >
                                <TextField label="Adoptante involucrado"
                                    variant="standard"
                                    // value="el que se seleccione"
                                    disabled

                                />


                            </Grid>

                            <Grid item xs={12} md={6}
                                justifyContent="flex-start"
                                flexDirection="column"
                                display="flex"
                                padding={1}
                            >


                                <FormControl fullWidth variant="standard" error={errors.size !== null} >
                                    <InputLabel id="animal-size"  >Estado</InputLabel>
                                    <Select

                                        labelId="animal-size"
                                        id="animal-size-select"
                                        value={values.size}
                                        label="Seleccione el estado"
                                        onChange={(event) => {
                                            setValues({
                                                ...values, size: event.target.value
                                            });
                                            setErrors({ ...errors, size: null });
                                        }}
                                        error={errors.size !== null}
                                    >
                                        <MenuItem value={"en espera"}>En espera</MenuItem>
                                        <MenuItem value={"en proceso"}>En proceso</MenuItem>
                                        <MenuItem value={"finalizada"}>Finalizada</MenuItem>

                                    </Select>

                                </FormControl>
                                {errors.size && <FormHelperText error={true}>{errors.size}</FormHelperText>}
                            </Grid>
                            <Grid item md={6}
                                xs={12}
                                justifyContent="center"
                                display="flex"
                                flexDirection="column"
                                padding={1}
                            >

                                <LocalizationProvider dateAdapter={DateAdapter} >
                                    <DatePicker
                                        label="Fecha de entrega"
                                        value={null}
                                        mask={'__/__/____'}
                                        renderInput={(params) => <TextField {...params} variant="standard" />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={12}
                                justifyContent="center"
                                alignItems="center"
                                flexDirection="row"
                                display="flex"
                                padding={1}
                            >

                                <h4>Revisar respuestas del formulario</h4>
                                <IconButton aria-label="share" onClick={() => {
                                    console.log("despliega un modal con la lista de preguntas y respuestas");
                                }}>
                                    <GrDocumentText
                                        size={25}

                                        cursor="pointer"
                                    />
                                </IconButton>

                            </Grid>
                            <Grid item xs={12} md={12} padding={1}>
                                <TextField label="Observaciones" fullWidth multiline={true} minRows={4} variant="filled"
                                    // onBlur={(event) => {
                                    //     setValues({ ...values, vaccine: event.target.value });
                                    // }}
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>
                        </Grid>

                        : null}
                    {currentStep === 4 ? <p>Se ha registrado el proceso con exito</p> : null}



                    {loading && <div style={{ marginTop: 25, marginBottom: 25, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress color="success" />
                        <p style={{ marginLeft: 10 }}>Guardando...</p>
                    </div>}
                    <Box sx={{ justifyContent: "center", paddingBottom: 3 }} display="flex">

                        {currentStep > 0 && currentStep < 4 && <Button size="medium" variant="contained" sx={{ marginTop: 5 }} color="secondary" onClick={() => previous()} >Atrás</Button>}

                        {currentStep !== 4 && <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5, marginLeft: 5 }} onClick={() => next()} >{currentStep === 3 ? "Finalizar" : "Siguiente"}</Button>}
                        {/* <Button size="medium" variant="contained" color="success" onClick={() => {
                        console.log(loading)
                        if (!loading) {
                            onSubmit()
                        }
                    }}>Guardar registro</Button> */}
                    </Box>
                </Box>

            </Paper >
        </Container>
    );

}

