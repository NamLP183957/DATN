import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppStateType } from "../redux/reducers/root-reducer";
import { useSelector } from 'react-redux'
import { LoginResponse } from "../types/response/LoginResponse";
import { convertStrToArr } from "../utils/constants/role";

type PropsType = {
    allowedRoles: any
}

const RequireAuth: FC<PropsType> = ({ allowedRoles }) => {
    const location = useLocation();
    // const user: Partial<LoginResponse> = useSelector((state: AppStateType) => state.login.user);
    // const isLoggedIn: boolean = useSelector((state: AppStateType) => state.login.isLoggedIn);
    // const roles: Array<string> = convertStrToArr(user.roles == undefined ? "" : user.roles);
    const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
    const roleStr = localStorage.getItem("roles")
    const roles: Array<string> = convertStrToArr(roleStr == null ? "" : roleStr);
    
    const hasAuth = roles.some(role => allowedRoles.includes(role))
    
    return (
        isLoggedIn ? 
        ( hasAuth ? 
        <Outlet /> 
        : <Navigate to="/unauthorized" state={{ from: location }} replace />)
        : <Navigate to="/login" state={{ from: location }} replace />
        
    )
};

export default RequireAuth;
