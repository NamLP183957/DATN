package com.findJob.datn_be.dto.response;

import lombok.Data;

@Data
public class ApplicantResponse {
    private Long applyId;
    private Long studentId;
    private Long jobId;
    private Long businessId;

    private String email;
    private String jobCode;
    private String jobName;
}
