import { Dispatch } from "redux";
import { Constants } from "../../../utils/constants/constants";
import { ServiceStatus } from "../../../utils/constants/status";
import requestService from "../../../utils/request-service";
import { appriciateJobFailure, appriciateJobLoadingData, appriciateJobSuccess } from "../../actions/student/appriciate-job-action";

export const appriciateJob = (data: FormData) =>async (dispatch: Dispatch) => {
    try {
        dispatch(appriciateJobLoadingData());
        const response = await requestService.post("/student/appriciateJob", data, true, "multipart/form-data");
        if (response.data.status == ServiceStatus.SUCCESS_RESULT) {
            dispatch(appriciateJobSuccess(response.data.message));
        } else {
            dispatch(appriciateJobFailure(response.data.message));
        }
    } catch (error: any) {
        console.log(error);
        dispatch(appriciateJobFailure(Constants.SYSTEM_ERROR));
    }
}