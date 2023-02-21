package com.findJob.datn_be.service;

import com.findJob.datn_be.model.job.JobCategory;
import com.findJob.datn_be.util.ServiceResult;

public interface JobCategoryService {
    ServiceResult getAllJobCategory();

    ServiceResult updateJobCategory(JobCategory request);

    ServiceResult getBusinessJobCategory(String email);
}
