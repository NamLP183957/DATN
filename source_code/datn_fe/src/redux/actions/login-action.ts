import { LoadingDataActionType, LOADING_DATA, LoginFailureActionType, LoginSuccessActionType, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action-types/login-action-types"

export const loginSuccess = (roles: string ): LoginSuccessActionType=> ({
    type: LOGIN_SUCCESS,
    payload: roles
})

export const loginFailure = (error: string): LoginFailureActionType => ({
    type: LOGIN_FAILURE,
    payload: error
})

export const loadingData = (): LoadingDataActionType => ({
    type: LOADING_DATA
})
