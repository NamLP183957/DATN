import { AppriciateJobFailureActionType, AppriciateJobLoadingDataActiontype, AppriciateJobSuccessActionType, APPRICIATE_JOB_FAILURE, APPRICIATE_JOB_LOADING_DATA, APPRICIATE_JOB_SUCCESS } from "../../action-types/student/appriciate-job-action-types";

export const appriciateJobLoadingData = (): AppriciateJobLoadingDataActiontype => ({
    type: APPRICIATE_JOB_LOADING_DATA
})

export const appriciateJobSuccess = (sucMsg: string): AppriciateJobSuccessActionType => ({
    type: APPRICIATE_JOB_SUCCESS,
    payload: sucMsg
})

export const appriciateJobFailure = (errMsg: string): AppriciateJobFailureActionType => ({
    type: APPRICIATE_JOB_FAILURE,
    payload: errMsg
})