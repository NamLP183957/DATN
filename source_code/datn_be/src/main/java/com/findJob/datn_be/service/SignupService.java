package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.SignupForm;
import com.findJob.datn_be.util.ServiceResult;

public interface SignupService {
    ServiceResult singupUser(SignupForm signupForm);

    ServiceResult activateEmailCode(String code);
}
