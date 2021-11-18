import React from 'react'

import { useRouteMatch, Switch, Route } from "react-router-dom";
import {

    useHistory
} from "react-router-dom";
import {
    Button,

} from '@mui/material';
export default function Adoption() {
    let history = useHistory();
    let { path } = useRouteMatch();

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Switch>
            <Route exact path={path}>
                <div>
                    <p>Lista de adopciones</p>
                    <Button size="medium" variant="contained" color="success" onClick={() => {
                        history.push(`/adoptions/new/blank`);

                    }}>Nuevo proceso</Button>
                </div>
            </Route>
            <Route path={`${path}/new/:animalId`}>
                <p>Formulario para nuevo proceso</p>
            </Route>
        </Switch>
    </div>
}