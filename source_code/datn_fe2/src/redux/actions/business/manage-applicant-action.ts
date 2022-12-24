import { ApplicantResponse } from "../../../types/response/ApplicantResponse";
import { ApproveApplicantFailureActionType, ApproveApplicantSuccessActionType, APPROVE_APPLICANT_FAILURE, APPROVE_APPLICANT_SUCCESS, GetApplicantsFailureActiontype, GetApplicantSuccessActionType, GET_APPLICANTS_FAILURE, GET_APPLICANTS_SUCCESS, ManageApplicantLoadingDataActionType, MANAGE_APPLICANT_LOADING_DATA, RejectApplicantFailureActionType, RejectApplicantSuccessActionType, REJECT_APPLICANT_FAILURE, REJECT_APPLICANT_SUCCESS } from "../../action-types/business/manage-applicant-action-types";

export const manageApplicantLoadingData = (): ManageApplicantLoadingDataActionType => ({
    type: MANAGE_APPLICANT_LOADING_DATA
})

export const getApplicantsSuccess = (lstApplicant: Array<ApplicantResponse>): GetApplicantSuccessActionType => ({
    type: GET_APPLICANTS_SUCCESS,
    payload: lstApplicant
})

export const getApplicantsFailure = (errMsg: string): GetApplicantsFailureActiontype => ({
    type: GET_APPLICANTS_FAILURE,
    payload: errMsg
})

export const approveApplicantSuccess = (sucMsg: string): ApproveApplicantSuccessActionType => ({
    type: APPROVE_APPLICANT_SUCCESS,
    payload: sucMsg
})

export const approveApplicantFailure = (errMsg: string): ApproveApplicantFailureActionType => ({
    type: APPROVE_APPLICANT_FAILURE,
    payload: errMsg
})

export const rejectApplicantSuccess = (sucMsg: string): RejectApplicantSuccessActionType => ({
    type: REJECT_APPLICANT_SUCCESS,
    payload: sucMsg
})

export const rejectApplicantFailure = (errMsg: string): RejectApplicantFailureActionType => ({
    type: REJECT_APPLICANT_FAILURE,
    payload: errMsg
})