import { Dispatch } from "redux";
import { JobRequest } from "../../../types/request/JobRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { addJobFailure, addJobSuccess, getAllJobCategoryFailure, getAllJobCategorySuccess, getBusinessJobCategoryFailure, getBusinessJobCategorySuccess, getBusinessJobsFailure, getBusinessJobsSuccess, getJobByCodeFailure, getJobByCodeSuccess, manageJobLoadingData, updateJobFailure, updateJobSuccess } from "../../actions/business/manage-job-action";

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
            dispatch(updateJobSuccess(response.data.content, response.data.message))
        } else {
            dispatch(updateJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(updateJobFailure(Constants.SYSTEM_ERROR))
    }
}

export const getBusinessJobCategory = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(manageJobLoadingData());
        const response = await requestService.get("/business/manageJob/job-category", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getBusinessJobCategorySuccess(response.data.content))
        } else {
            dispatch(getBusinessJobCategoryFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getBusinessJobCategoryFailure(Constants.SYSTEM_ERROR))
    }
}

export const getAllJobCategory = () =>async (dispatch: Dispatch) => {
    try {
        const response = await requestService.get("/business/manageJob/all-job-category", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getAllJobCategorySuccess(response.data.content))
        } else {
            dispatch(getAllJobCategoryFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getAllJobCategoryFailure(Constants.SYSTEM_ERROR))
    }
}

export const addJob = (jobReq: JobRequest) =>async (dispatch: Dispatch) => {
    try {
        const response = await requestService.post("/business/manageJob/add-job", jobReq, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(addJobSuccess(response.data.message))
        } else {
            dispatch(addJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(addJobFailure(Constants.SYSTEM_ERROR))
    }
}