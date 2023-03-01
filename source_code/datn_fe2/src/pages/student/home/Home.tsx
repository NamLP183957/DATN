import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CheckBox from "../../../components/checkbox/CheckBox";
import MenuCard from "../../../components/menu-card/MenuCard";
import ScrollButton from "../../../components/scroll-button/ScrollButton";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import {
  getAllBusiness,
  getAllJob,
  getAllJobCategory,
  searchJob,
} from "../../../redux/thunks/student/apply-job-thunk";
import { JobSearchRequest } from "../../../types/request/JobSearchRequest";
import { JobResponse } from "../../../types/response/JobResponse";
import { businessName, jobCategory } from "./MenuData";
import { JobCategory } from "../../../types/response/JobCategory";
import { BusinessDescriptionResponse } from "../../../types/response/BusinessDescriptionResponse";

const Home = () => {
  const dispatch = useDispatch();
  const jobs: Array<JobResponse> = useSelector(
    (state: AppStateType) => state.applyJob.jobs
  );
  const loading: boolean = useSelector(
    (state: AppStateType) => state.applyJob.loading
  );
  const jobCategories: Array<JobCategory> = useSelector(
    (state: AppStateType) => state.applyJob.jobCategories
  )
  const businesses: Array<BusinessDescriptionResponse> = useSelector(
    (state: AppStateType) => state.applyJob.businesses
  )

  const [jobSearchRequest, setJobSearchRequest] = useState<JobSearchRequest>({
    lstBusinessName: [],
    lstCategoryName: [],
    jobName: "",
  });

  useEffect(() => {
    dispatch(getAllJob());
    dispatch(getAllJobCategory());
    dispatch(getAllBusiness());
  }, [dispatch]);

  const getJobs = (variables: JobSearchRequest): void => {
    dispatch(searchJob(variables));
  };

  const handleFilters = (
    filters: Array<string> | string,
    category: string
  ): void => {
    const newSearch: any = jobSearchRequest;
    newSearch[category] = filters;

    getJobs({ ...newSearch });
    setJobSearchRequest(newSearch);
  };

  console.log("business: ", businesses)

  return (
    <div className="container d-flex">
      <ScrollButton />
      <div id="sidebar">
        <div className="sidebar-header">
          <h3>Công việc</h3>
        </div>
        <ul className="list-unstyled components">
          <h5>Ngành</h5>
          <li className="active mb-2" id="homeSubmenu">
            <CheckBox
              list={jobCategories}
              handleFilters={(filters) =>
                handleFilters(filters, "lstCategoryName")
              }
            />
          </li>
          <h5>Doanh nghiệp</h5>
          <li className="active mb-2" id="homeSubmenu">
            <CheckBox
              list={businesses}
              handleFilters={(filters) =>
                handleFilters(filters, "lstBusinessName")
              }
            />
          </li>
        </ul>
      </div>

      <div className="row ml-3" style={{width: "1000px"}}>
        <MenuCard
          data={jobs}
          loading={loading}
          itemsPerPage={16}
          link="/student/job"
          searchByData={[
            { label: "Ngành", value: "jobCategory" },
            { label: "Doanh nghiệp", value: "businessName" },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
