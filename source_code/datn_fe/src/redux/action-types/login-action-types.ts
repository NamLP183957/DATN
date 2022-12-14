import { LoginError } from "../../types/error/LoginError";
import { LoginResponse } from "../../types/response/LoginResponse";

export const LOADING_DATA = "LOADING_DATA";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export type LoadingDataActionType = {type: typeof LOADING_DATA}
export type LoginSuccessActionType = {type: typeof LOGIN_SUCCESS, payload: Partial<LoginResponse>};
export type LoginFailureActionType = {type: typeof LOGIN_FAILURE, payload: Partial<LoginError>};

export type LoginActionType = LoginSuccessActionType | LoginFailureActionType
| LoadingDataActionType;