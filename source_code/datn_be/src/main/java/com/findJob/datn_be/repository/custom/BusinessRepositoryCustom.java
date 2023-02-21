package com.findJob.datn_be.repository.custom;

import com.findJob.datn_be.dto.response.BusinessDescriptionResponse;

import java.util.List;

public interface BusinessRepositoryCustom {
    List<BusinessDescriptionResponse> getAllBusiness();
}
