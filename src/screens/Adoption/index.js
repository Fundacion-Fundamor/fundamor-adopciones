import React from 'react'
import { useRouteMatch, Switch, Route } from "react-router-dom";
import List from '../../components/adoptions/List';
import Form from '../../components/adoptions/Form';
import Detail from '../../components/adoptions/Detail';

export default function Adoption() {

    let { path } = useRouteMatch();

    return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
        <Switch>
            <Route exact path={path}>
                    {/* <Button size="medium" variant="contained"  color="primary" sx={{ marginTop: 5 }} onClick={() => {
                        history.push(`/adoptions/new/-1`);

                    }}>Nuevo proceso</Button> */}
                    <List />
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