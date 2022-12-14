import { LoginError } from "../../types/error/LoginError"
import { LoginResponse } from "../../types/response/LoginResponse"
import { LoadingDataActionType, LOADING_DATA, LoginFailureActionType, LoginSuccessActionType, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action-types/login-action-types"

export const loginSuccess = (user: Partial<LoginResponse>): LoginSuccessActionType=> ({
    type: LOGIN_SUCCESS,
    payload: user
})

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const loadingData = (): LoadingDataActionType => ({
    type: LOADING_DATA
})
