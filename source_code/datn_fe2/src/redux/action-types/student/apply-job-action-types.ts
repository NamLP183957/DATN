import { BusinessDescriptionResponse } from "../../../types/response/BusinessDescriptionResponse";
import { JobCategory } from "../../../types/response/JobCategory";
import { JobResponse } from "../../../types/response/JobResponse";

export const APPLY_JOB_LOADING_DATA = "APPLY_JOB_LOADING_DATA";
export const GET_ALL_JOB_SUCCESS = "GET_ALL_JOB_SUCCESS";
export const GET_ALL_JOB_FAILURE = "GET_ALL_JOB_FAILURE";
export const SEARCH_JOB_SUCCESS = "SEARCH_JOB_SUCCESS";
export const SEARCH_JOB_FAILURE = "SEARCH_JOB_FAILURE";
export const GET_JOB_DETAIL_SUCCESS = "GET_JOB_DETAIL_SUCCESS";
export const GET_JOB_DETAIL_FAILURE = "GET_JOB_DETAIL_FAILURE";
export const APPLY_JOB_SUCCESS = "APPLY_JOB_SUCCESS";
export const APPLY_JOB_FAILURE = "APPLY_JOB_FAILURE";
export const GET_APPLYING_JOB_SUCCESS = "GET_APPLYING_JOB_SUCCESS";
export const GET_APPLYING_JOB_WARN = "GET_APPLYING_JOB_WARN";
export const GET_APPLYING_JOB_FAILURE = "GET_APPLYING_JOB_FAILURE";
export const GET_APPLIED_JOB_SUCCESS = "GET_APPLIED_JOB_SUCCESS";
export const GET_APPLIED_JOB_WARN = "GET_APPLIED_JOB_WARN";
export const GET_APPLIED_JOB_FAILURE = "GET_APPLIED_JOB_FAILURE";
export const GET_ALL_JOB_CATEGORY_SUCCESS = "GET_ALL_JOB_CATEGORY_SUCCESS";
export const GET_ALL_JOB_CATEGORY_FAILURE = "GET_ALL_JOB_CATEGORY_FAILURE";
export const GET_ALL_BUSINESS_SUCCESS = "GET_ALL_BUSINESS_SUCCESS";
export const GET_ALL_BUSINESS_FAILURE = "GET_ALL_BUSINESS_FAILURE";

export type ApplyJobLoadingDataActionType = {type: typeof APPLY_JOB_LOADING_DATA};
export type GetAllJobSuccessActionType = {type: typeof GET_ALL_JOB_SUCCESS, payload: Array<JobResponse>};
export type GetAllJobFailureActionType = {type: typeof GET_ALL_JOB_FAILURE, payload: string};
export type SearchJobSuccessActionType = {type: typeof SEARCH_JOB_SUCCESS, payload: Array<JobResponse>};
export type SearchJobFailureActionType = {type: typeof SEARCH_JOB_FAILURE, payload: string};
export type GetJobDetailSuccessActionType = {type: typeof GET_JOB_DETAIL_SUCCESS, payload: JobResponse};
export type GetJobDetailFailureActionType = {type: typeof GET_JOB_DETAIL_FAILURE, payload: string};
export type ApplyJobSuccessActionType = {type: typeof APPLY_JOB_SUCCESS, payload: string};
export type ApplyJobFailureActionType = {type: typeof APPLY_JOB_FAILURE, payload: string};
export type GetApplyingJobSuccessActionType = {type: typeof GET_APPLYING_JOB_SUCCESS, payload: Array<JobResponse>};
export type GetApplyingJobFailureActionType = {type: typeof GET_APPLYING_JOB_FAILURE, payload: string};
export type GetApplyingJobWarnActionType = {type: typeof GET_APPLYING_JOB_WARN, payload: string};
export type GetAppliedJobSuccessActionType = {type: typeof GET_APPLIED_JOB_SUCCESS, payload: Array<JobResponse>};
export type GetAppliedJobFailureActionType = {type: typeof GET_APPLIED_JOB_FAILURE, payload: string};
export type GetAppliedJobWarnActionType = {type: typeof GET_APPLIED_JOB_WARN, payload: string};
export type GetAllJobCategorySuccessActionType = {type: typeof GET_ALL_JOB_CATEGORY_SUCCESS, payload: Array<JobCategory>};
export type GetAllJobCategoryFailureActionType = {type: typeof GET_ALL_JOB_CATEGORY_FAILURE, payload: string}
export type GetAllBusinessSuccessActionType = {type: typeof GET_ALL_BUSINESS_SUCCESS, payload: Array<BusinessDescriptionResponse>};
export type GetAllBusinessFailureActionType = {type: typeof GET_ALL_BUSINESS_FAILURE, payload: string};

export type ApplyJobActionType = ApplyJobLoadingDataActionType 
| GetAllJobSuccessActionType | GetAllJobFailureActionType
| SearchJobSuccessActionType | SearchJobFailureActionType
| GetJobDetailSuccessActionType | GetJobDetailFailureActionType
| ApplyJobSuccessActionType | ApplyJobFailureActionType
| GetApplyingJobSuccessActionType | GetApplyingJobFailureActionType | GetApplyingJobWarnActionType
| GetAppliedJobSuccessActionType | GetAppliedJobFailureActionType | GetAppliedJobWarnActionType
| GetAllJobCategorySuccessActionType | GetAllJobCategoryFailureActionType
| GetAllBusinessSuccessActionType | GetAllBusinessFailureActionType;