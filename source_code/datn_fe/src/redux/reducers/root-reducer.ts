import { combineReducers } from "redux";
import loginReducer from './login-reducer'

const rootReducer = combineReducers({
    login: loginReducer
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

export default rootReducer;