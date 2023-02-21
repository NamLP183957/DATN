import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { JobRequest } from "../../../types/request/JobRequest";
import { JobResponse } from "../../../types/response/JobResponse";
import mapper from "../../../utils/constants/mapper";
const EditBusinessJobDetail = () => {
  const dispatch = useDispatch();
  const jobData: Partial<JobResponse> = useSelector(
    (state: AppStateType) => state.manageJob.job
  );
  const [job, setJob] = useState<Partial<JobRequest>>(
    mapper.convertToJobRequest(jobData)
  );
  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageJob.errMsg
  );
  const sucMsg: string = useSelector(
    (state: AppStateType) => state.manageJob.sucMsg
  );

  const {
    id,
    jobCode,
    jobName,
    description,
    requirement,
    workAddress,
    // Tính bằng VND
    salary,
    status,
    note,
    // Tính bằng ngày
    rangeDay,
    jobCategoryId,
    businessId,

    // monStartTimeHour,
    // monStartTimeMin,
    // monEndTimeHour,
    // monEndTimeMin,

    // tueStartTimeHour,
    // tueStartTimeMin,
    // tueEndTimeHour,
    // tueEndTimeMin,

    // wedStartTimeHour,
    // wedStartTimeMin,
    // wedEndTimeHour,
    // wedEndTimeMin,

    // thuStartTimeHour,
    // thuStartTimeMin,
    // thuEndTimeHour,
    // thuEndTimeMin,

    // friStartTimeHour,
    // friStartTimeMin,
    // friEndTimeHour,
    // friEndTimeMin,
  } = job;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const dayArr = [2, 3, 4, 5, 6];

  console.log("jobData: ", jobData);

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
      <form className="edit_personal_data">
        <div className="form-group row">
          <div className="col-sm-9">
            <input
              type="text"
              // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
              className="form-control"
              name="jobName"
              value={jobName}
              onChange={handleInputChange}
              style={{ height: "40px", fontSize: "30px", fontWeight: "bold" }}
            />
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid black",
            marginTop: "33px",
            paddingTop: "20px",
          }}
        >
          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Trạng thái:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="status"
                value={status}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Mã công việc:
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="jobCode"
                value={jobCode}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Mô tả:
            </label>
            <div className="col-sm-7">
              <input
                type="textarea"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="description"
                value={description}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Yêu cầu:
            </label>
            <div className="col-sm-7">
              <input
                type="textarea"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="requirement"
                value={requirement}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Địa điểm:
            </label>
            <div className="col-sm-7">
              <input
                type="textarea"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="workAddress"
                value={workAddress}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Mức lương:
            </label>
            <div className="col-sm-5">
              <input
                type="number"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="salary"
                value={salary}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              />
            </div>
            <div className="col-sm-2">VND</div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label personal_data_item">
              Thời gian làm việc:
            </label>

            {dayArr.map((day) => (
              <div className="col-sm-12">
                <label className="col-sm-4 col-form-label personal_data_item">
                  Thứ {day}:
                </label>
                <input className="col-sm-1" type="number" name="" />
                <span style={{ fontWeight: "bold" }}> h </span>
                <input className="col-sm-1" type="number" name="" />

                <span style={{ fontWeight: "bold", margin: "0 10px" }}>
                  {" "}
                  {"đến"}{" "}
                </span>

                <input className="col-sm-1" type="number" name="" />
                <span style={{ fontWeight: "bold" }}> h </span>
                <input className="col-sm-1" type="number" name="" />
              </div>
            ))}

            {/* <div className="col-sm-12">
              <label className="col-sm-4 col-form-label personal_data_item">
                Thứ 2:
              </label>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold", margin: "0 10px"}}> {"đến"} </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
            </div> */}

            {/* <div className="col-sm-12">
              <label className="col-sm-4 col-form-label personal_data_item">
                Thứ 3:
              </label>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold", margin: "0 10px"}}> {"đến"} </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
            </div> */}

            {/* <div className="col-sm-12">
              <label className="col-sm-4 col-form-label personal_data_item">
                Thứ 4:
              </label>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold", margin: "0 10px"}}> {"đến"} </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
            </div> */}

            {/* <div className="col-sm-12">
              <label className="col-sm-4 col-form-label personal_data_item">
                Thứ 5:
              </label>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold", margin: "0 10px"}}> {"đến"} </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
            </div> */}

            {/* <div className="col-sm-12">
              <label className="col-sm-4 col-form-label personal_data_item">
                Thứ 6:
              </label>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold", margin: "0 10px"}}> {"đến"} </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
              <span style={{fontWeight: "bold"}}> h </span>
              <input 
                className="col-sm-1"
                type="number"
                name=""
              />
            </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBusinessJobDetail;
