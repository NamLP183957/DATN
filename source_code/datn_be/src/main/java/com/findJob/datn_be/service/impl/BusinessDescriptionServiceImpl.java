package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.response.BusinessDescriptionResponse;
import com.findJob.datn_be.model.business.BusinessDescription;
import com.findJob.datn_be.repository.BusinessRepository;
import com.findJob.datn_be.service.BusinessDescriptionService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessDescriptionServiceImpl implements BusinessDescriptionService {

    private final BusinessRepository businessRepository;
    @Override
    public ServiceResult getAllBusiness(String email) {
        ServiceResult serviceResult = new ServiceResult();
        List<BusinessDescriptionResponse> lstBusiness = businessRepository.getAllBusiness();
        serviceResult.setStatus(Constants.SUCCESS_RESULT);
        serviceResult.setContent(lstBusiness);
        return serviceResult;
    }

    @Override
    public ServiceResult getBusinessDescription(String email) {
        ServiceResult serviceResult = new ServiceResult();
        BusinessDescriptionResponse businessDescriptionResponse = null;
        try {
            businessDescriptionResponse = businessRepository.getBusinesByEmail(email);
            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setContent(businessDescriptionResponse);
            return serviceResult;
        } catch (Exception e) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(e.getMessage());
            return serviceResult;
        }

    }
}
