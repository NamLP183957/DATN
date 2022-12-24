import { combineReducers } from "redux";
import loginReducer from './login-reducer';
import signupReducer from './signup-reducer';
import applyJobReducer from './student/apply-job-reducer';
import cvReducer from './student/cv-reducer';
import appriciateJobReducer from './student/appriciate-job-reducer';
import manageApplicantReducer from './business/manage-applicant-reducer';
import manageJobReducer from './business/manage-job-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    applyJob: applyJobReducer,
    manageCV: cvReducer,
    appriciateJobReducer: appriciateJobReducer,
    manageApplicant: manageApplicantReducer,
    manageJob: manageJobReducer
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

export default rootReducer;