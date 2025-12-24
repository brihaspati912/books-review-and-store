import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const token = localStorage.getItem("token"); ///same name as set in login
    if (!token) {
        return <Navigate to="/admin" />
    }
    return (
        <>
            {children ? children : <Outlet />}
        </>
    )
}

export default AdminRoute

///previously anyone can access admin routes, now only admin with token can access beacuse of any token in local storage
/*
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/admin" />;

    try {
        const decoded = jwt_decode(token);

        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/admin" />;
        }

        if (decoded.role !== "admin") return <Navigate to="/admin" />;

        return children || <Outlet />;
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/admin" />;
    }
};

export default AdminRoute;
*/