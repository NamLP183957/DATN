package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.model.job.JobCategory;
import com.findJob.datn_be.repository.JobCategoryRepository;
import com.findJob.datn_be.repository.JobRepository;
import com.findJob.datn_be.service.JobCategoryService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobCategoryServiceImpl implements JobCategoryService {

    private final JobCategoryRepository jobCategoryRepository;

    @Override
    public ServiceResult getAllJobCategory() {
        ServiceResult serviceResult = new ServiceResult();
        List<JobCategory> lstJobCategory = jobCategoryRepository.findAll();
        serviceResult.setStatus(Constants.SUCCESS_RESULT);
        serviceResult.setContent(lstJobCategory);
        return serviceResult;
    }

    @Override
    public ServiceResult updateJobCategory(JobCategory request) {
        ServiceResult serviceResult = new ServiceResult();
        jobCategoryRepository.save(request);
        serviceResult.setStatus(Constants.SUCCESS_RESULT);
        serviceResult.setMessage(MessageService.getMessage("job.category.update.success"));
        return serviceResult;
    }
}
