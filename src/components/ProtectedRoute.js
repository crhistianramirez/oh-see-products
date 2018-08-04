import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { OrderCloudSDK } from '../config/ordercloud';
import * as jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
    const token = OrderCloudSDK.GetToken();
    if (!token) { return false; }

    const decodedToken = jwtDecode(token);
    const expiresIn = decodedToken.exp * 1000;
    return (Date.now() < expiresIn);
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
export default ProtectedRoute;