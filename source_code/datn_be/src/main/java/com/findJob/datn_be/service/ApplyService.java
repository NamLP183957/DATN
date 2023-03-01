package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.PYCRequest;
import com.findJob.datn_be.util.ServiceResult;

public interface ApplyService {

    ServiceResult getLstApplicant(String email);

    ServiceResult getApplicantDetail(String busiEmail, String jobCode, Long studentId);

    ServiceResult approveOrReject(String email, PYCRequest request);
}
