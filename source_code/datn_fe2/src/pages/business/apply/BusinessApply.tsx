import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { AppStateType } from '../../../redux/reducers/root-reducer';
import { getApplicants } from '../../../redux/thunks/business/manage-applicant-thunk';
import { ApplicantResponse } from '../../../types/response/ApplicantResponse';
import './BusinessApply.css';

const BusinessApply = () => {
  const dispatch = useDispatch();
  const loading: boolean = useSelector((state: AppStateType) => state.manageApplicant.loading);
  const applicants: Array<ApplicantResponse> = useSelector(
    (state: AppStateType) => state.manageApplicant.applicants
  )
  const errMsg: string = useSelector(
    (state: AppStateType) => state.manageApplicant.errMsg
  )
  const sucMsg: string = useSelector(
    (state: AppStateType) => state.manageApplicant.sucMsg
  )

  useEffect(() => {
    dispatch(getApplicants());
  }, [])

  return (
    <div className="container mt-5">
      <table className='table table-bordered'>
        <thead>
          <tr>
          <th>STT</th>
          <th>Mã công việc</th>
          <th>Tên công việc</th>
          <th>Ứng viên</th>
          <th>Chi tiết</th>
          </tr>
        </thead>
        {applicants.map((applicant, index) => (
          <tbody>
            <td>{index + 1}</td>
            <td>{applicant.jobCode}</td>
            <td>{applicant.jobName}</td>
            <td>{applicant.email}</td>
            <td>
              <Link
                to={`/business/apply/${applicant.jobCode}/${applicant.studentId}`}
                className="btn btn-info"
              >
                <FontAwesomeIcon className='mr-2' icon={faEdit}/>
                Chi tiết
              </Link>
            </td>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default BusinessApply