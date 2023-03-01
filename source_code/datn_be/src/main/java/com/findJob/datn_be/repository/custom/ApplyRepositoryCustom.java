package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.ApplicantDetailResponse;
import com.findJob.datn_be.dto.response.ApplicantResponse;
import com.findJob.datn_be.dto.response.JobResponse;

import java.util.List;

public interface ApplyRepositoryCustom {
    List<ApplicantResponse> getLstApplicant(Long businessId);

    ApplicantDetailResponse getApplicantDetail(Long businessId, String jobCode, Long studentId);
}
