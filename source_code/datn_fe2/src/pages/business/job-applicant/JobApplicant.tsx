import { faCheck, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import {
  approveApplicant,
  getApplicantDetail,
  rejectApplicant,
} from "../../../redux/thunks/business/manage-applicant-thunk";
import { ApplicantDetailResponse } from "../../../types/response/ApplicantDetailResponse";
import { JobResponse } from "../../../types/response/JobResponse";
import { JobTimeResponse } from "../../../types/response/JobTimeReponse";
import { Constants } from "../../../utils/constants/constants";
import { PYCRequest } from "../../../types/request/PYCRequest";

const JobApplicant = () => {
  const dispatch = useDispatch();
  const { jobCode, studentId } = useParams();

  // console.log("jobCode: " + jobCode + ", studentId: " + studentId);

  const loading: boolean = useSelector(
    (state: AppStateType) => state.manageApplicant.loading
  );
  const applicant: Partial<ApplicantDetailResponse> = useSelector(
    (state: AppStateType) => state.manageApplicant.applicant
  );
  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageApplicant.errMsg
  );
  const sucMsg: string = useSelector(
    (state: AppStateType) => state.manageApplicant.sucMsg
  );

  const {
    applyId,
    businessId,
    studentEmail,
    applyStatus,

    jobResponse,
    studentCV,
  } = applicant;

  useEffect(() => {
    if (jobCode && studentId) {
      dispatch(getApplicantDetail(jobCode, Number(studentId)));
    }
  }, []);

  // console.log("applicant: ", applicant);

  const getTimeVal = (timeMap: JobTimeResponse[]) => {
    if (timeMap.length <= 0) {
      return "Không có";
    } else {
      return timeMap[0].startTime + " - " + timeMap[0].endTime;
    }
  };

  const jobTimeVal = () => {
    const jobTimes: JobTimeResponse[] = jobResponse?.lstJobTime
      ? jobResponse?.lstJobTime
      : [];
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

  const onApproveClick = (): void => {
    const req: PYCRequest = {
      jobId: Number(jobResponse?.id),
      studentCVId: Number(studentCV?.id),
      status: 1,
    };

    console.log("req: ", req);
    dispatch(approveApplicant(req));
  };

  const onRejectClick = (): void => {
    const req: PYCRequest = {
      jobId: Number(jobResponse?.id),
      studentCVId: Number(studentCV?.id),
      status: 0,
    };
    console.log("req: ", req);
    dispatch(rejectApplicant(req));
  };

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row mt-5">
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
          </div>
          <div className="row mt-2 mb-5">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-9">
                  <h4>{jobResponse ? jobResponse.jobName : ""}</h4>
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
                        {jobResponse?.status
                          ? jobResponse?.status == "0"
                            ? "Không tuyển"
                            : "Đang tuyển"
                          : "Không xác định"}
                      </td>
                    </tr>
                    <tr>
                      <td>Mã công việc: </td>
                      <td>{jobResponse?.jobCode}</td>
                    </tr>
                    <tr>
                      <td>Mô tả: </td>
                      <td>{jobResponse?.description}</td>
                    </tr>
                    <tr>
                      <td>Ngành: </td>
                      <td>{jobResponse?.jobCategoryName}</td>
                    </tr>
                    <tr>
                      <td>Yêu cầu: </td>
                      <td>{jobResponse?.requirement}</td>
                    </tr>
                    <tr>
                      <td>Địa điểm: </td>
                      <td>{jobResponse?.workAddress}</td>
                    </tr>
                    <tr>
                      <td>Mức lương: </td>
                      <td>{jobResponse?.salary} VND</td>
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

            <div className="col-md-5 ml-5">
              <div className="row">
                <div className="col-md-12">
                  <h4>
                    Ứng viên:
                    <span> </span>
                    {applyStatus == 2
                      ? "Đang ứng tuyển"
                      : applyStatus == 1
                      ? "Đã được tuyển"
                      : "Đã bị từ chối"}
                  </h4>
                </div>
              </div>

              <div
                className="row mt-4"
                style={{ borderTop: "1px solid black" }}
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Email:</td>
                      <td>{studentEmail}</td>
                    </tr>
                    <tr>
                      <td>Họ tên: </td>
                      <td>{`${studentCV?.firstName} ${studentCV?.surName} ${studentCV?.lastName}`}</td>
                    </tr>
                    <tr>
                      <td>Số điện thoại: </td>
                      <td>{studentCV?.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td>Chuyên ngành: </td>
                      <td>{studentCV?.study}</td>
                    </tr>
                    <tr>
                      <td>Điểm mạnh: </td>
                      <td>{studentCV?.talent}</td>
                    </tr>
                    <tr>
                      <td>Điểm yếu: </td>
                      <td>{studentCV?.weakness}</td>
                    </tr>
                    <tr>
                      <td>Giải thưởng: </td>
                      <td>{studentCV?.prize}</td>
                    </tr>
                    <tr>
                      <td>Sở thích: </td>
                      <td>{studentCV?.hobby}</td>
                    </tr>
                    <tr>
                      <td>Nơi ở: </td>
                      <td>{studentCV?.address}</td>
                    </tr>
                    <tr>
                      <td>Bổ sung: </td>
                      <td>{studentCV?.additional}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-success" onClick={onApproveClick}>
                  <FontAwesomeIcon className="mr-2" icon={faCheck} />
                  Chấp nhận
                </button>
                <button className="btn btn-danger ml-2" onClick={onRejectClick}>
                  <FontAwesomeIcon className="mr-2" icon={faRemove} />
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobApplicant;
