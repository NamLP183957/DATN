import React, { useEffect, useState } from 'react'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import CheckBox from '../../../components/checkbox/CheckBox';
import MenuCard from '../../../components/menu-card/MenuCard';
import ScrollButton from '../../../components/scroll-button/ScrollButton';
import { AppStateType } from '../../../redux/reducers/root-reducer';
import { getAllJob, searchJob } from '../../../redux/thunks/student/apply-job-thunk';
import { JobSearchRequest } from '../../../types/request/JobSearchRequest';
import { JobResponse } from '../../../types/response/JobResponse';
import { businessName, jobCategory } from './MenuData';

const Home = () => {
  const dispatch = useDispatch();
  const jobs: Array<JobResponse> = useSelector((state: AppStateType) => state.applyJob.jobs);
  const loading: boolean = useSelector((state: AppStateType) => state.applyJob.loading);
  const [jobSearchRequest, setJobSearchRequest] = useState<JobSearchRequest>({
    lstBusinessName: [],
    lstCategoryName: [],
    jobName: ""
  })

  useEffect(() => {
    dispatch(getAllJob());
  }, [])
  
  const getJobs = (variables: JobSearchRequest): void => {
    dispatch(searchJob(variables));
  }

  const handleFilters = (filters: Array<string> | string, category: string): void => {
    const newSearch: any = jobSearchRequest;
    newSearch[category] = filters;

    getJobs({ ...newSearch });
    setJobSearchRequest(newSearch);
  }

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
              list={jobCategory}
              handleFilters={(filters) =>
                handleFilters(filters, "lstCategoryName")
              }
            />
          </li>
          <h5>Doanh nghiệp</h5>
          <li className="active mb-2" id="homeSubmenu">
            <CheckBox
              list={businessName}
              handleFilters={(filters) =>
                handleFilters(filters, "lstBusinessName")
              }
            />
          </li>
        </ul>
      </div>

        <div>
          <MenuCard
            data={jobs}
            loading={loading}
            itemsPerPage={10}
            searchByData={[
              { label: "Ngành", value: "jobCategory" },
              { label: "Doanh nghiệp", value: "businessName" },
            ]}
          />
        </div>
    </div>
  );
}

export default Home