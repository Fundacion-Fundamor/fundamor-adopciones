
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
import ImageUploading from 'react-images-uploading';
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
    "Registra el formulario",
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
    const maxNumber = 8; //max number images

    let history = useHistory();

    const MySwal = withReactContent(Swal);
    const [currentStep, setCurrentStep] = useState(0);
    const { createAnimal, message, loading, handleAnimalMessage, animals, getAnimals } = useContext(AnimalContext); // contexto de animales


    const [images, setImages] = React.useState([]);

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
    const [animalSelected, setAnimalSelected] = useState(null);
    const [inputAnimalValue, setInputAnimalValue] = useState('');
    const [adopterSelected, setAdopterSelected] = useState(null);
    const [inputAdopterValue, setInputAdopterValue] = useState('');
    const next = () => {
        if (currentStep !== 4) {
            if (currentStep === 0) {
                if (animalSelected !== null) {
                    setCurrentStep(currentStep + 1);
                } else {
                    console.log("debe seleccionar un animal");
                }
            } else if (currentStep === 1) {
                if (adopterSelected === null) {//? cambiar cuando haga la correccion
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
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

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
            createAnimal(values, images);
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

                        <Autocomplete
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
                            inputValue={inputAnimalValue}
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
                        />

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
                                        label="Seleccione el tamaño"
                                        onChange={(event) => {
                                            setValues({
                                                ...values, size: event.target.value
                                            });
                                            setErrors({ ...errors, size: null });
                                        }}
                                        error={errors.size !== null}
                                    >
                                        <MenuItem value={"En proceso"}>En proceso</MenuItem>
                                        <MenuItem value={"Finalizada"}>Finalizada</MenuItem>

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
                {/* <Grid container sx={{ padding: 3 }} >
                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        display="flex"
                        flexDirection="column"
                        padding={1}
                    >

                        <TextField
                            fullWidth
                            error={errors.name !== null}
                            inputProps={{ maxLength: 45 }}
                            label="Nombre"
                            helperText={errors.name}
                            variant="standard"
                            onBlur={(event) => {
                                setValues({ ...values, name: event.target.value });
                                if (event.target.value !== "") {
                                    setErrors({ ...errors, name: null });
                                }
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
                        <FormControl component="fieldset" sx={{ marginTop: 2 }} error={errors.specie !== null}  >
                            <FormLabel component="label" sx={{ fontSize: 14 }} >Especie</FormLabel>
                            <RadioGroup

                                row aria-label="specie"
                                name="row-radio-buttons-group"
                                value={values.specie}
                                onChange={(event) => {
                                    setValues({ ...values, specie: event.target.value });
                                    setErrors({ ...errors, specie: null });
                                }}>
                                <FormControlLabel value="perro" control={<Radio />} label="Perro" />
                                <FormControlLabel value="gato" control={<Radio />} label="Gato" />
                            </RadioGroup>


                        </FormControl>
                        {errors.specie ? <FormHelperText error={true} >{errors.specie}</FormHelperText> : null}
                    </Grid>

                    <Grid item xs={12} md={6}
                        justifyContent="flex-end"
                        flexDirection="column"
                        display="flex"
                        padding={1}
                    >
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DatePicker
                                label="Fecha de nacimiento (aprox)"
                                maxDate={new moment()}
                                value={values.birthday}
                                mask={'__/__/____'}
                                onChange={(newValue) => {

                                    setValues({ ...values, birthday: newValue });
                                    setErrors({ ...errors, birthday: null });
                                }}

                                renderInput={(params) => <TextField {...params} variant="standard" helperText={errors.birthday} error={errors.birthday !== null} />}
                            />
                        </LocalizationProvider>
                        {values.birthday !== null ? <FormHelperText sx={{ color: "#0554b5" }} >{moment(values.birthday, "YYYYMMDD").fromNow()} de edad (Aproximadamente)</FormHelperText> : null}

                    </Grid>


                    <Grid item xs={12} md={6}
                        justifyContent="flex-start"
                        flexDirection="column"
                        display="flex"
                        padding={1}
                    >
                        <TextField label="Color"
                            variant="standard"
                            helperText={errors.color}
                            onBlur={(event) => {
                                setValues({ ...values, color: event.target.value });
                                if (event.target.value !== "") {
                                    setErrors({ ...errors, color: null });
                                }
                            }}
                            inputProps={{ maxLength: 45 }}
                            error={errors.color !== null}
                        />


                    </Grid>

                    <Grid item xs={12} md={6}
                        justifyContent="flex-start"
                        flexDirection="column"
                        display="flex"
                        padding={1}
                    >
                        <FormControl component="fieldset" sx={{ marginTop: 2 }} error={errors.gender !== null}>
                            <FormLabel component="label" sx={{ fontSize: 14 }}>Sexo</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={values.gender}
                                onChange={(event) => {
                                    setValues({ ...values, gender: event.target.value });
                                    setErrors({ ...errors, gender: null });
                                }}>
                                <FormControlLabel value="macho" control={<Radio />} label="Macho" />
                                <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
                            </RadioGroup>
                        </FormControl>
                        {errors.gender ? <FormHelperText error={true} >{errors.gender}</FormHelperText> : null}

                    </Grid>
                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        display="flex"
                        flexDirection="column"
                        padding={1}
                    >

                        <FormControl fullWidth variant="standard" error={errors.size !== null} >
                            <InputLabel id="animal-size"  >Tamaño</InputLabel>
                            <Select

                                labelId="animal-size"
                                id="animal-size-select"
                                value={values.size}
                                label="Seleccione el tamaño"
                                onChange={(event) => {
                                    setValues({
                                        ...values, size: event.target.value
                                    });
                                    setErrors({ ...errors, size: null });
                                }}
                                error={errors.size !== null}
                            >
                                <MenuItem value={"grande"}>Grande</MenuItem>
                                <MenuItem value={"mediano"}>Mediano</MenuItem>
                                <MenuItem value={"pequeño"}>Pequeño</MenuItem>

                            </Select>

                        </FormControl>
                        {errors.size && <FormHelperText error={true}>{errors.size}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={12} padding={1}>
                        <TextField label="Descripción"
                            onBlur={(event) => {
                                setValues({ ...values, characteristics: event.target.value });
                                setErrors({ ...errors, characteristics: null })
                            }}
                            inputProps={{ maxLength: 300 }}
                            fullWidth multiline={true} minRows={4} variant="filled" />

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
                            label="Sitio de rescate"
                            variant="standard"
                            onBlur={(event) => {
                                setValues({ ...values, rescueSite: event.target.value });
                            }}
                            inputProps={{ maxLength: 190 }}
                        />

                    </Grid>


                    <Grid item xs={12} md={6}
                        justifyContent="flex-start"
                        flexDirection="column"
                        display="flex"
                        padding={1}
                    >
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Fecha de rescate (aprox)"
                                value={values.rescueDate}
                                maxDate={new moment()}
                                onChange={(newValue) => {
                                    setValues({ ...values, rescueDate: newValue });
                                }}
                                renderInput={(params) => <TextField {...params} variant="standard" />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        alignItems="flex-start"
                        display="flex"
                        flexDirection="column"
                        padding={1}
                    >
                        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                            <FormLabel component="label" sx={{ fontSize: 14 }}>Estado</FormLabel>
                            <FormControlLabel value="esterilizado" checked={values.sterilized} onClick={() => { setValues({ ...values, ["sterilized"]: !values.sterilized }) }} control={<Checkbox />} label="Esterilizado" />
                            <FormControlLabel value="desparasitado" checked={values.dewormed} onClick={() => { setValues({ ...values, ["dewormed"]: !values.dewormed }) }} control={<Checkbox />} label="Desparasitado" />

                        </FormControl>
                    </Grid>
                    <Grid item
                        md={6}
                        xs={12}
                        justifyContent="center"
                        alignItems="flex-start"
                        display="flex"

                        padding={1}
                    >

                        <FormControl fullWidth variant="standard" sx={{ marginTop: 2 }}>
                            <InputLabel id="animal-adoption-state" >Estado de adopción</InputLabel>
                            <Select
                                labelId="animal-adoption-state"
                                id="animal-adoption-state-select"
                                value={values.animalState}
                                label="Seleccione el estado actua"
                                disabled
                                onChange={(event) => {
                                    setValues({
                                        ...values, animalState: event.target.value
                                    });
                                    setErrors({ ...errors, animalState: null });
                                }}

                            >
                                <MenuItem value={"Sin adoptar"} selected={true} >Sin adoptar</MenuItem>


                            </Select>

                        </FormControl>

                    </Grid>
                    <Grid item xs={12} md={12} padding={1}>
                        <TextField label="Vacunas" fullWidth multiline={true} minRows={4} variant="filled"
                            onBlur={(event) => {
                                setValues({ ...values, vaccine: event.target.value });
                            }}
                            inputProps={{ maxLength: 100 }}
                        />
                    </Grid>

                </Grid> */}

                <Box sx={{ justifyContent: "center", paddingBottom: 3 }} display="flex">

                    {/* <Button size="medium" variant="contained" color="success" onClick={() => {
                        console.log(loading)
                        if (!loading) {
                            onSubmit()
                        }
                    }}>Guardar registro</Button> */}
                </Box>
            </Paper >
        </Container>
    );

}

