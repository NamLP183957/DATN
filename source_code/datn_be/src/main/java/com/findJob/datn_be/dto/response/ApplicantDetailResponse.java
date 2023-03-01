package com.findJob.datn_be.dto.response;

import com.findJob.datn_be.model.student.StudentCV;
import lombok.Data;

@Data
public class ApplicantDetailResponse {
    private Long applyId;
    private Long businessId;
    private String studentEmail;
    private Integer applyStatus;

    // job
    private JobResponse jobResponse;

    // student
    private StudentCV studentCV;

    // kinh nghiem lam viec
}
