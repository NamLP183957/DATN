export const SIGNUP_LOADING_DATA = "SIGNUP_LOADING_DATA";
export const SINGUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export type SingupLoadingDataActionType = {type: typeof SIGNUP_LOADING_DATA};
export type SignupSuccessActioNType = {type: typeof SINGUP_SUCCESS, payload: string};
export type SignupFailureActioNType = {type: typeof SIGNUP_FAILURE, payload: string};

export type SignupActionType = SingupLoadingDataActionType | 
SignupSuccessActioNType | SignupFailureActioNType;