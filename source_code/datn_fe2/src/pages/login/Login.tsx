import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { AppStateType } from "../../redux/reducers/root-reducer";
import { login } from "../../redux/thunks/login-thunk";
import { LoginRequest } from "../../types/request/LoginRequest";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const loading = useSelector(
    (appState: AppStateType) => appState.login.loading
  );
  const error = useSelector((appState: AppStateType) => appState.login.error);
  const onClickSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginRequest: LoginRequest = {email, password};
    dispatch(login(loginRequest, navigate));
  };

  return (
    <div id="container" className="container mt-5">
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <h4>
              <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
              ĐĂNG NHẬP
            </h4>
            <hr />
            {error ? <div className="alert alert-danger col-6" role="alert">{error}</div> : null}
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
                <label className="col-sm-4 col-form-label">Password: </label>
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
                <button type="submit" className="btn btn-dark mx-3">
                  <FontAwesomeIcon className="mr-3" icon={faSignInAlt} />
                  Đăng nhập
                </button>
                {/* <Link to={"/forgot"} style={{ position: "relative", top: "8px" }}>Forgot password?</Link> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
