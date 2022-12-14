package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.JobResponse;

import java.util.List;

public interface JobRepositoryCustom {
    List<JobResponse> getAllJob();

    List<JobResponse> getJobDetail(String jobCode);

    List<JobResponse> getAllJobBelongBusiness(Long businessId);

    List<JobResponse> getAllJobWidthCondition(String condition);
}
