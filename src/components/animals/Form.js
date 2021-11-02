import { Paper, Container, Button, Grid, Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
const steps = [
    'Características',
    'Vacunas',
];

export default function Form() {

    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        if (activeStep !== 2) {
            setActiveStep(activeStep + 1);
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
                        justifyContent="space-between"
                        flexDirection="column"
                        display="flex"
                        padding={3}
                    >
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Fecha de nacimiento (aproximada)"
                                // value={value}
                                // onChange={(newValue) => {
                                //     setValue(newValue);
                                // }}
                                renderInput={(params) => <TextField {...params} variant="standard" />}
                            />
                        </LocalizationProvider>
                        <TextField disabled label="Edad calculada" value="10 meses" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={12} padding={3}>
                        <TextField label="Descripción" fullWidth multiline={true} minRows={8} variant="filled" />

                    </Grid>
                    {/* <Grid item xs={6} md={8}>
                        <p>hola</p>

                    </Grid> */}
                </Grid> : null}


                <Box sx={{ justifyContent: "center", paddingBottom: 3 }} display="flex">
                    <Button size="small" variant="contained" color="warning" onClick={() => nextStep()}>Siguiente</Button>
                </Box>
            </Paper >
        </Container>
    );

}