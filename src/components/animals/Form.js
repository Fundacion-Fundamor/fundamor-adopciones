import { Paper, Container, Button, Grid, Box, TextField, IconButton, Chip } from '@mui/material'
import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
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
const steps = [
    'Características',
    'Vacunas',
];


export default function Form() {

    const [activeStep, setActiveStep] = useState(0);


    const [images, setImages] = React.useState([]);
    const maxNumber = 8;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    
    const nextStep = () => {
        if (activeStep !== 2) {
            setActiveStep(activeStep + 1);
        }
    }


    const toBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    }


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
                    <h3 style={{ color: "#FFF" }}>Registro de animales</h3>
                </div>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ marginTop: 5 }}>
                    {steps.map((label) => (
                        <Step key={label} >
                            <StepLabel sx={{ color: "red" }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 ? <Grid container >
                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        // alignItems="center"
                        display="flex"
                        flexDirection="column"
                        padding={3}
                    >

                        <TextField
                            fullWidth
                            // error={errors.name}
                            label="Nombre"
                            // helperText={errors.name}
                            variant="standard"
                        // value={values.name}
                        // onChange={(event) => {
                        //     setValues({ ...values, ["name"]: event.target.value });
                        //     setErrors({ ...errors, ["name"]: null })
                        // }}
                        />
                        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                            <FormLabel component="label" sx={{ fontSize: 14 }}>Sexo</FormLabel>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value="hembra" control={<Radio />} label="Macho" />
                                <FormControlLabel value="macho" control={<Radio />} label="Hembra" />
                            </RadioGroup>
                        </FormControl>

                    </Grid>


                    <Grid item xs={12} md={6}
                        justifyContent="flex-start"
                        flexDirection="column"
                        display="flex"
                        padding={3}
                    >
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Fecha de nacimiento (aproximada)"
                                // value={value}
                                onChange={(newValue) => {
                                    console.log(newValue)
                                }}
                                renderInput={(params) => <TextField {...params} variant="standard" />}
                            />
                        </LocalizationProvider>
                        <TextField disabled sx={{ marginTop: 3 }} label="Edad calculada" value="10 meses" variant="filled" />
                    </Grid>
                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        // alignItems="center"
                        display="flex"
                        flexDirection="column"
                        padding={3}
                    >
                        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                            <FormLabel component="label" sx={{ fontSize: 14 }}>Especie</FormLabel>
                            <RadioGroup row aria-label="specie" name="row-radio-buttons-group">
                                <FormControlLabel value="perro" control={<Radio />} label="Perro" />
                                <FormControlLabel value="gato" control={<Radio />} label="Gato" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item md={6}
                        xs={12}
                        justifyContent="center"
                        // alignItems="center"
                        display="flex"
                        flexDirection="column"
                        padding={3}
                    >
                        <TextField
                            fullWidth
                            placeholder="grande, mediano o pequeño"
                            // error={errors.name}
                            label="Tamaño"
                            // helperText={errors.name}
                            variant="standard"
                        // value={values.name}
                        // onChange={(event) => {
                        //     setValues({ ...values, ["name"]: event.target.value });
                        //     setErrors({ ...errors, ["name"]: null })
                        // }}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} padding={3}>
                        <TextField label="Descripción" fullWidth multiline={true} minRows={4} variant="filled" />

                    </Grid>

                </Grid> :

                    <Grid container >
                        <Grid item md={6}
                            xs={12}
                            justifyContent="center"
                            // alignItems="center"
                            display="flex"
                            flexDirection="column"
                            padding={3}
                        >

                            <TextField
                                fullWidth
                                // error={errors.name}
                                label="Sitio de rescate"
                                // helperText={errors.name}
                                variant="standard"
                            // value={values.name}
                            // onChange={(event) => {
                            //     setValues({ ...values, ["name"]: event.target.value });
                            //     setErrors({ ...errors, ["name"]: null })
                            // }}
                            />

                        </Grid>


                        <Grid item xs={12} md={6}
                            justifyContent="flex-start"
                            flexDirection="column"
                            display="flex"
                            padding={3}
                        >
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label="Fecha de rescate (aproximada)"
                                    // value={value}
                                    onChange={(newValue) => {
                                        console.log(newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={12}
                            xs={12}
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                            flexDirection="column"
                        // padding={3}
                        >
                            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
                                <FormLabel component="label" sx={{ fontSize: 14 }}>Estado</FormLabel>
                                <RadioGroup row aria-label="state" name="row-radio-buttons-group">
                                    <FormControlLabel value="esterilizado" control={<Radio />} label="Esterilizado" />
                                    <FormControlLabel value="desparasitado" control={<Radio />} label="Desparasitado" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12} padding={3}>
                            <TextField label="Vacunas" fullWidth multiline={true} minRows={4} variant="filled" />

                        </Grid>
                    </Grid>

                }

                {activeStep === 0 &&


                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        maxFileSize={5000000}
                        acceptType={['jpg', 'png']}
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
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#ededed", padding: 5, borderRadius: 3, margin: 22 }}>




                                {imageList.length !== 0 && false ? <Button size="small" onClick={onImageRemoveAll} variant="contained" color="info">Eliminar Todo</Button> : null}

                                <Button onClick={onImageUpload} size="small" sx={{ marginTop: 2 }} variant="contained" color={isDragging ? "info" : "primary"}>Seleccionar imagenes</Button>
                                <Chip sx={{ marginTop: 2 }} label={imageList.length + "/8"} />
                                {errors && <div>
                                    {errors.maxNumber && <span>Solo puede adjuntar un máximo de {maxNumber} imagenes por animal</span>}
                                    {errors.acceptType && <span>Este tipo de archivo no está soportado</span>}
                                    {errors.maxFileSize && <span>Cada imágen debe pesar máximo 5Mb</span>}

                                </div>}
                                <div style={{ marginTop: imageList.length > 0 ? 15 : 0, display: "flex" }}>

                                    <ImageList sx={{ width: "100%", maxHeight: 250 }}>
                                        {imageList.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <img
                                                    src={image['data_url']}
                                                    // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    // alt={item.title}
                                                    loading="lazy"
                                                />
                                                <ImageListItemBar
                                                    // title={image["file"].name}
                                                    subtitle={image["file"].name}
                                                    actionIcon={
                                                        <IconButton
                                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                            aria-label={`info about this`}
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            <BiTrashAlt />
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </div>
                            </div>
                        )}
                    </ImageUploading>


                }
                <Box sx={{ justifyContent: "center", paddingBottom: 3 }} display="flex">
                    {activeStep !== 0 && <Button size="medium" variant="contained" color="info" sx={{ marginRight: 2 }} onClick={() => toBack()}>Atrás</Button>}

                    <Button size="medium" variant="contained" color="warning" onClick={() => nextStep()}>Siguiente</Button>
                </Box>
            </Paper >
        </Container>
    );

}
