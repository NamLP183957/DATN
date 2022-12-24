import { Dispatch } from "redux";
import { JobSearchRequest } from "../../../types/request/JobSearchRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { applyJobfailure, applyJobLoadingData, applyJobSuccess, getAllJobFailure, getAllJobSuccess, getJobDetailFailure, getJobDetailSuccess, searchJobFailure, searchJobSuccess } from "../../actions/student/apply-job-action";

export const getAllJob = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getAllJobSuccess(response.data.content))
        } else {
            dispatch(getAllJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getAllJobFailure(Constants.SYSTEM_ERROR))
    }
}

export const searchJob = (jobSearchRequest: JobSearchRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.post("/student/applyJob/search", jobSearchRequest, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(searchJobSuccess(response.data.content))
        } else {
            dispatch(searchJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(searchJobFailure(Constants.SYSTEM_ERROR))
    } 
}

export const getJobDetail = (jobCode: string) =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob/" + jobCode, true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getJobDetailSuccess(response.data.content))
        } else {
            dispatch(getJobDetailFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getJobDetailFailure(Constants.SYSTEM_ERROR))
    }
}

export const applyJob = (jobCode: string) =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.post("/student/applyJob", jobCode, true)
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(applyJobSuccess(response.data.message))
        } else {
            dispatch(applyJobfailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(applyJobfailure(Constants.SYSTEM_ERROR))
    }
}