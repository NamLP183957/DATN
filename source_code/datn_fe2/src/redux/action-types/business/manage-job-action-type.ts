import { JobCategory } from "../../../types/response/JobCategory";
import { JobResponse } from "../../../types/response/JobResponse";

export const MANAGE_JOB_LOADING_DATA = "MANAGE_JOB_LOADING_DATA";
export const GET_BUSINESS_JOBS_SUCCESS = "GET_BUSINESS_JOBS_SUCCESS";
export const GET_BUSINESS_JOBS_FAILURE = "GET_BUSINESS_JOBS_FAILURE";
export const GET_JOB_BY_CODE_SUCCESS = "GET_JOB_BY_CODE_SUCCESS";
export const GET_JOB_BY_CODE_FAILURE = "GET_JOB_BY_CODE_FAILURE";
export const UPDATE_JOB_SUCCESS = "UPDATE_JOB_SUCCESS";
export const UPDATE_JOB_FAILURE = "UPDATE_JOB_FAILURE";
export const GET_BUSINESS_JOB_CATEGORY_SUCCESS = "GET_BUSINESS_JOB_CATEGORY_SUCCESS";
export const GET_BUSINESS_JOB_CATEGORY_FAILURE = "GET_BUSINESS_JOB_CATEGORY_FAILURE";

export type ManageJobLoadingDataActionType = {type: typeof MANAGE_JOB_LOADING_DATA};
export type GetBusinessJobsSuccessActionType = {type: typeof GET_BUSINESS_JOBS_SUCCESS, payload: Array<JobResponse>};
export type GetBusinessJobsFailureActionType = {type: typeof GET_BUSINESS_JOBS_FAILURE, payload: string};
export type GetJobByCodeSuccessActionType = {type: typeof GET_JOB_BY_CODE_SUCCESS, payload: JobResponse};
export type GetJobByCodeFailureActiontype = {type: typeof GET_JOB_BY_CODE_FAILURE, payload: string};
export type UpdateJobSuccessActionType = {type: typeof UPDATE_JOB_SUCCESS, payload: string};
export type UpdateJobFailureActiontype = {type: typeof UPDATE_JOB_FAILURE, payload: string};
export type GetBusinessJobCategorySuccessActionType = {type: typeof GET_BUSINESS_JOB_CATEGORY_SUCCESS, payload: Array<JobCategory>};
export type GetBusinessJobCategoryFailureActionTyp = {type: typeof GET_BUSINESS_JOB_CATEGORY_FAILURE, payload: string};


export type ManageJobActionType = ManageJobLoadingDataActionType
| GetBusinessJobsSuccessActionType | GetBusinessJobsFailureActionType
| GetJobByCodeSuccessActionType | GetJobByCodeFailureActiontype
| UpdateJobSuccessActionType | UpdateJobFailureActiontype
| GetBusinessJobCategorySuccessActionType | GetBusinessJobCategoryFailureActionTyp;