/* eslint-disable react-hooks/exhaustive-deps */
import {
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
    Card,
    CardActions,
    Tooltip,
    Typography,
    useTheme,
    useMediaQuery,
    Stack,
    Divider
} from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
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
import { BiHelpCircle, BiTrashAlt } from 'react-icons/bi';
import moment from 'moment';
import 'moment/locale/es';
import AnimalContext from '../../context/animal/animalContext';
import { useHistory, useParams } from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { grey } from '@mui/material/colors';
import { AiOutlineInfoCircle, AiOutlineSave } from 'react-icons/ai';
import LoadingButton from '@mui/lab/LoadingButton';



/**Formulario de edición de  registro para animales
 * 
 * Solo los campos requeridos en la bd son validados
 * @returns 
 */
export default function FormEdit() {
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


    //layout y theming
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const MySwal = withReactContent(Swal);
    const { editAnimal, getAnimal, selectedAnimal, message, loading, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales
    let { animalId } = useParams();
    const [images, setImages] = React.useState([]);
    const [imagesRemove, setImagesRemove] = useState([]);
    const [values, setValues] = useState({
        animalID: "",
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

            let tmp = []; //imágenes nuevas

            images.forEach(element => {
                if (element.ruta === undefined) {
                    tmp.push(element);
                }
            })
            editAnimal(values, tmp, imagesRemove);
        }
    }

    useEffect(() => {

        getAnimal(animalId);

    }, []);

    useEffect(() => {

        if (selectedAnimal) {
            setValues(
                {
                    animalID: selectedAnimal.id_animal,
                    name: selectedAnimal.nombre,
                    specie: selectedAnimal.especie,
                    birthday: selectedAnimal.fecha_nacimiento,
                    characteristics: selectedAnimal.caracteristicas !== null ? selectedAnimal.caracteristicas : "",
                    rescueSite: selectedAnimal.sitio_rescate !== null ? selectedAnimal.sitio_rescate : "",
                    rescueDate: selectedAnimal.fecha_rescate,
                    color: selectedAnimal.color,
                    vaccine: selectedAnimal.vacunas !== null ? selectedAnimal.vacunas : "",
                    sterilized: selectedAnimal.esterilizado,
                    dewormed: selectedAnimal.desparasitado,
                    size: selectedAnimal.tamanio,
                    animalState: selectedAnimal.estado,
                    gender: selectedAnimal.sexo,
                    images: selectedAnimal.animalImage
                }
            );
            setImages(selectedAnimal.animalImage);
        }
    }, [selectedAnimal])

    useEffect(() => {
        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold", lineHeight:1.2  }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,

            });


            if (res.isConfirmed) {

                await handleAnimalMessage(null);

                if (message.category === "success") {
                    history.push("/animals");
                }
            }
        }
        if (message && message.showIn === "form") {

            displayAlert();
        }

    }, [message]);


    return (
        <Box>
            <Card variant="outlined" sx={{ padding: 1, borderRadius: theme.custom.borderRadius, mb: 2, }} >
                <CardActions sx={{ justifyContent: "flex-start", flexDirection: "row" }}>

                    <Tooltip title="Actualiza los datos del animal seleccionado">
                        <IconButton>
                            <BiHelpCircle />
                        </IconButton>

                    </Tooltip>
                    <Typography variant="t2"  >
                        Edición de registro
                    </Typography>
                </CardActions>
            </Card>

            <Card variant="outlined" sx={{
                padding: 1, borderRadius: theme.custom.borderRadius, mb: 2,

                "& .MuiTypography-root": {
                    // fontWeight: 00
                }

            }} >

                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    maxFileSize={5000000}
                    acceptType={['jpg', 'png', 'jpeg']}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                    }) => (
                        // write your building UI
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#ededed", padding: 12, borderRadius: 12, margin: 22 }}>
                            {imageList.length > 0 ? null : <h4>No cuenta con imágenes </h4>}
                            <Button onClick={onImageUpload} size="small" sx={{ marginTop: 2 }} variant="contained" color={isDragging ? "info" : "primary"}>Seleccionar imágenes</Button>

                            <Chip sx={{ marginTop: 2 }} label={imageList.length + "/8"} />
                            {errors && <div>
                                {errors.maxNumber && <span>Solo puede adjuntar un máximo de {maxNumber} imágenes por animal</span>}
                                {errors.acceptType && <span>Este tipo de archivo no está soportado</span>}
                                {errors.maxFileSize && <span>Cada imágen debe pesar máximo 5Mb</span>}

                            </div>}
                            <div style={{ marginTop: imageList.length > 0 ? 15 : 0, display: "flex" }}>

                                <ImageList sx={{ width: "100%" }} cols={matchDownSm ? 1 : imageList.length > 4 ? 4 : imageList.length}>
                                    {imageList.map((image, index) => (
                                        <ImageListItem key={index}>
                                            {image['data_url'] !== undefined ? <img
                                                src={image['data_url']}
                                                alt="imagen del animal"
                                                loading="lazy"
                                                style={{ maxWidth: 200, borderRadius: 8, minHeight: 160, objectFit: "cover" }}

                                            /> :
                                                <img
                                                    style={{ maxWidth: 200, borderRadius: 8, minHeight: 160, objectFit: "cover" }}

                                                    src={`${process.env.REACT_APP_API_URL}/${image.ruta}`}
                                                    alt="imagen del animal"
                                                    loading="lazy" />

                                            }
                                            <ImageListItemBar
                                                subtitle={index === 0 ? "Principal" : "Secundaria"}
                                                sx={{ backgroundColor: index === 0 ? theme.custom.primary.dark : "rgba(0, 0, 0, 0.5)", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about this`}
                                                        onClick={() => {
                                                            if (imageList[index].ruta !== undefined) {
                                                                setImagesRemove([...imagesRemove, imageList[index]]);
                                                            }
                                                            onImageRemove(index)
                                                        }}
                                                    >
                                                        <BiTrashAlt />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                            <Stack flexDirection={"row"} alignItems={"center"} display={"flex"}>
                                <AiOutlineInfoCircle color='#1976d2' size={24} />
                                <Typography sx={{ fontSize: 12, ml: 1, color: "#1976d2" }} variant="subtitle2">La imagen principal del animal corresponderá a la primera que sea seleccionada </Typography>

                            </Stack>
                        </div>
                    )}
                </ImageUploading>
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
                            error={errors.name !== null}
                            inputProps={{ maxLength: 45}}
                            label={"Nombre"}
                            defaultValue={selectedAnimal.nombre}
                            helperText={errors.name}
                            variant="outlined"
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px", } }}
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

                                renderInput={(params) => <TextField {...params}

                                    variant="outlined"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                                    helperText={errors.birthday} error={errors.birthday !== null} />}
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
                        <TextField
                            label="Color"
                            variant="outlined"
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                            helperText={errors.color}
                            value={values.color}
                            onChange={(event) => { setValues({ ...values, color: event.target.value }) }}

                            inputProps={{ maxLength: 45, }}
                            error={errors.color !== null}
                        />


                    </Grid>

                    <Grid item xs={12} md={6}
                        justifyContent="flex-start"
                        flexDirection="column"
                        display="flex"
                        padding={1}
                    >
                        <FormControl component="fieldset" sx={{ marginTop: 2 }} error={errors.gender !== null} onBlur={(event) => {

                            if (event.target.value !== "") {
                                setErrors({ ...errors, gender: null });
                            }

                        }}>
                            <FormLabel component="label" sx={{ fontSize: 14 }}>Sexo</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={values.gender}
                                onChange={(event) => {
                                    setValues({ ...values, gender: event.target.value });

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
                        <FormControl fullWidth variant="outlined" error={errors.size !== null}

                            sx={{
                                mt: 2

                            }}
                        >
                            <InputLabel id="animal-size"
                                sx={{
                                    background: "white",
                                    paddingX: "4px",
                                }}


                            >Tamaño</InputLabel>
                            <Select
                                variant='outlined'
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
                            defaultValue={values.characteristics}

                            onBlur={(event) => {
                                setValues({ ...values, characteristics: event.target.value });
                                setErrors({ ...errors, characteristics: null })
                            }}
                            inputProps={{ maxLength: 300 }}
                            fullWidth multiline={true} minRows={4}
                            sx={{ background: "#fafafa", }}
                            variant="outlined"
                            InputLabelProps={{ style: { background: "#fafafa", paddingLeft: "5px", paddingRight: "5px" } }}
                        />
                        <FormHelperText >Máximo 300 caracteres</FormHelperText>
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
                            variant="outlined"
                            InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }}
                            value={values.rescueSite}
                            onChange={(event) => { setValues({ ...values, rescueSite: event.target.value }) }}

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
                                renderInput={(params) => <TextField {...params} variant="outlined"
                                    InputLabelProps={{ style: { background: "white", paddingLeft: "5px", paddingRight: "5px" } }} />}


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
                            <FormControlLabel value="esterilizado" checked={values.sterilized} onClick={() => { setValues({ ...values, sterilized: !values.sterilized }) }} control={<Checkbox />} label="Esterilizado" />
                            <FormControlLabel value="desparasitado" checked={values.dewormed} onClick={() => { setValues({ ...values, dewormed: !values.dewormed }) }} control={<Checkbox />} label="Desparasitado" />

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

                        <Tooltip title="El estado del animal no se puede cambiar manualmente ya que debe depender unicamente del proceso de adopción, ademas un cambio manual puede afectar la consistencia de los datos estadisticos">
                            <FormControl fullWidth variant="outlined" sx={{
                                mt: 2
                            }}>
                                <InputLabel id="animal-adoption-state"
                                    sx={{
                                        background: "white",
                                        paddingX: "4px",
                                    }}

                                >Estado de adopción</InputLabel>
                                <Select
                                    variant='outlined'
                                    labelId="animal-adoption-state"
                                    id="animal-adoption-state-select"
                                    value={values.animalState}
                                    label="Seleccione el estado actual"
                                    disabled
                                    onChange={(event) => {
                                        setValues({
                                            ...values, animalState: event.target.value
                                        });
                                        setErrors({ ...errors, animalState: null });
                                    }}

                                >
                                    <MenuItem value={"Sin adoptar"} >Sin adoptar</MenuItem>
                                    <MenuItem value={"Adoptado"} >Adoptado</MenuItem>
                                    <MenuItem value={"En proceso"} >En proceso</MenuItem>

                                </Select>

                            </FormControl>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={12} md={12} padding={1}>
                        <TextField label="Vacunas" fullWidth multiline={true} minRows={4}
                            variant="outlined"
                            sx={{ backgroundColor: "#fafafa" }}

                            InputLabelProps={{ style: { background: "#fafafa", paddingLeft: "5px", paddingRight: "5px" } }}
                            defaultValue={values.vaccine}
                            onBlur={(event) => {
                                setValues({ ...values, vaccine: event.target.value });
                            }}
                            inputProps={{ maxLength: 100 }}
                        />
                        <FormHelperText >Máximo 100 caracteres</FormHelperText>
                    </Grid>

                </Grid>



                <Divider sx={{ mt: 5 }} />
                <Box sx={{ justifyContent: "space-between", padding: 3, }} display="flex">

                    <Button size="medium" variant="contained" color='inherit'

                        sx={{

                            color: grey[600],
                            fontSize: 12, height: 40, px: 5, mr: 4, alignItems: "center", borderRadius: "8px", fontWeight: "bold"
                        }}
                        onClick={() => {

                            history.goBack()
                        }}>Cancelar</Button>

                    <LoadingButton loading={loading}
                        size="medium" variant="contained" color="success" sx={{ fontSize: 12, height: 40, px: 5, alignItems: "center", borderRadius: "8px", fontWeight: "bold" }}

                        onClick={() => {

                            if (!loading) {
                                onSubmit()

                            }
                        }}
                        startIcon={<AiOutlineSave size={20} />}

                    >
                        Guardar
                    </LoadingButton>
                </Box>

            </Card>
        </Box>
    );

}
