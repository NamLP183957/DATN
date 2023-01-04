import { Dispatch } from "redux";
import { StudentCVRequest } from "../../../types/request/StudentCVRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { cVLoadingData, getCVFailure, getCVSuccess, getCVWarn, updateAvatarFailure, updateAvatarSuccess, updateCVFailure, updateCVSuccess } from "../../actions/student/cv-action";

export const updateCV = (studentCvRequest: StudentCVRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(cVLoadingData());
        const response = await requestService.post("/student/cv", studentCvRequest, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(updateCVSuccess(response.data.message));
        } else {
            dispatch(updateCVFailure(response.data.message));
        }
    } catch (error: any) {
        console.log(error);
        dispatch(updateCVFailure(Constants.SYSTEM_ERROR));
    }
}

export const getCV = () => async (dispatch: Dispatch) => {
    try {
        dispatch(cVLoadingData());
        const response = await requestService.get("/student/cv", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getCVSuccess(response.data.content));
        } else if (response.data.status == ServiceStatus.WARN_MESSAGE) {
            dispatch(getCVWarn(response.data.message));
        } else {
            dispatch(getCVFailure(response.data.message));
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getCVFailure(Constants.SYSTEM_ERROR));
    }
}

export const updateAvatar = (imageFile: FormData) =>async (dispatch: Dispatch) => {
    try {
        dispatch(cVLoadingData());
        const response = await requestService.post("/student/cv/avatar", imageFile, true, "multipart/form-data");
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(updateAvatarSuccess(response.data.content));
        } else {
            dispatch(updateAvatarFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(updateAvatarFailure(Constants.SYSTEM_ERROR));
    }
}