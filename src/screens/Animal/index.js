import React from 'react'
import Form from '../../components/animals/Form'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import FormEdit from '../../components/animals/FormEdit';
import List from '../../components/animals/List';
export default function Animal() {

    let { path } = useRouteMatch();
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Switch>
            <Route exact path={path}>
                <List />
            </Route>
            <Route  path={`${path}/new`}>
                <Form />
            </Route>
            <Route path={`${path}/edit/:animalId`}>
                <FormEdit />
            </Route>
        </Switch>
    </div>
}