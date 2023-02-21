import { faEdit, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { getJobByCode } from "../../../redux/thunks/business/manage-job-thunk";
import { JobResponse } from "../../../types/response/JobResponse";
import { JobTimeResponse } from "../../../types/response/JobTimeReponse";
import EditBusinessJobDetail from "./EditBusinessJobDetail";

const BusinessJobDetail = () => {
  const dispatch = useDispatch();
  const { jobCode } = useParams();
  const location = useLocation();
  const loading: boolean = useSelector(
    (state: AppStateType) => state.manageJob.loading
  );
  const job: Partial<JobResponse> = useSelector(
    (state: AppStateType) => state.manageJob.job
  );

  useEffect(() => {
    dispatch(getJobByCode(jobCode == null ? "" : jobCode));
  }, []);

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
            {/* <div className="col-md-2">
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
            </div> */}
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-9">
                  <h2>{job.jobName}</h2>
                </div>
                <div className="col-md-3">
                  {location.pathname === `/business/job/${jobCode}` ? (
                    <Link
                      to={`/business/job/${jobCode}/edit`}
                      className="btn btn-dark personal_data_btn"
                    >
                      <FontAwesomeIcon className="mr-2" icon={faEdit} /> Edit
                    </Link>
                  ) : (
                    <Link
                      to={`/business/job/${jobCode}`}
                      className="btn btn-dark personal_data_btn"
                    >
                      <FontAwesomeIcon className="mr-2" icon={faEyeSlash} />{" "}
                      Hide
                    </Link>
                  )}
                </div>
              </div>
              <div
                className="row mt-4"
                style={{ borderTop: "1px solid black" }}
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Trạng thái: </td>
                      <td>
                        {job.status
                          ? job.status == "0"
                            ? "Không tuyển"
                            : "Đang tuyển"
                          : "Không xác định"}
                      </td>
                    </tr>
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

            <div className="col-md-6">
              {location.pathname === `/business/job/${jobCode}/edit` ? <EditBusinessJobDetail /> : <div />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessJobDetail;
