import { LoginError } from "../../types/error/LoginError"
import { LoginResponse } from "../../types/response/LoginResponse"
import { LOADING_DATA, LoginActionType, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action-types/login-action-types"


export type InitialState = {
    user: Partial<LoginResponse>,
    loading: boolean,
    error: Partial<LoginError>
    isLoggedIn: boolean
}

const initialState: InitialState = {
    user: {},
    loading: false,
    error: {},
    isLoggedIn: false
}

const reducer = (state:InitialState = initialState, action: LoginActionType): InitialState=> {
    switch(action.type) {
        case LOADING_DATA: 
            return { ...state, loading: true}
        case LOGIN_SUCCESS:
            return { ...state, user: action.payload, isLoggedIn: true, loading: false}
        case LOGIN_FAILURE:
            return { ...state, error: action.payload, isLoggedIn: false, loading: false}
        default:
            return state;
    }
}

export default reducer;