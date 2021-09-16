import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'
import { MyContext } from '../context/AppContext'

export default function PrivateRoute({ component: Component, ...props }) {

    const { globalState, authenticatedUser } = useContext(MyContext);


    useEffect(() => {

        authenticatedUser();

    }, []);
    return (
        <Route {...props} render={props => !globalState.authenticated ? (
            <Redirect to="/login" />

        ) : (<Component {...props} />)} />

    );
}