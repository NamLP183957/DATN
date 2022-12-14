import { SignupActionType, SIGNUP_FAILURE, SIGNUP_LOADING_DATA, SINGUP_SUCCESS } from "../action-types/singup-action-types"

export type InitialState = {
    loading: boolean,
    successMsg: string,
    errorMsg: string
}

const initialState: InitialState = {
    loading: false,
    successMsg: "",
    errorMsg: ""
}

const reducer = (state:InitialState = initialState, action: SignupActionType): InitialState=> {
    switch(action.type) {
        case SIGNUP_LOADING_DATA: 
            return { ...state, loading: true}
        case SINGUP_SUCCESS:
            return { ...state, successMsg: action.payload, errorMsg: "", loading: false}
        case SIGNUP_FAILURE:
            return { ...state, successMsg: "", errorMsg: action.payload, loading: false}
        default:
            return state;
    }
}

export default reducer;