import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router'

import AuthContext from '../context/auth/authContext';

export default function PrivateRoute({ component: Component, ...props }) {



    const { authenticated, authenticatedUser,loading } = useContext(AuthContext);
    useEffect(() => {

        authenticatedUser();

    }, []);
    
    return (
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to="/login" />

        ) : (<Component {...props} />)} />

    );
}