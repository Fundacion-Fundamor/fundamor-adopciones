
import {
    Paper,
    Container,
    Button,
    Grid,
    Box,
    TextField,
    IconButton,
    Chip,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Autocomplete,
    Alert
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
import QuestionContext from '../../context/question/questionContext';
import AdoptionContext from '../../context/adoption/adoptionContext';
import AdopterContext from '../../context/adopter/adopterContext';
import AuthContext from '../../context/auth/authContext';

const steps = [
    "Selecciona el animal",
    "Selecciona el adoptante",
    "Llena el formulario",
    "Crea la adopción"
]


/**Formulario de registro de adopciones
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
    const { user } = useContext(AuthContext);
    const { animals, getAnimals } = useContext(AnimalContext); // contexto de animales
    const { questions, getQuestions } = useContext(QuestionContext); // contexto de preguntas
    const { message, loading, handleAdoptionMessage, createAdoption } = useContext(AdoptionContext);// contexto de adopcion
    const { getAdopters, adopters } = useContext(AdopterContext);// contexto de adoptante

    const [showAdopterForm, setShowAdopterForm] = useState(false);

    const [values, setValues] = useState({
        adoptionState: "",
        adoptionFinalDate: null,
        observations: ""
    });

    const [errors, setErrors] = useState({
        adoptionFinalDate: null,
        adoptionState: null,
        stepError: null,
        showErrorInStep: null
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
    const [localQuestions, setLocalQuestions] = useState([]);


    const resetForm = () => {
        setValues({
            adoptionState: "",
            adoptionFinalDate: null,
            observations: ""
        });
        setAdopterValues(
            {
                name: "",
                email: "",
                ID: "",
                profession: "",
                address: "",
                housePhone: "",
                phone: "",
            }
        );
        setShowAdopterForm(false);
        setAnimalSelected(null);
        setInputAnimalValue("");
        setAdopterSelected(null);
        setInputAdopterValue("");
        getAnimals({ estado: "Sin adoptar" });
        // getAdopters();
        getQuestions();
        setCurrentStep(0);
    }
    const toggleAdopterForm = () => {

        setShowAdopterForm(!showAdopterForm);
    }

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

    const handleAnswersAdopter = (text, questionId) => {

        let tmp = localQuestions.filter(element => {
            if (element.id_pregunta === questionId) {
                element.answer = text.trim();
            }
            return element;
        });
        setLocalQuestions(tmp);
    }

    /**Maneja siguiente paso del stepper y valida que se cumpla con todo lo requerido si se quiere continuar
     * 
     */
    const next = () => {

        if (currentStep !== 4) {
            if (currentStep === 0) {
                if (animalSelected !== null) {
                    setCurrentStep(currentStep + 1);
                    if (errors.showErrorInStep === 0) {
                        setErrors({
                            ...errors, showErrorInStep: null
                        });
                    }
                } else {

                    setErrors({
                        ...errors, ...{ stepError: "Debe seleccionar un animal", showErrorInStep: 0 }
                    });
                }
            } else if (currentStep === 1) {
                if (adopterSelected !== null || (adopterSelected === null && showAdopterForm && validateAdopterForm())) {//? cambiar cuando haga la correccion
                    setCurrentStep(currentStep + 1);
                    if (errors.showErrorInStep === 1) {
                        setErrors({
                            ...errors, showErrorInStep: null
                        });
                    }
                } else {
                    setErrors({ ...errors, ...{ stepError: "Debe seleccionar o registrar un adoptante", showErrorInStep: 1 } });

                }
            }
            else if (currentStep === 2) {
                let answered = (localQuestions.filter(element => element.answer !== undefined && element.answer !== ""));
                if (answered.length === localQuestions.length) {
                    setCurrentStep(currentStep + 1);
                    if (errors.showErrorInStep === 2) {
                        setErrors({
                            ...errors, showErrorInStep: null
                        });
                    }
                } else {
                    setErrors({ ...errors, ...{ stepError: "Debe responder todas las preguntas", showErrorInStep: 2 } });

                }
            } else if (currentStep === 3) {
                if (!loading) {
                    if (values.adoptionState === "") {
                        setErrors({ ...errors, ...{ adoptionState: "Debe seleccionar un estado" } });
                    } else {
                        createAdoption(values, animalSelected, adopterSelected, adopterValues, localQuestions);
                    }
                }
            }

        }
    }
    const previous = () => {
        if (currentStep !== 0) {
            setCurrentStep(currentStep - 1);
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

                await handleAdoptionMessage(null);
                // history.push("/adoptions");
            }
        }
        if (message && message.showIn === "form") {

            if (message.category === "success") {
                setCurrentStep(currentStep + 1);
            } else {
                displayAlert();
            }
        }

    }, [message]);

    useEffect(() => {
        getAnimals({ estado: "Sin adoptar" });
        getQuestions();
        getAdopters();
    }, [])

    useEffect(() => {
        setLocalQuestions([...questions]);

    }, [questions])

    useEffect(() => {
        setAdopterValues(
            {
                name: "",
                email: "",
                ID: "",
                profession: "",
                address: "",
                housePhone: "",
                phone: "",
            }
        );
        setAdopterSelected(null);
    }, [showAdopterForm])

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

                    {(errors.stepError !== null && errors.showErrorInStep !== null && errors.showErrorInStep === currentStep) ? <Alert severity="error" variant="filled" style={{ marginTop: 20, marginBottom: 5, width: "90%" }} >{errors.stepError}</Alert> : null}

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
                                options={adopters}
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
                                            value={adopterValues.email}
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
                    {currentStep === 2 ?
                        <div style={{ width: "90%" }}>
                            {localQuestions.map((element, index) => element.tipo_pregunta === "abierta" ? (

                                <div className="form-group" key={index} >
                                    <OPTextField onBlur={handleAnswersAdopter} data={element} />
                                </div>
                            ) : (
                                <FormControl component="fieldset" sx={{ marginTop: 2 }} key={index} >
                                    <FormLabel component="label" sx={{ fontSize: 14 }} >{element.titulo}</FormLabel>
                                    <RadioGroup

                                        aria-label={element.titulo}
                                        name="radio-buttons-group"
                                        onChange={(event) => handleAnswersAdopter(event.target.value, element.id_pregunta)}
                                    >

                                        {element.questionOptions.map((questionOption, subIndex) => (
                                            <FormControlLabel value={questionOption.descripcion} checked={questionOption.descripcion === element.answer} key={subIndex} control={<Radio />} label={questionOption.descripcion} />
                                        ))}


                                    </RadioGroup>


                                </FormControl>
                            ))}
                        </div>
                        : null}
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
                                        onChange={() => { }}
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
                                    value={user.nombre}
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
                                    value={adopterSelected ? adopterSelected.nombre : adopterValues.name}
                                    disabled
                                    fullWidth

                                />


                            </Grid>

                            <Grid item xs={12} md={6}
                                justifyContent="flex-start"
                                flexDirection="column"
                                display="flex"
                                padding={1}
                            >


                                <FormControl fullWidth variant="standard" error={errors.adoptionState !== null} >
                                    <InputLabel id="animal-size"  >Estado de la adopción</InputLabel>
                                    <Select

                                        labelId="animal-size"
                                        id="animal-size-select"
                                        value={values.adoptionState}
                                        label="Seleccione el estado"
                                        onChange={(event) => {
                                            setValues({
                                                ...values, adoptionState: event.target.value
                                            });
                                            setErrors({ ...errors, adoptionState: null });
                                        }}
                                        error={errors.adoptionState !== null}
                                    >
                                        <MenuItem value={"En espera"}>En espera</MenuItem>
                                        <MenuItem value={"En proceso"}>En proceso</MenuItem>
                                        <MenuItem value={"Finalizada"}>Finalizada</MenuItem>

                                    </Select>

                                </FormControl>
                                {errors.adoptionState && <FormHelperText error={true}>{errors.adoptionState}</FormHelperText>}
                            </Grid>
                            <Grid item md={6}
                                xs={12}
                                justifyContent="center"
                                display="flex"
                                flexDirection="column"
                                padding={1}
                            >

                                {values.adoptionState === "Finalizada" ? <LocalizationProvider dateAdapter={DateAdapter} >
                                    <DatePicker
                                        label="Fecha de entrega"
                                        value={values.adoptionFinalDate}
                                        mask={'__/__/____'}
                                        renderInput={(params) => <TextField {...params} variant="standard" />}
                                        onChange={(newValue) => {

                                            setValues({ ...values, adoptionFinalDate: newValue });

                                        }}
                                    />
                                </LocalizationProvider> : null}
                            </Grid>
                     
                            <Grid item xs={12} md={12} padding={1}>
                                <TextField label="Observaciones" fullWidth multiline={true} minRows={4} variant="filled"
                                    onBlur={(event) => {
                                        setValues({ ...values, observations: event.target.value });
                                    }}
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>
                        </Grid>

                        : null}
                    {currentStep === 4 ? <div>
                        <p>Se ha registrado el proceso con exito</p>
                        <Button size="medium" variant="contained" sx={{ marginTop: 5 }} color="primary" onClick={() => { resetForm(); }} >Ir al inicio</Button>
                    </div> : null}



                    {loading && <div style={{ marginTop: 25, marginBottom: 25, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress color="primary" />
                        <p style={{ marginLeft: 10 }}>Guardando...</p>
                    </div>}
                    <Box sx={{ justifyContent: "center", paddingBottom: 3 }} display="flex">

                        {currentStep > 0 && currentStep < 4 && <Button size="medium" variant="outlined" sx={{ marginTop: 5 }} color="primary" onClick={() => previous()} >Atrás</Button>}

                        {currentStep !== 4 && <Button size="medium" variant="contained" color="primary" sx={{ marginTop: 5, marginLeft: 5 }}
                            onClick={() => next()}>{currentStep === 3 ? "Finalizar" : "Siguiente"}</Button>}

                    </Box>
                </Box>

            </Paper >
        </Container>
    );

}


/**Textfield construido de manera diferente para evitar delay al momento de teclear
 * 
 */
const OPTextField = ({ onBlur, data }) => {

    const [value, setValue] = useState(data.answer !== undefined ? data.answer : "");

    return (
        <TextField
            fullWidth
            label={data.titulo}
            variant="standard"
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}

            onBlur={(event) => onBlur(event.target.value, data.id_pregunta)}
        />
    )

}

