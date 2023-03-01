import { ApplicantDetailResponse } from "../../../types/response/ApplicantDetailResponse";
import { ApplicantResponse } from "../../../types/response/ApplicantResponse";
import { ApproveApplicantFailureActionType, ApproveApplicantSuccessActionType, APPROVE_APPLICANT_FAILURE, APPROVE_APPLICANT_SUCCESS, GetApplicantDetailFailureActionType, GetApplicantDetailSuccessActionType, GetApplicantsFailureActiontype, GetApplicantSuccessActionType, GET_APPLICANTS_FAILURE, GET_APPLICANTS_SUCCESS, GET_APPLICANT_DETAIL_FAILURE, GET_APPLICANT_DETAIL_SUCCESS, ManageApplicantLoadingDataActionType, MANAGE_APPLICANT_LOADING_DATA, RejectApplicantFailureActionType, RejectApplicantSuccessActionType, REJECT_APPLICANT_FAILURE, REJECT_APPLICANT_SUCCESS } from "../../action-types/business/manage-applicant-action-types";

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

export const approveApplicantSuccess = (applicant: Partial<ApplicantDetailResponse>, message: string): ApproveApplicantSuccessActionType => ({
    type: APPROVE_APPLICANT_SUCCESS,
    payload: applicant,
    message: message
})

export const approveApplicantFailure = (errMsg: string): ApproveApplicantFailureActionType => ({
    type: APPROVE_APPLICANT_FAILURE,
    payload: errMsg
})

export const rejectApplicantSuccess = (applicant: Partial<ApplicantDetailResponse>, message: string): RejectApplicantSuccessActionType => ({
    type: REJECT_APPLICANT_SUCCESS,
    payload: applicant,
    message: message
})

export const rejectApplicantFailure = (errMsg: string): RejectApplicantFailureActionType => ({
    type: REJECT_APPLICANT_FAILURE,
    payload: errMsg
})

export const getApplicantDetailSuccees = (applicantDetail: Partial<ApplicantDetailResponse>): GetApplicantDetailSuccessActionType => ({
    type: GET_APPLICANT_DETAIL_SUCCESS,
    payload: applicantDetail
})

export const getApplicantDetailFailure = (errMsg: string): GetApplicantDetailFailureActionType => ({
    type: GET_APPLICANT_DETAIL_FAILURE,
    payload: errMsg
})