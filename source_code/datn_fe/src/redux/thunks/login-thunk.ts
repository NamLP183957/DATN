import { Dispatch } from "redux";
import { LoginRequest } from "../../types/request/LoginRequest";
import requestService from "../../utils/request-service";
import { loadingData, loginFailure, loginSuccess } from "../actions/login-action";

export const login = (user: LoginRequest, location: any) =>async (dispatch: Dispatch) => {
    try {
        dispatch(loadingData())
        const response = await requestService.post("/login", user);
        
        // Save response to local storage
        
        dispatch(loginSuccess(response.data.roles));
        
    } catch (error) {
        dispatch(loginFailure(error.response.data))
    }
}