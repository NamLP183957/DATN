import { combineReducers } from "redux";
import loginReducer from './login-reducer';
import signupReducer from './signup-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

export default rootReducer;