package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.AppriciateJobRequest;
import com.findJob.datn_be.util.ServiceResult;
import org.springframework.web.multipart.MultipartFile;

public interface AppriciateService {
    ServiceResult appriciateJob(String email, Long jobId, AppriciateJobRequest request, MultipartFile file);
}
