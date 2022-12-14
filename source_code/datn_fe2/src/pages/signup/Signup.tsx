import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import { SignupRequest } from "../../types/request/SignupRequest";
import './Signup.css'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from "../../redux/thunks/signup-thunk";
import { AppStateType } from "../../redux/reducers/root-reducer";
import Spinner from "../../components/spinner/Spinner";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, serConfirmPassword] = useState("");
  const loading = useSelector((state: AppStateType) => state.signup.loading)
  const successMsg = useSelector((state: AppStateType) => state.signup.successMsg);
  const errorMsg = useSelector((state: AppStateType) => state.signup.errorMsg);

  const onClickSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signupRequest: SignupRequest = {email, password, confirmPassword};
    dispatch(signup(signupRequest));
  }

  return (
    <div id="container" className="container mt-5">
      {loading ? <Spinner /> : 
        <div className="row">
        <div className="col-md-6">
          <h4>
            <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
            ĐĂNG KÝ
          </h4>
          <hr />
          {errorMsg ? <div className="alert alert-danger col-6" role="alert">{errorMsg}</div> : null}
          {successMsg ? <div className="alert alert-success col-6" role="alert">{successMsg}</div> : null}
          <form onSubmit={onClickSignIn}>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">E-mail: </label>
              <FontAwesomeIcon
                style={{ position: "relative", top: "8px" }}
                icon={faEnvelope}
              />
              <div className="col-sm-7">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Mật khẩu: </label>
              <FontAwesomeIcon
                style={{ position: "relative", top: "8px" }}
                icon={faLock}
              />
              <div className="col-sm-7">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-form-label">Nhập lại mật khẩu: </label>
              <FontAwesomeIcon
                style={{ position: "relative", top: "8px" }}
                icon={faLock}
              />
              <div className="col-sm-7">
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    serConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="form-group row">
              <button type="submit" className="btn btn-dark mx-3">
                <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
                Đăng kí
              </button>
              {/* <Link to={"/forgot"} style={{ position: "relative", top: "8px" }}>Forgot password?</Link> */}
            </div>
          </form>
        </div>
      </div>
      }
    </div>
  )
}

export default Signup