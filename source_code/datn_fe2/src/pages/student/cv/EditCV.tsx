import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { updateCV } from "../../../redux/thunks/student/cv-thunk";
import { StudentCVRequest } from "../../../types/request/StudentCVRequest";
import { StudentCV } from "../../../types/response/StudentCV";

const EditCV = () => {
  const dispatch = useDispatch();
  const cvData: Partial<StudentCV> = useSelector(
    (state: AppStateType) => state.manageCV.cv
  );
  const [cv, setCv] = useState<Partial<StudentCV>>(cvData);

  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageCV.errMsg
  );
  const sucMsg: string = useSelector(
    (state: AppStateType) => state.manageCV.sucMsg
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

  // useEffect(() => {
  //   setCv(cvData);
  // }, [cvData])
  
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cvEdit: StudentCVRequest = {
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
      additional,
    };
    dispatch(updateCV(cvEdit));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCv({ ...cv, [name]: value });
  };

  return (
    <div className="container-fluid">
      {errMsg ? (
        <div className="alert alert-danger" role="alert">
          {errMsg}
        </div>
      ) : null}
      {sucMsg ? (
        <div className="alert alert-success" role="alert">
            {sucMsg}
        </div>
      ) : null}
      <form className="edit_personal_data" onSubmit={onFormSubmit}>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Họ:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
            {/* <div className="invalid-feedback">{firstNameError}</div> */}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Tên đệm:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="surName"
              value={surName}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Tên:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              // className={lastNameError ? 'form-control is-invalid' : 'form-control'}
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
            {/* <div className="invalid-feedback">{lastNameError}</div> */}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Số điện thoại:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Chuyên ngành:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="study"
              value={study}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Điểm mạnh:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="talent"
              value={talent}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Điểm yếu:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="weakness"
              value={weakness}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Giải thưởng:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="prize"
              value={prize}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Sở thích:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="hobby"
              value={hobby}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Nơi ở:
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={handleInputChange}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label personal_data_item">
            Bổ sung:
          </label>
          <div className="col-sm-7">
            <input
              type="textarea"
              className="form-control"
              name="additional"
              value={additional}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-dark">
          <FontAwesomeIcon className="mr-2" icon={faCheck} />
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCV;
