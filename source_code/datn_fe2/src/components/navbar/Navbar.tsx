import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStateType } from "../../redux/reducers/root-reducer";
import { LoginResponse } from "../../types/response/LoginResponse";
import { convertStrToArr, ROLES } from "../../utils/constants/role";
import "./Navbar.css";

const Navbar = () => {
  const user: Partial<LoginResponse> = useSelector(
    (state: AppStateType) => state.login.user
  );
  const roles: Array<string> = convertStrToArr(
    user.roles == undefined ? "" : user.roles
  );
  const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";

  return (
    <div>
      <div
        id="header"
        className="container-fluid header-top d-none d-md-block pb-5 pt-5"
      >
        {/* <img src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" className="rounded mx-auto d-block" /> */}
      </div>
      <div className="container-fluid bg-black">
        <nav
          id="navbar-main"
          className={`container navbar navbar-expand-lg bg-black text-white `}
          style={{ fontSize: "18px" }}
        >
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/** STUDENT */}
            {roles.includes(ROLES.STUDENT) ? (
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <Link to={"/student/home"}>
                    <span className="nav-link pl-5 pr-5">TRANG CHỦ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"student/cv"}>
                    <span className="nav-link pl-5 pr-5">HỒ SƠ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/student/apply"}>
                    <span className="nav-link pl-5 pr-5">ỨNG TUYỂN</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <div></div>
            )}

            {/**BUSINESS */}
            {roles.includes(ROLES.BUSINESS) ? (
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <Link to={"/business/home"}>
                    <span className="nav-link pl-5 pr-5">TRANG CHỦ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"business/cv"}>
                    <span className="nav-link pl-5 pr-5">HỒ SƠ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/business/apply"}>
                    <span className="nav-link pl-5 pr-5">ỨNG TUYỂN</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <div></div>
            )}
            {/** ADMIN */}
            {roles.includes(ROLES.ADMIN) ? (
              <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                  <Link to={"/admin/home"}>
                    <span className="nav-link pl-5 pr-5">TRANG CHỦ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"admin/job-category"}>
                    <span className="nav-link pl-5 pr-5">HỒ SƠ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/admin/account"}>
                    <span className="nav-link pl-5 pr-5">ỨNG TUYỂN</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <div></div>
            )}

            {/** LOGIN/SIGNUP/LOGOUT */}
            {isLoggedIn ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/logout"}>
                    <span className="nav-link pl-5 pr-5">ĐĂNG XUẤT</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    <span className="nav-link pl-5 pr-5">ĐĂNG NHẬP</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/signup"}>
                    <span className="nav-link pl-5 pr-5">ĐĂNG KÝ</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
