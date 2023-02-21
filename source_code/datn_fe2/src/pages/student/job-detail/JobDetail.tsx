import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import Toasts from "../../../components/toast/Toast";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import {
  applyJob,
  getJobDetail,
} from "../../../redux/thunks/student/apply-job-thunk";
import { ApplyRequest } from "../../../types/request/ApplyRequest";
import { JobResponse } from "../../../types/response/JobResponse";
import { JobTimeResponse } from "../../../types/response/JobTimeReponse";
import { Constants } from "../../../utils/constants/constants";

const JobDetail = () => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector(
    (state: AppStateType) => state.applyJob.loading
  );
  const job: Partial<JobResponse> = useSelector(
    (state: AppStateType) => state.applyJob.job
  );
  const sucMsg: string = useSelector(
    (state: AppStateType) => state.applyJob.sucMsg
  );
  const errMsg: string = useSelector(
    (state: AppStateType) => state.applyJob.errMsg
  );
  const { jobCode } = useParams();

  useEffect(() => {
    dispatch(getJobDetail(jobCode == null ? "" : jobCode));
  }, []);

  const applyJob1 = (): void => {
    const applyRequest: ApplyRequest = {
      jobCode: jobCode == null ? "" : jobCode,
    };
    dispatch(applyJob(applyRequest));
  };

  const buttonApply = (applyStatus: number) => {
    if (applyStatus == Constants.NOT_APPLY_STUDENT) {
      return (
        <button
          type="submit"
          className="btn btn-success mt-2"
          onClick={applyJob1}
        >
          ỨNG TUYỂN
        </button>
      );
    } else if (applyStatus == Constants.APPLYIING_STUDENT) {
      return (
        <button type="submit" className="btn btn-warning mt-2">
          ĐANG ỨNG TUYỂN
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-danger mt-2">
          ĐÃ ỨNG TUYỂN
        </button>
      );
    }
  };

  const getTimeVal = (timeMap: JobTimeResponse[]) => {
    if (timeMap.length <= 0) {
      return "Không có";
    } else {
      return timeMap[0].startTime + " - " + timeMap[0].endTime;
    }
  };

  const jobTimeVal = () => {
    const jobTimes: JobTimeResponse[] = job.lstJobTime ? job.lstJobTime : [];
    return (
      <>
        <div>
          Thứ 2: <span />
          {getTimeVal(jobTimes.filter((jobTime) => jobTime.dayOfWeek == "2"))}
        </div>
        <div>
          Thứ 3: <span />
          {getTimeVal(jobTimes.filter((jobTime) => jobTime.dayOfWeek == "3"))}
        </div>
        <div>
          Thứ 4: <span />
          {getTimeVal(jobTimes.filter((jobTime) => jobTime.dayOfWeek == "4"))}
        </div>
        <div>
          Thứ 5: <span />
          {getTimeVal(jobTimes.filter((jobTime) => jobTime.dayOfWeek == "5"))}
        </div>
        <div>
          Thứ 6: <span />
          {getTimeVal(jobTimes.filter((jobTime) => jobTime.dayOfWeek == "6"))}
        </div>
      </>
    );
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-md-2">
              <div className="col-md-3">
                <div>
                  {job.businessLogoLink ? (
                    <LazyLoadImage
                      effect="blur"
                      style={{ width: "100px" }}
                      src={job.businessLogoLink}
                    />
                  ) : (
                    <LazyLoadImage
                      effect="blur"
                      style={{ width: "100px" }}
                      src="https://i.ibb.co/LDTRK9Z/job.png"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div>
                {errMsg ? (
                  <div className="alert alert-danger">{errMsg}</div>
                ) : null}
                {sucMsg ? (
                  <div className="alert alert-success">{sucMsg}</div>
                ) : null}
              </div>
              <div className="row">
                <div className="col-md-7">
                  <h2>{job.jobName}</h2>
                  {buttonApply(job.applyStatus ? job.applyStatus : 0)}
                </div>
              </div>

              <div
                className="row mt-4"
                style={{ borderTop: "1px solid black" }}
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Mã công việc: </td>
                      <td>{job.jobCode}</td>
                    </tr>
                    <tr>
                      <td>Mô tả: </td>
                      <td>{job.description}</td>
                    </tr>
                    <tr>
                      <td>Ngành: </td>
                      <td>{job.jobCategoryName}</td>
                    </tr>
                    <tr>
                      <td>Yêu cầu: </td>
                      <td>{job.requirement}</td>
                    </tr>
                    <tr>
                      <td>Địa điểm: </td>
                      <td>{job.workAddress}</td>
                    </tr>
                    <tr>
                      <td>Mức lương: </td>
                      <td>{job.salary} VND</td>
                    </tr>
                    <tr>
                      <td>Thời gian làm việc: </td>
                      <td>{jobTimeVal()}</td>
                    </tr>
                    <tr>
                      <td>File mô tả chi tiết: </td>
                      <td>@TODO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-3">
              <h3>Công việc liên quan</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetail;
