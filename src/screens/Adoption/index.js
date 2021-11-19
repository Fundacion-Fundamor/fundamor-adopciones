import React from 'react'

import { useRouteMatch, Switch, Route } from "react-router-dom";
import {

    useHistory
} from "react-router-dom";
import {
    Button,

} from '@mui/material';
import List from '../../components/adoptions/List';
import Form from '../../components/adoptions/Form';
export default function Adoption() {
    let history = useHistory();
    let { path } = useRouteMatch();

    return <div>
        <Switch>
            <Route exact path={path}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Button size="medium" variant="contained" color="success" sx={{ marginTop: 5 }} onClick={() => {
                        history.push(`/adoptions/new/-1`);

                    }}>Nuevo proceso</Button>
                    <List />

                </div>
            </Route>
            <Route path={`${path}/new/:animalId`}>
                <Form />
            </Route>
        </Switch>
    </div>
}