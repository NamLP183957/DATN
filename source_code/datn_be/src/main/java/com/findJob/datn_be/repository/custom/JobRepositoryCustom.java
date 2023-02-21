package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.request.JobSearchRequest;
import com.findJob.datn_be.dto.response.JobResponse;

import java.util.List;

public interface JobRepositoryCustom {
    List<JobResponse> getAllJob();

    List<JobResponse> getApplyingJob(Long studentId);

    List<JobResponse> getAppliedJob(Long studentId);

    List<JobResponse> getJobDetail(String jobCode, Long studentId);

    List<JobResponse> getBusinessJobDetail(String jobCode);

    List<JobResponse> getAllJobBelongBusiness(Long businessId);

    List<JobResponse> getAllJobWidthCondition(String condition);

    List<JobResponse> searchJob(JobSearchRequest request);

    List<JobResponse> searchBusinessJob(JobSearchRequest request, Long businessId);
}
