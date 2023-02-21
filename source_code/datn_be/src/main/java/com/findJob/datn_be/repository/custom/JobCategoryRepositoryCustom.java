package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.model.job.JobCategory;

import java.util.List;

public interface JobCategoryRepositoryCustom {
    List<JobCategory> getBusinessJobCategory(Long businessId);
}
