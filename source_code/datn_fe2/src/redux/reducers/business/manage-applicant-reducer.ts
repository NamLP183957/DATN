import { ApplicantDetailResponse } from "../../../types/response/ApplicantDetailResponse"
import { ApplicantResponse } from "../../../types/response/ApplicantResponse"
import { APPROVE_APPLICANT_FAILURE, APPROVE_APPLICANT_SUCCESS, GET_APPLICANTS_FAILURE, GET_APPLICANTS_SUCCESS, GET_APPLICANT_DETAIL_SUCCESS, ManageApplicantActionType, MANAGE_APPLICANT_LOADING_DATA, REJECT_APPLICANT_FAILURE, REJECT_APPLICANT_SUCCESS } from "../../action-types/business/manage-applicant-action-types"

export type InitialState = {
    loading: boolean,
    applicants: Array<ApplicantResponse>,
    sucMsg: string,
    errMsg: string,
    applicant: Partial<ApplicantDetailResponse>,
}

const initialState: InitialState = {
    loading: false,
    applicants: [],
    sucMsg: "",
    errMsg: "",
    applicant: {},
}

const reducer = (state: InitialState = initialState, action: ManageApplicantActionType): InitialState => {
    switch (action.type) {
        case MANAGE_APPLICANT_LOADING_DATA:
            return { ...state, loading: true }
        case GET_APPLICANTS_SUCCESS:
            return { ...state, loading: false, applicants: action.payload, errMsg: "" }
        case GET_APPLICANTS_FAILURE:
            return { ...state, loading: false, applicants: [], errMsg: action.payload }
        case APPROVE_APPLICANT_SUCCESS:
            return { ...state, loading: false, applicant: action.payload, sucMsg: action.message, errMsg: "" }
        case APPROVE_APPLICANT_FAILURE:
            return { ...state, loading: false, sucMsg: "", errMsg: action.payload }
        case REJECT_APPLICANT_SUCCESS:
            return { ...state, loading: false, applicant: action.payload, sucMsg: action.message, errMsg: "" }
        case REJECT_APPLICANT_FAILURE:
            return { ...state, loading: false, sucMsg: "", errMsg: action.payload }
        case GET_APPLICANT_DETAIL_SUCCESS: 
            return { ...state, loading: false, applicant: action.payload, errMsg: ""}
        case GET_APPLICANTS_FAILURE:
            return { ...state, loading: false, applicant: {}, errMsg: action.payload }
        default: 
            return state
    }
}

export default reducer;