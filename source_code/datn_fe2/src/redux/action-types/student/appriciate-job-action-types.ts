export const APPRICIATE_JOB_LOADING_DATA = "APPRICIATE_JOB_LOADING_DATA";
export const APPRICIATE_JOB_SUCCESS = "APPRICIATE_JOB_SUCCESS";
export const APPRICIATE_JOB_FAILURE = "APPRICIATE_JOB_FAILURE";

export type AppriciateJobLoadingDataActiontype = {type: typeof APPRICIATE_JOB_LOADING_DATA};
export type AppriciateJobSuccessActionType = {type: typeof APPRICIATE_JOB_SUCCESS, payload: string};
export type AppriciateJobFailureActionType = {type: typeof APPRICIATE_JOB_FAILURE, payload: string};

export type AppriciateJobActionType = AppriciateJobLoadingDataActiontype
| AppriciateJobSuccessActionType | AppriciateJobFailureActionType;