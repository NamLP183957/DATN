import { redirect } from "react-router-dom";
import { Dispatch } from "redux";
import { LoginRequest } from "../../types/request/LoginRequest";
import { LoginResponse } from "../../types/response/LoginResponse";
import { convertStrToArr, ROLES } from "../../utils/constants/role";
import { SERVICE_RESULT_STATUS } from "../../utils/constants/status";
import requestService from "../../utils/request-service";
import { loadingData, loginFailure, loginSuccess } from "../actions/login-action";

export const login = (user: LoginRequest, navigate: any) =>async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData())
        const response = await requestService.post("/login", user);
        if (response.data.status == SERVICE_RESULT_STATUS.SUCCESS_RESULT) {
            dispatch(loginSuccess(response.data.content));
            saveUserToLocalStorage(response.data.content);
            const roleStr = response.data.content.roles;
            const roles = convertStrToArr(roleStr);
            if (roles.includes(ROLES.ADMIN)) {
                navigate("/admin/home");
            } else if (roles.includes(ROLES.BUSINESS)) {
                navigate("/business/home");
            } else if (roles.includes(ROLES.STUDENT)) {
                navigate("/student/home");
            }
        } else {
            dispatch(loginFailure(response.data.message));
        }
    } catch (error: any) {
        dispatch(loginFailure(error.response.data))
    }
}

const saveUserToLocalStorage = (user: LoginResponse) => {
    localStorage.setItem("email", user.email);
    localStorage.setItem("roles", user.roles);
    localStorage.setItem("token", user.token);
    localStorage.setItem("isLoggedIn", "true");
}