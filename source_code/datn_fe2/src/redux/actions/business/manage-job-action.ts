import { JobCategory } from "../../../types/response/JobCategory";
import { JobResponse } from "../../../types/response/JobResponse";
import { AddJobFailureActionType, AddJobSuccessActionType, ADD_JOB_FAILURE, ADD_JOB_SUCCESS, GetAllJobCategoryFailureActionType, GetAllJobCategorySuccessActionType, GetBusinessJobCategoryFailureActionTyp, GetBusinessJobCategorySuccessActionType, GetBusinessJobsFailureActionType, GetBusinessJobsSuccessActionType, GetJobByCodeFailureActiontype, GetJobByCodeSuccessActionType, GET_ALL_JOB_CATEGORY_FAILURE, GET_ALL_JOB_CATEGORY_SUCCESS, GET_BUSINESS_JOBS_FAILURE, GET_BUSINESS_JOBS_SUCCESS, GET_BUSINESS_JOB_CATEGORY_FAILURE, GET_BUSINESS_JOB_CATEGORY_SUCCESS, GET_JOB_BY_CODE_FAILURE, GET_JOB_BY_CODE_SUCCESS, ManageJobLoadingDataActionType, MANAGE_JOB_LOADING_DATA, UpdateJobFailureActiontype, UpdateJobSuccessActionType, UPDATE_JOB_FAILURE, UPDATE_JOB_SUCCESS } from "../../action-types/business/manage-job-action-type";

export const manageJobLoadingData = (): ManageJobLoadingDataActionType => ({
    type: MANAGE_JOB_LOADING_DATA
})

export const getBusinessJobsSuccess = (lstJob: Array<JobResponse>): GetBusinessJobsSuccessActionType => ({
    type: GET_BUSINESS_JOBS_SUCCESS,
    payload: lstJob
})

export const getBusinessJobsFailure = (errMsg: string): GetBusinessJobsFailureActionType => ({
    type: GET_BUSINESS_JOBS_FAILURE,
    payload: errMsg
})

export const getJobByCodeSuccess = (job: JobResponse): GetJobByCodeSuccessActionType => ({
    type: GET_JOB_BY_CODE_SUCCESS,
    payload: job
})

export const getJobByCodeFailure = (errMsg: string): GetJobByCodeFailureActiontype => ({
    type: GET_JOB_BY_CODE_FAILURE,
    payload: errMsg
})

export const updateJobSuccess = (jobResponse: Partial<JobResponse>, sucMsg: string): UpdateJobSuccessActionType => ({
    type: UPDATE_JOB_SUCCESS,
    payload: jobResponse,
    message: sucMsg
})

export const updateJobFailure = (errMsg: string): UpdateJobFailureActiontype => ({
    type: UPDATE_JOB_FAILURE,
    payload: errMsg
})

export const getBusinessJobCategorySuccess = (jobCats: Array<JobCategory>): GetBusinessJobCategorySuccessActionType => ({
    type: GET_BUSINESS_JOB_CATEGORY_SUCCESS,
    payload: jobCats
})

export const getBusinessJobCategoryFailure = (errMsg: string): GetBusinessJobCategoryFailureActionTyp => ({
    type: GET_BUSINESS_JOB_CATEGORY_FAILURE,
    payload: errMsg
})

export const getAllJobCategorySuccess = (jobCats: Array<JobCategory>): GetAllJobCategorySuccessActionType => ({
    type: GET_ALL_JOB_CATEGORY_SUCCESS,
    payload: jobCats
})

export const getAllJobCategoryFailure = (errMsg: string): GetAllJobCategoryFailureActionType => ({
    type: GET_ALL_JOB_CATEGORY_FAILURE,
    payload: errMsg
})

export const addJobSuccess = (sucMsg: string): AddJobSuccessActionType => ({
    type: ADD_JOB_SUCCESS,
    payload: sucMsg
})

export const addJobFailure = (errMsg: string): AddJobFailureActionType => ({
    type: ADD_JOB_FAILURE,
    payload: errMsg
})