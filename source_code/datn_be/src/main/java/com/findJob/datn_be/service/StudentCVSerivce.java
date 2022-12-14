package com.findJob.datn_be.service;

import com.findJob.datn_be.dto.request.StudentCVRequest;
import com.findJob.datn_be.util.ServiceResult;
import org.springframework.web.multipart.MultipartFile;

public interface StudentCVSerivce {
    ServiceResult updateCV(StudentCVRequest request, String userEmail);

    ServiceResult getCV(String email);

    ServiceResult updateAvatar(MultipartFile file, String email);
}
