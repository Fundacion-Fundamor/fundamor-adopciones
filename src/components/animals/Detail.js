import React, { useContext, useEffect } from 'react'

import {
    useParams,
    useHistory
} from "react-router-dom";
import AnimalContext from '../../context/animal/animalContext';
import {
    Button,

} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Detail() {
    const { selectedAnimal, message, loading, getAnimal, removeAnimal, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales


    let { animalId } = useParams();
    const MySwal = withReactContent(Swal);
    let history = useHistory();


    const onRemoveAnimal = async () => {


        MySwal.fire({
            title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
            text: "¿Está seguro que desea eliminar el animal?",
            icon: "question",
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            backdrop: true,
            preConfirm: async (response) => {

                await removeAnimal(animalId);
                return true;
            },

            allowOutsideClick: () => !MySwal.isLoading()
        })
        // let res = await MySwal.fire({
        //     title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{"Confirmación"}</p>,
        //     text: "¿Está seguro que desea eliminar el animal?",
        //     icon: "question",
        //     confirmButtonText: 'Aceptar',
        //     showCancelButton: true,

        // });


        // if (res.isConfirmed) {
        //     // MySwal.close();
        //     await removeAnimal(animalId);
        // }

    }

    useEffect(() => {
        getAnimal(animalId);
    }, []);

    useEffect(() => {

        const displayAlert = async () => {
            let res = await MySwal.fire({
                title: <p style={{ fontSize: 22, fontWeight: "bold" }}>{message.text}</p>,
                allowOutsideClick: false,
                icon: message.category,
                backdrop: true,
            });


            if (res.isConfirmed) {

                await handleAnimalMessage(null);
                if (message.category === "success") {
                    history.push("/gallery");
                }
            }
        }
        if (message && message.showIn === "detail" && !loading) {

            displayAlert();
        }

    }, [message, loading]);


    return (

        <div>
            <h1>SUPER VISTA DE PERFIL DE MASCOTA PARA EMPLEADO O PARA EL PUBLICO</h1>

            <p>datos del animal</p>
            {loading ? <p>cargando..</p> :
                <p>{JSON.stringify(selectedAnimal)}</p>
            }

            <Button size="medium" variant="contained" color="success" onClick={() => {
                history.push(`/animals/edit/${animalId}`);

            }}>Editar</Button>
            {/*Validar que solo se pueda iniciar un proceso si no se está en alguno actualmente */}
            <Button size="medium" variant="contained" color="primary" onClick={() => {
                history.push(`/adoptions/new/${animalId}`);

            }}>Nuevo proceso de adopción</Button>
            <Button size="medium" variant="contained" color="error" onClick={() => onRemoveAnimal()}>Eliminar</Button>

        </div>
    );
}