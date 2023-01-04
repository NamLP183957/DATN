import { StudentCV } from "../../../types/response/StudentCV";
import { CVLoadingDataActionType, CV_LOADING_DATA, GetCVFailureActionType, GetCVSuccessActionType, GetCVWarnActionType, GET_CV_FAILURE, GET_CV_SUCCESS, GET_CV_WARN, UpdateAvatarFailureActionType, UpdateAvatarSuccessActionType, UpdateCVFailureActionType, UpdateCVSuccessActionType, UPDATE_AVATAR_FAILURE, UPDATE_AVATAR_SUCCESS, UPDATE_CV_FAILURE, UPDATE_CV_SUCCESS } from "../../action-types/student/cv-action-types";

export const cVLoadingData = (): CVLoadingDataActionType => ({
    type: CV_LOADING_DATA
})

export const updateCVSuccess = (sucMsg: string): UpdateCVSuccessActionType => ({
    type: UPDATE_CV_SUCCESS,
    payload: sucMsg
}) 

export const updateCVFailure = (errMsg: string): UpdateCVFailureActionType => ({
    type: UPDATE_CV_FAILURE,
    payload: errMsg
})

export const getCVSuccess = (studentCV: StudentCV): GetCVSuccessActionType => ({
    type: GET_CV_SUCCESS,
    payload: studentCV
})

export const getCVWarn = (warnMsg: string): GetCVWarnActionType => ({
    type: GET_CV_WARN,
    payload: warnMsg
})

export const getCVFailure = (errMsg: string): GetCVFailureActionType => ({
    type: GET_CV_FAILURE,
    payload: errMsg
})

export const updateAvatarSuccess = (avatarLink: string): UpdateAvatarSuccessActionType => ({
    type: UPDATE_AVATAR_SUCCESS,
    payload: avatarLink
}) 

export const updateAvatarFailure = (errMsg: string): UpdateAvatarFailureActionType => ({
    type: UPDATE_AVATAR_FAILURE,
    payload: errMsg
})