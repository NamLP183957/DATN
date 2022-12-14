import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppStateType } from "../redux/reducers/root-reducer";
import { useSelector } from 'react-redux'
import { LoginResponse } from "../types/response/LoginResponse";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const user: Partial<LoginResponse> = useSelector((state: AppStateType) => state.login.user)
    const isLoggedIn: boolean = useSelector((state: AppStateType) => state.login.isLoggedIn);
    
    const hasAuth = user.roles?.some(role => allowedRoles.includes(role));

    return (
        isLoggedIn ? 
        ( hasAuth ? 
        <Outlet /> 
        : <Navigate to="/unauthorized" state={{ from: location }} replace />) 
        : <Navigate to="/login" state={{ from: location }} replace />
        
    )
};

export default RequireAuth;
