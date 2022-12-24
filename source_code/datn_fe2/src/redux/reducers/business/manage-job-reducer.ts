import { JobResponse } from "../../../types/response/JobResponse"
import { GET_BUSINESS_JOBS_FAILURE, GET_BUSINESS_JOBS_SUCCESS, GET_JOB_BY_CODE_FAILURE, GET_JOB_BY_CODE_SUCCESS, ManageJobActionType, MANAGE_JOB_LOADING_DATA, UPDATE_JOB_FAILURE, UPDATE_JOB_SUCCESS } from "../../action-types/business/manage-job-action-type"

export type InitialState = {
    loading: boolean,
    jobs: Array<JobResponse>,
    job: Partial<JobResponse>,
    sucMsg: string,
    errMsg: string
}

const initialState: InitialState = {
    loading: false,
    jobs: [],
    job: {},
    sucMsg: "",
    errMsg: ""
}

const reducer = (state: InitialState = initialState, action: ManageJobActionType): InitialState => {
    switch (action.type) {
        case MANAGE_JOB_LOADING_DATA:
            return { ...state, loading: true }
        case GET_BUSINESS_JOBS_SUCCESS:
            return { ...state, loading: false, jobs: action.payload, errMsg: "" }
        case GET_BUSINESS_JOBS_FAILURE:
            return { ...state, loading: false, jobs: [], errMsg: action.payload }
        case GET_JOB_BY_CODE_SUCCESS:
            return { ...state, loading: false, job: action.payload, errMsg: "" }
        case GET_JOB_BY_CODE_FAILURE:
            return { ...state, loading: false, job: {}, errMsg: action.payload }
        case UPDATE_JOB_SUCCESS:
            return { ...state, loading: false, sucMsg: action.payload, errMsg: "" }
        case UPDATE_JOB_FAILURE:
            return { ...state, loading: false, sucMsg: "", errMsg: action.payload }
        default:
            return state
    }
}

export default reducer;