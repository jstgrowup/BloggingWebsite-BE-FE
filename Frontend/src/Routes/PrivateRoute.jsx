import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    if (!children) {
        <Navigate to={"/login"}></Navigate>
    }

    return children
}

export default PrivateRoute