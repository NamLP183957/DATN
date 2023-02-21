import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCardItem from "../../../components/job-card-item/JobCardItem";
import Spinner from "../../../components/spinner/Spinner";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import { getAppliedJob, getApplyingJob } from "../../../redux/thunks/student/apply-job-thunk";
import { JobResponse } from "../../../types/response/JobResponse";

const Apply = () => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector(
    (state: AppStateType) => state.applyJob.loading
  );
  const applyingJobs: Array<JobResponse> = useSelector(
    (state: AppStateType) => state.applyJob.applyingJobs
  );
  const appliedJobs: Array<JobResponse> = useSelector(
    (state: AppStateType) => state.applyJob.appliedJobs
  );

  useEffect(() => {
    dispatch(getApplyingJob());
    dispatch(getAppliedJob())
  }, []);

  return (
    <div
      className="container pt-2 pb-2 mt-4"
      style={{ width: "800px", border: "0.5px solid black" }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h4>Các công việc đang ứng tuyển</h4>
            <div className="ml-4 mr-4 mt-4">
              {applyingJobs && applyingJobs.length > 0 ? (
                <>
                  {applyingJobs.map((job: JobResponse) => (
                    <JobCardItem
                      job={job}
                      colSize={12}
                      link={"/student/job"}
                      btnName="SHOW MORE"
                    />
                  ))}
                </>
              ) : <div className="alert alert-warning">Không có công việc đang ứng tuyển</div>}
            </div>
          </div>
          <div className="mt-4">
            <h4>Các công việc đã ứng tuyển</h4>
            <div className="ml-4 mr-4 mt-4">
              {appliedJobs && appliedJobs.length > 0 ? (
                <>
                  {appliedJobs.map((job: JobResponse) => (
                    <JobCardItem
                      job={job}
                      colSize={12}
                      link={"/student/job"}
                      btnName="SHOW MORE"
                    />
                  ))}
                </>
              ) : (
                <div className="alert alert-warning">Không có công việc đã ứng tuyển</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Apply;
