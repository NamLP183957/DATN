import { JobResponse } from "../../../types/response/JobResponse";
import { ApplyJobFailureActionType, ApplyJobLoadingDataActionType, ApplyJobSuccessActionType, APPLY_JOB_FAILURE, APPLY_JOB_LOADING_DATA, APPLY_JOB_SUCCESS, GetAllJobFailureActionType, GetAllJobSuccessActionType, GetJobDetailFailureActionType, GetJobDetailSuccessActionType, GET_ALL_JOB_FAILURE, GET_ALL_JOB_SUCCESS, GET_JOB_DETAIL_FAILURE, GET_JOB_DETAIL_SUCCESS, SearchJobFailureActionType, SearchJobSuccessActionType, SEARCH_JOB_FAILURE, SEARCH_JOB_SUCCESS } from "../../action-types/student/apply-job-action-types";

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