import { BusinessDescriptionResponse } from "../../../types/response/BusinessDescriptionResponse"
import { JobCategory } from "../../../types/response/JobCategory"
import { JobResponse } from "../../../types/response/JobResponse"
import { ApplyJobActionType, APPLY_JOB_FAILURE, APPLY_JOB_LOADING_DATA, APPLY_JOB_SUCCESS, GET_ALL_BUSINESS_FAILURE, GET_ALL_BUSINESS_SUCCESS, GET_ALL_JOB_CATEGORY_FAILURE, GET_ALL_JOB_CATEGORY_SUCCESS, GET_ALL_JOB_FAILURE, GET_ALL_JOB_SUCCESS, GET_APPLIED_JOB_FAILURE, GET_APPLIED_JOB_SUCCESS, GET_APPLIED_JOB_WARN, GET_APPLYING_JOB_FAILURE, GET_APPLYING_JOB_SUCCESS, GET_APPLYING_JOB_WARN, GET_JOB_DETAIL_FAILURE, GET_JOB_DETAIL_SUCCESS, SEARCH_JOB_FAILURE, SEARCH_JOB_SUCCESS } from "../../action-types/student/apply-job-action-types"

export type InitialState = {
    loading: boolean,
    jobs: Array<JobResponse>,
    applyingJobs: Array<JobResponse>,
    appliedJobs: Array<JobResponse>,
    jobCategories: Array<JobCategory>,
    businesses: Array<BusinessDescriptionResponse>,
    job: Partial<JobResponse>,
    sucMsg: string,
    errMsg: string,
    warnMsg: string,
    catErrMsg: string,
    businessErrMsg: string
}

const initialState: InitialState = {
    loading: false,
    jobs: [],
    applyingJobs: [],
    appliedJobs: [],
    jobCategories: [],
    businesses: [],
    job: {},
    sucMsg: "",
    errMsg: "",
    warnMsg: "",
    catErrMsg: "",
    businessErrMsg: ""
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
        case GET_APPLYING_JOB_SUCCESS:
            return { ...state, loading: false, applyingJobs: action.payload, errMsg: "", warnMsg: "" }
        case GET_APPLYING_JOB_FAILURE:
            return { ...state, loading: false, applyingJobs: [], errMsg: action.payload, warnMsg: "" }
        case GET_APPLYING_JOB_WARN:
            return { ...state, loading: false, applyingJobs: [], errMsg: "", warnMsg: action.payload }
        case GET_APPLIED_JOB_SUCCESS: 
            return { ...state, loading: false, appliedJobs: action.payload, errMsg: "", warnMsg: "" }
        case GET_APPLIED_JOB_FAILURE:
            return { ...state, loading: false, appliedJobs: [], errMsg: action.payload, warnMsg: "" } 
        case GET_APPLIED_JOB_WARN:
            return { ...state, loading: false, appliedJobs: [], errMsg: "", warnMsg: action.payload }
        case GET_ALL_JOB_CATEGORY_SUCCESS:
            return { ...state, loading: false, jobCategories: action.payload, catErrMsg: "" }
        case GET_ALL_JOB_CATEGORY_FAILURE:
            return { ...state, loading: false, jobCategories: [], catErrMsg: action.payload }   
        case GET_ALL_BUSINESS_SUCCESS:
            return { ...state, loading: false, businesses: action.payload,  businessErrMsg: "" }
        case GET_ALL_BUSINESS_FAILURE:
            return { ...state, loading: false, businesses: [], businessErrMsg: action.payload }
        default:
            return state;
    }
}

export default reducer;