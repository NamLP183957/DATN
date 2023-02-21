import { BusinessDescriptionResponse } from "../../../types/response/BusinessDescriptionResponse";
import { JobCategory } from "../../../types/response/JobCategory";
import { JobResponse } from "../../../types/response/JobResponse";
import { GetApplicantSuccessActionType } from "../../action-types/business/manage-applicant-action-types";
import { ApplyJobFailureActionType, ApplyJobLoadingDataActionType, ApplyJobSuccessActionType, APPLY_JOB_FAILURE, APPLY_JOB_LOADING_DATA, APPLY_JOB_SUCCESS, GetAllBusinessFailureActionType, GetAllBusinessSuccessActionType, GetAllJobCategoryFailureActionType, GetAllJobCategorySuccessActionType, GetAllJobFailureActionType, GetAllJobSuccessActionType, GetAppliedJobFailureActionType, GetAppliedJobSuccessActionType, GetAppliedJobWarnActionType, GetApplyingJobFailureActionType, GetApplyingJobSuccessActionType, GetApplyingJobWarnActionType, GetJobDetailFailureActionType, GetJobDetailSuccessActionType, GET_ALL_BUSINESS_FAILURE, GET_ALL_BUSINESS_SUCCESS, GET_ALL_JOB_CATEGORY_FAILURE, GET_ALL_JOB_CATEGORY_SUCCESS, GET_ALL_JOB_FAILURE, GET_ALL_JOB_SUCCESS, GET_APPLIED_JOB_FAILURE, GET_APPLIED_JOB_SUCCESS, GET_APPLIED_JOB_WARN, GET_APPLYING_JOB_FAILURE, GET_APPLYING_JOB_SUCCESS, GET_APPLYING_JOB_WARN, GET_JOB_DETAIL_FAILURE, GET_JOB_DETAIL_SUCCESS, SearchJobFailureActionType, SearchJobSuccessActionType, SEARCH_JOB_FAILURE, SEARCH_JOB_SUCCESS } from "../../action-types/student/apply-job-action-types";

export const applyJobLoadingData = (): ApplyJobLoadingDataActionType => ({
    type: APPLY_JOB_LOADING_DATA
});

export const getAllJobSuccess = (jobs: Array<JobResponse>): GetAllJobSuccessActionType => ({
    type: GET_ALL_JOB_SUCCESS,
    payload: jobs
});

export const getAllJobFailure = (error: string): GetAllJobFailureActionType => ({
    type: GET_ALL_JOB_FAILURE,
    payload: error
});

export const searchJobSuccess = (jobs: Array<JobResponse>): SearchJobSuccessActionType => ({
    type: SEARCH_JOB_SUCCESS,
    payload: jobs
});

export const searchJobFailure = (error: string): SearchJobFailureActionType => ({
    type: SEARCH_JOB_FAILURE,
    payload: error
});

export const getJobDetailSuccess = (job: JobResponse): GetJobDetailSuccessActionType => ({
    type: GET_JOB_DETAIL_SUCCESS,
    payload: job
});

export const getJobDetailFailure = (error: string): GetJobDetailFailureActionType => ({
    type: GET_JOB_DETAIL_FAILURE,
    payload: error
});

export const applyJobSuccess = (sucMsg: string): ApplyJobSuccessActionType => ({
    type: APPLY_JOB_SUCCESS,
    payload: sucMsg
})

export const applyJobfailure = (errMsg: string): ApplyJobFailureActionType => ({
    type: APPLY_JOB_FAILURE,
    payload: errMsg
})

export const getApplyingJobSuccess = (jobs: Array<JobResponse>): GetApplyingJobSuccessActionType => ({
    type: GET_APPLYING_JOB_SUCCESS,
    payload: jobs
})

export const getApplyingJobFailure = (errMsg: string): GetApplyingJobFailureActionType => ({
    type: GET_APPLYING_JOB_FAILURE,
    payload: errMsg
})

export const getApplyingJobWarn = (warnMsg: string): GetApplyingJobWarnActionType => ({
    type: GET_APPLYING_JOB_WARN,
    payload: warnMsg
})

export const getAppliedJobSuccess = (jobs: Array<JobResponse>): GetAppliedJobSuccessActionType => ({
    type: GET_APPLIED_JOB_SUCCESS,
    payload: jobs
})

export const getAppliedJobFailure = (errMsg: string): GetAppliedJobFailureActionType => ({
    type: GET_APPLIED_JOB_FAILURE,
    payload: errMsg
})

export const getAppliedJobWarn = (warnMsg: string): GetAppliedJobWarnActionType => ({
    type: GET_APPLIED_JOB_WARN,
    payload: warnMsg
})

export const getAllJobCategorySuccess = (jobCats: Array<JobCategory>): GetAllJobCategorySuccessActionType => ({
    type: GET_ALL_JOB_CATEGORY_SUCCESS,
    payload: jobCats
})

export const getAllJobCategoryFailure = (errMsg: string): GetAllJobCategoryFailureActionType => ({
    type: GET_ALL_JOB_CATEGORY_FAILURE,
    payload: errMsg
})

export const getAllBusinessSuccess = (businesses: Array<BusinessDescriptionResponse>): GetAllBusinessSuccessActionType => ({
    type: GET_ALL_BUSINESS_SUCCESS,
    payload: businesses
})

export const getAllBusinessFailure = (errMsg: string): GetAllBusinessFailureActionType => ({
    type: GET_ALL_BUSINESS_FAILURE,
    payload: errMsg
})