import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { updateJob } from "../../../redux/thunks/business/manage-job-thunk";
import { JobRequest } from "../../../types/request/JobRequest";
import { JobTimeRequest2 } from "../../../types/request/JobTimeRequest2";
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

    lstJobTimeReq,
  } = job;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  }

  const dayArr = [2, 3, 4, 5, 6];

  const handleInputNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    var dayOfWeekStr = name.substring(name.length - 1);
    console.log("day of week str: ", dayOfWeekStr);
    var anJobTimeReq: JobTimeRequest2;

    if (lstJobTimeReq) {
      for (var i = 0; i < lstJobTimeReq.length; i++) {
        if ((i + 2).toString() == dayOfWeekStr) {
          lstJobTimeReq[i] = {
            ...lstJobTimeReq[i],
            [name.substring(0, name.length - 1)]: value,
          };
          // anJobTimeReq = {...lstJobTimeReq[i], [name.substring(0, name.length - 1)]: value}
        }
      }
    }

    setJob({ ...job, lstJobTimeReq: lstJobTimeReq });
  };

  // console.log("job: ", job);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jobEdit: JobRequest = {
      id,
      jobCode,
      jobName,
      description,
      requirement,
      workAddress,
      salary,
      status,
      note,
      rangeDay,
      jobCategoryId,
      businessId,

      lstJobTimeReq,
    };

    console.log("jobEdit: ", jobEdit);
    dispatch(updateJob(jobEdit));
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

          <button type="submit" className="btn btn-dark">
            <FontAwesomeIcon className="mr-2" icon={faCheck} />
            Save
          </button>
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
              {/* <input
                type="text"
                // className={firstNameError ? 'form-control is-invalid' : 'form-control'}
                className="form-control"
                name="status"
                value={status}
                onChange={handleInputChange}
                style={{ height: "30px" }}
              /> */}
              <select name="status" className="form-control" value={status} onChange={handleSelectChange}>
                <option value="0">Không tuyển</option>
                <option value="1">Đang tuyển</option>
              </select>
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
                disabled={true}
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
                <input
                  // className="col-sm-1"
                  style={{ width: "40px" }}
                  type="number"
                  name={"startTimeHour" + day}
                  onChange={handleInputNumChange}
                  value={
                    lstJobTimeReq
                      ? lstJobTimeReq.length > 0
                        ? lstJobTimeReq[day - 2].startTimeHour
                        : 0
                      : 0
                  }
                />
                <span style={{ fontWeight: "bold" }}> h </span>
                <input
                  // className="col-sm-1"
                  style={{ width: "40px" }}
                  type="number"
                  name={"startTimeMin" + day}
                  onChange={handleInputNumChange}
                  value={
                    lstJobTimeReq
                      ? lstJobTimeReq.length > 0
                        ? lstJobTimeReq[day - 2].startTimeMin
                        : 0
                      : 0
                  }
                />

                <span style={{ fontWeight: "bold", margin: "0 10px" }}>
                  {" "}
                  {"đến"}{" "}
                </span>

                <input
                  // className="col-sm-2"
                  style={{ width: "40px" }}
                  type="number"
                  name={"endTimeHour" + day}
                  onChange={handleInputNumChange}
                  value={lstJobTimeReq
                    ? lstJobTimeReq.length > 0
                      ? lstJobTimeReq[day - 2].endTimeHour
                      : 0
                    : 0}
                />
                <span style={{ fontWeight: "bold" }}> h </span>
                <input
                  // className="col-sm-2"
                  style={{ width: "40px" }}
                  type="number"
                  name={"endTimeMin" + day}
                  onChange={handleInputNumChange}
                  value={lstJobTimeReq
                    ? lstJobTimeReq.length > 0
                      ? lstJobTimeReq[day - 2].endTimeMin
                      : 0
                    : 0}
                  // value={2}
                />
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
