import React from 'react'
import Form from '../../components/animals/Form'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import FormEdit from '../../components/animals/FormEdit';
import Detail from '../../components/animals/Detail';
import List from '../../components/animals/List';
export default function Animal() {

    let { path } = useRouteMatch();
    console.log("la path",path)
    return <div style={{ display: "flex", justifyContent: "center",flexDirection:"column" }}>
        <Switch>
            <Route exact path={path}>
                <List />
            </Route>
            <Route exact  path={`${path}/:animalId`}>
                <Detail />
            </Route>
            <Route exact path={`${path}/new/:animalId`}>
                <Form />
            </Route>
            <Route exact  path={`${path}/edit/:animalId`}>
                <FormEdit />
            </Route>
        </Switch>
    </div>
}