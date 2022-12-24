import { Dispatch } from "redux";
import { JobRequest } from "../../../types/request/JobRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { getBusinessJobsFailure, getBusinessJobsSuccess, getJobByCodeFailure, getJobByCodeSuccess, manageJobLoadingData, updateJobFailure, updateJobSuccess } from "../../actions/business/manage-job-action";

export const getBusinessJobs = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageJobLoadingData());
        const response = await requestService.get("/business/manageJob", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT){
            dispatch(getBusinessJobsSuccess(response.data.content))
        } else {
            dispatch(getBusinessJobsFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getBusinessJobsFailure(Constants.SYSTEM_ERROR))
    }
}

export const getJobByCode = (jobCode: string) =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageJobLoadingData());
        const response = await requestService.get("/business/manageJob/" + jobCode, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT){
            dispatch(getJobByCodeSuccess(response.data.content))
        } else {
            dispatch(getJobByCodeFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getJobByCodeFailure(Constants.SYSTEM_ERROR))
    }
}

export const updateJob = (jobRequest: JobRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageJobLoadingData());
        const response = await requestService.post("/business/manageJob/", jobRequest, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT){
            dispatch(updateJobSuccess(response.data.content))
        } else {
            dispatch(updateJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(updateJobFailure(Constants.SYSTEM_ERROR))
    }
}