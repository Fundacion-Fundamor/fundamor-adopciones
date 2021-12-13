import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'

import AuthContext from '../context/auth/authContext';

export default function PublicRoute({ component: Component, ...props }) {

    const { authenticated, authenticatedUser, loading } = useContext(AuthContext);

    // console.log(authenticated,loading)
    useEffect(() => {

        authenticatedUser();

    }, []);

    return (
        <Route {...props} render={props => authenticated && !loading ? (
            <Redirect to="/dashboard" />

        ) : (<Component {...props} />)} />

    );
}