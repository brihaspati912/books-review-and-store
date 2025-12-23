import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (currentUser) {
        return children;
    }
    return <Navigate to="/login" replace />

}////6:33

export default PrivateRoute