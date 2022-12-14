import { SignupFailureActioNType, SignupSuccessActioNType, SIGNUP_FAILURE, SIGNUP_LOADING_DATA, SingupLoadingDataActionType, SINGUP_SUCCESS } from "../action-types/singup-action-types";

export const signupLoadingData = (): SingupLoadingDataActionType => ({
    type: SIGNUP_LOADING_DATA
})

export const signupSuceess = (message: string): SignupSuccessActioNType => ({
    type: SINGUP_SUCCESS,
    payload: message
})

export const signupFailure = (message: string): SignupFailureActioNType => ({
    type: SIGNUP_FAILURE,
    payload: message
})