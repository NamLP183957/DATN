import { StudentCV } from "../../../types/response/StudentCV"
import { CVActionType, CVLoadingDataActionType, CV_LOADING_DATA, GET_CV_FAILURE, GET_CV_SUCCESS, GET_CV_WARN, UPDATE_AVATAR_FAILURE, UPDATE_AVATAR_SUCCESS, UPDATE_CV_FAILURE, UPDATE_CV_SUCCESS } from "../../action-types/student/cv-action-types"

export type InitialState = {
    loading: boolean,
    cv: Partial<StudentCV>,
    avatarLink: string,
    sucMsg: string,
    errMsg: string,
    warnMsg: string
}

const initialState: InitialState = {
    loading: false,
    cv: {},
    avatarLink: "",
    sucMsg: "",
    errMsg: "",
    warnMsg: "",
}

const reducer = (state: InitialState = initialState, action: CVActionType): InitialState => {
    switch (action.type) {
        case CV_LOADING_DATA: 
            return { ...state, loading: true }
        case UPDATE_CV_SUCCESS:
            return { ...state, loading: false, cv: action.payload, sucMsg: action.message, errMsg: "" }
        case UPDATE_CV_FAILURE:
            return { ...state, loading: false, cv: {}, sucMsg: "", errMsg: action.payload }
        case GET_CV_SUCCESS:
            return { ...state, loading: false, cv: action.payload, errMsg: "" }
        case GET_CV_WARN:
            return { ...state, loading: false, cv: {}, errMsg: "", warnMsg: action.payload}
        case GET_CV_FAILURE:
            return { ...state, loading: false, cv: {}, errMsg: action.payload }
        case UPDATE_AVATAR_SUCCESS:
            return { ...state, loading: false, avatarLink: action.payload, errMsg: "" }
        case UPDATE_AVATAR_FAILURE:
            return { ...state, loading: false, avatarLink: "", errMsg: action.payload }
        default: 
            return state;
    }
}

export default reducer;