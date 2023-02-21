import {
  faAddressCard,
  faEdit,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { getCV } from "../../../redux/thunks/student/cv-thunk";
import { StudentCV } from "../../../types/response/StudentCV";
import { Constants } from "../../../utils/constants/constants";
import "./CV.css";
import EditCV from "./EditCV";
const CV = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading: boolean = useSelector(
    (state: AppStateType) => state.manageCV.loading
  );
  const cv: Partial<StudentCV> = useSelector(
    (state: AppStateType) => state.manageCV.cv
  );
  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageCV.errMsg
  );
  const warnMsg: string = useSelector(
    (state: AppStateType) => state.manageCV.warnMsg
  );
  const {
    id,
    firstName,
    surName,
    lastName,
    phoneNumber,
    address,
    prize,
    certificate,
    study,
    talent,
    weakness,
    hobby,
    avatarFileName,
    additional,
  } = cv;

  useEffect(() => {
    dispatch(getCV());
  }, []);

  return (
    <div className="container" >
      {loading ? (
        <Spinner />
      ) : (
        <div className="row mt-5 mb-5">
          <div className="col-md-2">
            {avatarFileName ? (
              <LazyLoadImage
                effect="blur"
                style={{ width: "100px" }}
                src={avatarFileName}
              />
            ) : (
              <LazyLoadImage
                effect="blur"
                style={{ width: "100px" }}
                src={Constants.DEFAULT_STUDENT_AVATAR}
              />
            )}
            <button className="btn btn-dark mt-4">
              <FontAwesomeIcon className="mr-2" icon={faEdit}/>
              Đổi ảnh
            </button>
          </div>
          <div className="personal-data col-md-4">
            {errMsg ? (
              <div className="alert alert-danger" role="alert">
                {errMsg}
              </div>
            ) : null}
            {warnMsg ? (
              <div className="alert alert-warning" role="alert">
                {warnMsg}
              </div>
            ) : null}
            <h4 className="personal_data_title">
              <FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard} />
              Hồ sơ cá nhân
            </h4>
            <p className="personal_data_item">
              Họ:
              <span className="personal_data_text">{firstName}</span>
            </p>
            <p className="personal_data_item">
              Tên đệm:
              <span className="personal_data_text">{surName}</span>
            </p>
            <p className="personal_data_item">
              Tên:
              <span className="personal_data_text">{lastName}</span>
            </p>
            <p className="personal_data_item">
              Số điện thoại:
              <span className="personal_data_text">{phoneNumber}</span>
            </p>
            <p className="personal_data_item">
              Chuyên ngành:
              <span className="personal_data_text">{study}</span>
            </p>
            <p className="personal_data_item">
              Điểm mạnh:
              <span className="personal_data_text">{talent}</span>
            </p>
            <p className="personal_data_item">
              Điểm yếu:
              <span className="personal_data_text">{weakness}</span>
            </p>
            <p className="personal_data_item">
              Giải thưởng:
              <span className="personal_data_text">{prize}</span>
            </p>
            <p className="personal_data_item">
              Sở thích:
              <span className="personal_data_text">{hobby}</span>
            </p>
            <p className="personal_data_item">
              Nơi ở:
              <span className="personal_data_text">{address}</span>
            </p>
            <p className="personal_data_item">
              Bổ sung:
              <span className="personal_data_text">{additional}</span>
            </p>
            {location.pathname === "/student/cv" ? (
              <Link
                to={"/student/cv/edit"}
                className="btn btn-dark personal_data_btn"
              >
                <FontAwesomeIcon className="mr-2" icon={faEdit} /> Edit
              </Link>
            ) : (
              <Link
                to={"/student/cv"}
                className="btn btn-dark personal_data_btn"
              >
                <FontAwesomeIcon className="mr-2" icon={faEyeSlash} /> Hide
              </Link>
            )}
          </div>
          <div className="col-md-6">
            {location.pathname === "/student/cv/edit" ? <EditCV /> : <div />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CV;
