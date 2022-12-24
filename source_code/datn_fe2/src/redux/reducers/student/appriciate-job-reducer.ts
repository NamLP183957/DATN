import { AppriciateJobActionType, APPRICIATE_JOB_FAILURE, APPRICIATE_JOB_LOADING_DATA, APPRICIATE_JOB_SUCCESS } from "../../action-types/student/appriciate-job-action-types"

export type InitialState = {
    loading: boolean,
    sucMsg: string,
    errMsg: string,
}

const initialState: InitialState = {
    loading: false,
    sucMsg: "",
    errMsg: ""
}

const reducer = (state: InitialState = initialState, action: AppriciateJobActionType): InitialState => {
    switch (action.type) {
        case APPRICIATE_JOB_LOADING_DATA:
            return { ...state, loading: true }
        case APPRICIATE_JOB_SUCCESS:
            return { ...state, loading: false, sucMsg: action.payload, errMsg: "" }
        case APPRICIATE_JOB_FAILURE:
            return { ...state, loading: false, sucMsg: "", errMsg: action.payload }
        default:
            return state;
    }
}

export default reducer;