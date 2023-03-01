import { ApplicantDetailResponse } from "../../../types/response/ApplicantDetailResponse";
import { ApplicantResponse } from "../../../types/response/ApplicantResponse";

export const MANAGE_APPLICANT_LOADING_DATA = "MANAGE_APPLICANT_LOADING_DATA";
export const GET_APPLICANTS_SUCCESS = "GET_APPLICANTS_SUCCESS";
export const GET_APPLICANTS_FAILURE = "GET_APPLICANTS_FAILURE";
export const APPROVE_APPLICANT_SUCCESS = "APPROVE_APPLICANT_SUCCESS";
export const APPROVE_APPLICANT_FAILURE = "APPROVE_APPLICANT_FAILURE";
export const REJECT_APPLICANT_SUCCESS = "REJECT_APPLICANT_SUCCESS";
export const REJECT_APPLICANT_FAILURE = "REJECT_APPLICANT_FAILURE";
export const GET_APPLICANT_DETAIL_SUCCESS = "GET_APPLICANT_DETAIL_SUCCESS";
export const GET_APPLICANT_DETAIL_FAILURE = "GET_APPLICANT_DETAIL_FAILURE";

export type ManageApplicantLoadingDataActionType = {type: typeof MANAGE_APPLICANT_LOADING_DATA};
export type GetApplicantSuccessActionType = {type: typeof GET_APPLICANTS_SUCCESS, payload: Array<ApplicantResponse>};
export type GetApplicantsFailureActiontype = {type: typeof GET_APPLICANTS_FAILURE, payload: string};
export type ApproveApplicantSuccessActionType = {type: typeof APPROVE_APPLICANT_SUCCESS, payload: Partial<ApplicantDetailResponse>, message: string};
export type ApproveApplicantFailureActionType = {type: typeof APPROVE_APPLICANT_FAILURE, payload: string};
export type RejectApplicantSuccessActionType = {type: typeof REJECT_APPLICANT_SUCCESS, payload: Partial<ApplicantDetailResponse>, message: string};
export type RejectApplicantFailureActionType = {type: typeof REJECT_APPLICANT_FAILURE, payload: string};
export type GetApplicantDetailSuccessActionType = {type: typeof GET_APPLICANT_DETAIL_SUCCESS, payload: Partial<ApplicantDetailResponse>};
export type GetApplicantDetailFailureActionType = {type: typeof GET_APPLICANT_DETAIL_FAILURE, payload: string};

export type ManageApplicantActionType = ManageApplicantLoadingDataActionType
| GetApplicantSuccessActionType | GetApplicantsFailureActiontype
| ApproveApplicantSuccessActionType | ApproveApplicantFailureActionType
| RejectApplicantSuccessActionType | RejectApplicantFailureActionType
| GetApplicantDetailSuccessActionType | GetApplicantDetailFailureActionType
;