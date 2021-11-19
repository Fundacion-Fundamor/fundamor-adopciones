
import React, { useEffect, useContext } from 'react'

import AdoptionContext from '../../context/adoption/adoptionContext';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Chip,
    Button
} from '@mui/material'
import {
    useHistory
} from "react-router-dom";

export default function List() {
    const { getAdoptions, adoptions, message, loading, removeAdoption, handleAdoptionMessage } = useContext(AdoptionContext); // contexto de adopciones


    useEffect(() => {
        getAdoptions();
    }, [])

    return (<div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: '0 5%',

    }}>
        {adoptions.map((element, index) => (
            <AdoptionItem adoption={element} key={index} />
        ))}
    </div>);
}

const AdoptionItem = ({ adoption }) => {

    let history = useHistory();
    return (<Card sx={{ minWidth: 275, margin: 5 }} variant="outline">
        <CardContent>
            <Typography variant="h5" component="div">
                {adoption.animal.nombre}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {adoption.fecha_estudio}
            </Typography>
            <Typography variant="body2">
                Adoptante: {adoption.adopter.nombre}
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
            <Chip color="primary" label={adoption.estado} />

            <Button size="small" onClick={() => {
                history.push(`/adoptions/new/-1`);

            }}>Ver más</Button>
        </CardActions>
    </Card>
    );
}