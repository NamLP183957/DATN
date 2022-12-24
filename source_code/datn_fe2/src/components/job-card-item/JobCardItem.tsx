import { type } from 'os'
import React, { FC } from 'react'
import { JobResponse } from '../../types/response/JobResponse'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
type PropsType = {
    job: JobResponse,
    colSize: number,
    link: string,
    btnName: string,
    preUrl: string
}

const JobCardItem: FC<PropsType> = ({job, colSize, link, btnName, preUrl}) => {
  return (
    <div key={job.id} className={`col-lg-${colSize} row`}>
        <Link to={`${preUrl}/job/${job.jobCode}`}>
            <div className='col-lg-3'>
                <div style={{height: "92px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <LazyLoadImage
                        effect="blur"
                        style={{width: "80px", marginTop: "20px"}}
                        src={job.businessLogoLink}/>
                </div>
            </div>
            <div className='col-lg-9'>
                <div className='job-name'>
                    <h3>${job.jobName}</h3>
                </div>
                <div className='job-description'>
                    <p>${job.description}</p>
                </div>
            </div>
        </Link>
            {/* <div className="card mb-5" style={{height: "320px"}}>
                
                <div className="card-body text-center">
                    <StarRating perfumeRating={perfume.perfumeRating}/>
                    <h6>{perfume.perfumeTitle}</h6>
                    <h6>{perfume.perfumer}</h6>
                    <h6><span>${perfume.price}</span>.00</h6>
                </div>
                <div className="text-center align-items-end mb-3">
                    <Link to={`${link}/${perfume.id}`}>
                        <span className="btn btn-dark">{btnName}</span>
                    </Link>
                </div>
            </div> */}
    </div>
    );
};

export default JobCardItem