import { Dispatch } from "redux";
import { PYCRequest } from "../../../types/request/PYCRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { approveApplicantFailure, getApplicantsFailure, getApplicantsSuccess, manageApplicantLoadingData, rejectApplicantFailure, rejectApplicantSuccess } from "../../actions/business/manage-applicant-action";

export const getApplicants = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageApplicantLoadingData());
        const response = await requestService.get("/business/manageApplicant", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getApplicantsSuccess(response.data.content))
        } else {
            dispatch(getApplicantsFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getApplicantsFailure(Constants.SYSTEM_ERROR));
    }
}

export const approveApplicant = (request: PYCRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageApplicantLoadingData());
        const response = await requestService.post("/business/manageApplicant", request, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(approveApplicantFailure(response.data.message))
        } else {
            dispatch(approveApplicantFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(approveApplicantFailure(Constants.SYSTEM_ERROR))
    }
}

export const rejectApplicant = (request: PYCRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageApplicantLoadingData());
        const response = await requestService.post("/business/manageApplicant", request, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(rejectApplicantSuccess(response.data.message))
        } else {
            dispatch(rejectApplicantFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(rejectApplicantFailure(Constants.SYSTEM_ERROR))
    }
}