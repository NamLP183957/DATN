import { Dispatch } from "redux";
import { SignupRequest } from "../../types/request/SignupRequest";
import { SERVICE_RESULT_STATUS } from "../../utils/constants/status";
import requestService from "../../utils/request-service";
import { signupFailure, signupLoadingData, signupSuceess } from "../actions/signup-action";

export const signup = (user: SignupRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(signupLoadingData());
        const response = await requestService.post("/signup", user);
        if (response.data.status == SERVICE_RESULT_STATUS.SUCCESS_RESULT) {
            dispatch(signupSuceess(response.data.message));
        } else {
            dispatch(signupFailure(response.data.message));
        }
    } catch (error: any) {
        dispatch(signupFailure(error.reponse.data));
    }
}