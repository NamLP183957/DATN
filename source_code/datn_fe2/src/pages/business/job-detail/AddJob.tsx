import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/Spinner";
import Toasts from "../../../components/toast/Toast";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { addJob, getAllJobCategory, updateJob } from "../../../redux/thunks/business/manage-job-thunk";
import { JobRequest } from "../../../types/request/JobRequest";
import { JobTimeRequest2 } from "../../../types/request/JobTimeRequest2";
import { JobCategory } from "../../../types/response/JobCategory";

const AddJob = () => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector(
    (state: AppStateType) => state.manageJob.loading
  );

  const sucMsg: string = useSelector(
    (state: AppStateType) => state.manageJob.sucMsg
  );

  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageJob.errMsg
  );

  const jobCats: Array<JobCategory> = useSelector(
    (state: AppStateType) => state.manageJob.jobCats
  )

  const isJobAdd: boolean = useSelector(
    (state: AppStateType) => state.manageJob.isJobAdd
  )

  const [showToast, setShowToast] = useState<boolean>(false);

  const [job, setJob] = useState<Partial<JobRequest>>({
    lstJobTimeReq: [
        {id: '0', startTimeHour: 0, startTimeMin: 0, endTimeHour: 0, endTimeMin: 0, dayOfWeek: 2},
        {id: '0', startTimeHour: 0, startTimeMin: 0, endTimeHour: 0, endTimeMin: 0, dayOfWeek: 3},
        {id: '0', startTimeHour: 0, startTimeMin: 0, endTimeHour: 0, endTimeMin: 0, dayOfWeek: 4},
        {id: '0', startTimeHour: 0, startTimeMin: 0, endTimeHour: 0, endTimeMin: 0, dayOfWeek: 5},
        {id: '0', startTimeHour: 0, startTimeMin: 0, endTimeHour: 0, endTimeMin: 0, dayOfWeek: 6},
    ]
  });

  useEffect(() => {
    dispatch(getAllJobCategory());
  }, [])

  useEffect(() => {
    if (isJobAdd) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  }, [isJobAdd])
  

  const dayArr = [2, 3, 4, 5, 6];

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
    setJob({ ...job, [name]: value});
  }

  const handleInputNumChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    var dayOfWeekStr = name.substring(name.length - 1);
    // console.log("day of week str: ", dayOfWeekStr);
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

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jobAdd: JobRequest = {
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

    console.log("jobAdd: ", jobAdd);
    dispatch(addJob(jobAdd));
  }

  return (
    <div className="container mt-5 mb-5" style={{ width: "50%" }}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="mb-3">Thêm mới công việc</h3>
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
          <Toasts showToast={showToast} message="Thêm mới công việc thành công" />
          <form className="edit_personal_data" onSubmit={onFormSubmit}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Tên công việc:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="jobName"
                  value={jobName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Mã công việc:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="jobCode"
                  value={jobCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Mô tả:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Yêu cầu:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="requirement"
                  value={requirement}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Địa điểm làm việc:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="workAddress"
                  value={workAddress}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Mức lương:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={salary}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Số ngày làm làm việc:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="rangeDay"
                  value={rangeDay}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Loại công việc:
              </label>
              <div className="col-sm-7">
                {/* <input
                  type="text"
                  className="form-control"
                  name="jobCategoryId"
                /> */}
                <select name="jobCategoryId" className="form-control" value={jobCategoryId} onChange={handleSelectChange}>
                    <option value="0"></option>
                    {jobCats.map((jobCat) => (
                        <option value={jobCat.id}>{jobCat.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Lưu ý:
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  name="note"
                  value={note}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label personal_data_item">
                Thời gian làm việc:
              </label>
              {dayArr.map((day) => (
                <div className="col-sm-12">
                  <label className="col-sm-4 col-form-label personal_data_item">
                    Thứ {day}:
                  </label>
                  <input
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
                    style={{ width: "40px" }}
                    type="number"
                    name={"endTimeHour" + day}
                    onChange={handleInputNumChange}
                    value={
                      lstJobTimeReq
                        ? lstJobTimeReq.length > 0
                          ? lstJobTimeReq[day - 2].endTimeHour
                          : 0
                        : 0
                    }
                  />
                  <span style={{ fontWeight: "bold" }}> h </span>
                  <input
                    style={{ width: "40px" }}
                    type="number"
                    name={"endTimeMin" + day}
                    onChange={handleInputNumChange}
                    value={
                      lstJobTimeReq
                        ? lstJobTimeReq.length > 0
                          ? lstJobTimeReq[day - 2].endTimeMin
                          : 0
                        : 0
                    }
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-dark">
              <FontAwesomeIcon className="mr-2" icon={faCheck} />
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddJob;
