import { type } from "os";
import React, { FC } from "react";
import { JobResponse } from "../../types/response/JobResponse";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
type PropsType = {
  job: JobResponse;
  colSize: number;
  link: string;
  btnName: string;
};

const JobCardItem: FC<PropsType> = ({
  job,
  colSize,
  link,
  btnName,
}) => {
  return (
    <div key={job.id} className={`col-lg-${colSize} mb-2`}>
      <Link to={`${link}/${job.jobCode}`} style={{ color: "black" }}>
        <div className="row pt-2" style={{ border: "0.5px solid black" }}>
          <div className="col-lg-2">
            <div
              style={{
                height: "92px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {job.businessLogoLink ? (
                <LazyLoadImage
                  effect="blur"
                  style={{ width: "70px" }}
                  src={job.businessLogoLink}
                />
              ) : (
                <LazyLoadImage
                  effect="blur"
                  style={{ width: "70px" }}
                  src="https://i.ibb.co/LDTRK9Z/job.png"
                />
              )}
            </div>
          </div>
          <div className="col-lg-9 pt-1">
            <div className="job-name">
              <h3>{job.jobName}</h3>
            </div>
            <div className="job-description mt-1">
              <p>{job.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCardItem;
