import React, { useContext, useEffect } from 'react'

import {
    useParams,
    useHistory
} from "react-router-dom";
import AnimalContext from '../../context/animal/animalContext';
import {
    Button,

} from '@mui/material'
export default function Animal() {
    const { selectedAnimal, message, loading, getAnimal, handleAnimalMessage } = useContext(AnimalContext); // contexto de animales

    let { animalId } = useParams();

    let history = useHistory();
    useEffect(() => {
        getAnimal(animalId);
    }, []);

    useEffect(() => {


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
        </div>
    );
}