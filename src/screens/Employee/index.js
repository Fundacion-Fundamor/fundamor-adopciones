import React, { useState, useEffect, useContext } from 'react'
import List from '../../components/employees/List';
import './employee.scss'

import Form from '../../components/employees/Form';
import { Backdrop, Button, Snackbar, Modal, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import EmployeeContext from '../../context/employee/employeeContext';



export default function Employeee() {
    const { selectedEmployee, message, selectEmployee, handleEmployeeMessage } = useContext(EmployeeContext);

    const [errors, setErrors] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm(!showForm);
    }

    useEffect(() => {

        if (!showForm) {

            selectEmployee(null);
            handleEmployeeMessage(null);
        }

    }, [showForm]);

    useEffect(() => {

        if (selectedEmployee) {
            setShowForm(!showForm);
        }
    }, [selectedEmployee]);


    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
            <Snackbar sx={{
                color: 'success.main',
            }} open={errors != null} autoHideDuration={6000} onClose={() => { console.log("%%%%") }} message={errors}>
                {/* <Alert severity="success" sx={{ width: '100%' }}>
                    {errors}
                </Alert> */}

            </Snackbar>


            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url("https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_960_720.jpg"`,
                    backgroundSize:"cover",
                    backgroundColor:"#fff"
                }}
            >


                <div style={{ display: "flex", flexDirection: "column", padding: 33, alignItems: "center" }}>

                    <h1>Gestiona el acceso a la plataforma de adopción</h1>
                    <Button style={{ marginTop: 40, maxWidth: 220 }} color="error" onClick={handleToggle} variant="contained" >Agregar colaborador</Button>
                </div>
                <div style={{ width: "100%" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L48,48C96,64,192,96,288,112C384,128,480,128,576,117.3C672,107,768,85,864,69.3C960,53,1056,43,1152,53.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#c43256" fill-opacity="1" d="M0,192L120,186.7C240,181,480,171,720,181.3C960,192,1200,224,1320,240L1440,256L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#c43256" fill-opacity="1" d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg> */}
                </div>
             
              
            </div>







            {message && message.showIn === "list" && <Alert severity={message.category} variant="filled" style={{ marginTop: 20, marginBottom: 5 }} >{message.text}</Alert>}

            <Modal
                open={showForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ overflowY: "scroll" }}

            >
                <Box sx={{ display: "flex", justifyContent: "center" }}  >
                    {showForm && <Form handleToggle={handleToggle} />}

                </Box>
            </Modal>

            <div>
                <List />
            </div>
        </div >);
}