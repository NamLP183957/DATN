package com.findJob.datn_be.service;

import com.findJob.datn_be.util.ServiceResult;

public interface BusinessDescriptionService {
    ServiceResult getAllBusiness(String email);

    ServiceResult getBusinessDescription(String email);
}
