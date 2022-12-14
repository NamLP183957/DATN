package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.LoginRequest;
import com.findJob.datn_be.util.ServiceResult;

public interface LoginService {
    ServiceResult login(LoginRequest request);
}
