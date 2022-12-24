import { StudentCV } from "../../../types/response/StudentCV";

export const CV_LOADING_DATA = "CV_LOADING_DATA";
export const UPDATE_CV_SUCCESS = "UPDATE_CV_SUCCESS";
export const UPDATE_CV_FAILURE = "UPDATE_CV_FAILURE";
export const GET_CV_SUCCESS = "GET_CV_SUCCESS";
export const GET_CV_FAILURE = "GET_CV_FAILURE";
export const UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS";
export const UPDATE_AVATAR_FAILURE = "UPDATE_AVATAR_FAILURE";

export type CVLoadingDataActionType = {type: typeof CV_LOADING_DATA};
export type UpdateCVSuccessActionType = {type: typeof UPDATE_CV_SUCCESS, payload: string};
export type UpdateCVFailureActionType = {type: typeof UPDATE_CV_FAILURE, payload: string};
export type GetCVSuccessActionType = {type: typeof GET_CV_SUCCESS, payload: StudentCV};
export type GetCVFailureActionType = {type: typeof GET_CV_FAILURE, payload: string};
export type UpdateAvatarSuccessActionType = {type: typeof UPDATE_AVATAR_SUCCESS, payload: string};
export type UpdateAvatarFailureActionType = {type: typeof UPDATE_AVATAR_FAILURE, payload: string};

export type CVActionType = CVLoadingDataActionType
| UpdateCVSuccessActionType | UpdateCVFailureActionType
| GetCVSuccessActionType | GetCVFailureActionType
| UpdateAvatarSuccessActionType | UpdateAvatarFailureActionType;