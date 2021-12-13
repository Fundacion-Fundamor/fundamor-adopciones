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
import Detail from '../../components/adoptions/Detail';
export default function Adoption() {
    let history = useHistory();
    let { path } = useRouteMatch();

    return <div>
        <Switch>
            <Route exact path={path}>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Button size="medium" variant="contained"  color="primary" sx={{ marginTop: 5 }} onClick={() => {
                        history.push(`/adoptions/new/-1`);

                    }}>Nuevo proceso</Button>
                    <List />

                </div>
            </Route>
            <Route path={`${path}/new/:animalId`}>
                <Form />
            </Route>
            <Route path={`${path}/detail/:adoptionId`}>
                <Detail />
            </Route>
        </Switch>
    </div>
}