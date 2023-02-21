import { Dispatch } from "redux";
import { ApplyRequest } from "../../../types/request/ApplyRequest";
import { JobSearchRequest } from "../../../types/request/JobSearchRequest";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { applyJobfailure, applyJobLoadingData, applyJobSuccess, getAllBusinessFailure, getAllBusinessSuccess, getAllJobCategoryFailure, getAllJobCategorySuccess, getAllJobFailure, getAllJobSuccess, getAppliedJobFailure, getAppliedJobSuccess, getAppliedJobWarn, getApplyingJobFailure, getApplyingJobSuccess, getApplyingJobWarn, getJobDetailFailure, getJobDetailSuccess, searchJobFailure, searchJobSuccess } from "../../actions/student/apply-job-action";

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

export const getApplyingJob = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob/applying-job", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getApplyingJobSuccess(response.data.content))
        } else if (response.data.status == ServiceStatus.WARN_MESSAGE) {
            dispatch(getApplyingJobWarn(response.data.message))
        } else {
            dispatch(getApplyingJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getApplyingJobFailure(Constants.SYSTEM_ERROR))
    }
}

export const getAppliedJob = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob/applied-job", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getAppliedJobSuccess(response.data.content))
        } else if (response.data.status == ServiceStatus.WARN_MESSAGE) {
            dispatch(getAppliedJobWarn(response.data.message))
        } else {
            dispatch(getAppliedJobFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getAppliedJobFailure(Constants.SYSTEM_ERROR))
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

export const applyJob = (applyRequest: ApplyRequest) =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.post("/student/applyJob", applyRequest, true)
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

export const getAllJobCategory = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob/job-category", true)
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

export const getAllBusiness = () =>async (dispatch: Dispatch) => {
    try {
        dispatch(applyJobLoadingData());
        const response = await requestService.get("/student/applyJob/business", true);
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(getAllBusinessSuccess(response.data.content))
        } else {
            dispatch(getAllBusinessFailure(response.data.message))
        }
    } catch (error: any) {
        console.log(error);
        dispatch(getAllBusinessFailure(Constants.SYSTEM_ERROR));
    }
}