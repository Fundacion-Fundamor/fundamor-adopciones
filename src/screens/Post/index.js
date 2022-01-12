import React from 'react';

import List from '../../components/Post/List'
import './post.scss'

import Form from '../../components/Post/Form'

import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Detail from '../../components/Post/Detail'


export default function Post() {
  let { path } = useRouteMatch();
  return <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
    <Switch>
      <Route exact path={path}>
        <List />
      </Route>
      {/* <Route exact path={`${path}/:postId`}>
        <Detail />
      </Route> */}
      <Route exact path={`${path}/new`}>
        <Form />
      </Route>
      {/* <Route exact path={`${path}/edit/:animalId`}>
        <FormEdit />
      </Route> */}
    </Switch>
  </div>
}
