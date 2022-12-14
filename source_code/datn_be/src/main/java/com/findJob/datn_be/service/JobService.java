package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.JobRequest;
import com.findJob.datn_be.dto.request.JobSearchRequest;
import com.findJob.datn_be.util.ServiceResult;

public interface JobService {
    ServiceResult getAllJob();

    ServiceResult searchJob(JobSearchRequest request);

    ServiceResult getJobDetail(String jobCode);

    ServiceResult applyJob(String email, String jobCode);

    ServiceResult getJobBelongBusiness(String email);

    ServiceResult updateJob(JobRequest jobRequest, String email);
}