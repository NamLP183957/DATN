import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from '../../../components/checkbox/CheckBox';
import MenuCard from '../../../components/menu-card/MenuCard';
import ScrollButton from '../../../components/scroll-button/ScrollButton';
import { AppStateType } from '../../../redux/reducers/root-reducer';
import { getBusinessJobCategory, getBusinessJobs } from '../../../redux/thunks/business/manage-job-thunk';
import { JobSearchRequest } from '../../../types/request/JobSearchRequest';
import { JobCategory } from '../../../types/response/JobCategory';
import { JobResponse } from '../../../types/response/JobResponse';
import './BusinessHome.css';

const BusinessHome = () => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector((state: AppStateType) => state.manageJob.loading);
  const jobs: Array<JobResponse> = useSelector(
    (state: AppStateType) => state.manageJob.jobs
  )
  const jobCategories: Array<JobCategory> = useSelector((state: AppStateType) => state.manageJob.jobCats);
  const [jobSearchRequest, setJobSearchRequest] = useState<JobSearchRequest>({
    lstBusinessName: [],
    lstCategoryName: [],
    jobName: "",
  });

  const handleFilters = (
    filters: Array<string> | string,
    category: string
  ): void => {
    const newSearch: any = jobSearchRequest;
    newSearch[category] = filters;

    // getJobs({ ...newSearch });
    setJobSearchRequest(newSearch);
  }

  useEffect(() => {
    dispatch(getBusinessJobCategory());
    dispatch(getBusinessJobs())
  }, [])
  

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
          {/* <h5>Doanh nghiệp</h5>
          <li className="active mb-2" id="homeSubmenu">
            <CheckBox
              list={businesses}
              handleFilters={(filters) =>
                handleFilters(filters, "lstBusinessName")
              }
            />
          </li> */}
        </ul>
      </div>

      <div className="row ml-3" style={{width: "1000px"}}>
        <MenuCard
          data={jobs}
          loading={loading}
          itemsPerPage={16}
          searchByData={[
            { label: "Ngành", value: "jobCategory" },
            { label: "Doanh nghiệp", value: "businessName" },
          ]}
          link="/business/job"
        />
      </div>
    </div>
  )
}

export default BusinessHome