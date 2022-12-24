import { JobResponse } from "../../../types/response/JobResponse"
import { ApplyJobActionType, APPLY_JOB_FAILURE, APPLY_JOB_LOADING_DATA, APPLY_JOB_SUCCESS, GET_ALL_JOB_FAILURE, GET_ALL_JOB_SUCCESS, GET_JOB_DETAIL_FAILURE, GET_JOB_DETAIL_SUCCESS, SEARCH_JOB_FAILURE, SEARCH_JOB_SUCCESS } from "../../action-types/student/apply-job-action-types"

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

const reducer = (state: InitialState = initialState, action: ApplyJobActionType): InitialState => {
    switch (action.type) {
        case APPLY_JOB_LOADING_DATA:
            return { ...state, loading: true }
        case GET_ALL_JOB_SUCCESS:
            return { ...state, loading: false, jobs: action.payload, errMsg: "" }
        case GET_ALL_JOB_FAILURE:
            return { ...state, loading: false, jobs: [], errMsg: action.payload }
        case SEARCH_JOB_SUCCESS:
            return { ...state, loading: false, jobs: action.payload, errMsg: "" }
        case SEARCH_JOB_FAILURE:
            return { ...state, loading: false, jobs: [], errMsg: action.payload }
        case GET_JOB_DETAIL_SUCCESS:
            return { ...state, loading: false, job: action.payload, errMsg: "" }
        case GET_JOB_DETAIL_FAILURE:
            return { ...state, loading: false, job: {}, errMsg: action.payload }
        case APPLY_JOB_SUCCESS:
            return { ...state, loading: false, sucMsg: action.payload, errMsg: "" }
        case APPLY_JOB_FAILURE:
            return { ...state, loading: false, sucMsg: "", errMsg: action.payload }
        default:
            return state;
    }
}

export default reducer;