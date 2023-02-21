package com.findJob.datn_be.dto.response;

import com.findJob.datn_be.model.job.JobTime;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JobResponse {
    private String id;

    private String jobCode;
    private String jobName;
    private String description;
    private String requirement;
    private String workAddress;
    // Tính bằng VND
    private String salary;
    private String status;
    private String descFileName;
    private String note;

    // Tính bằng ngày
    private String rangeDay;
    private String jobCategoryId;
    private String businessId;

    private String jobCategoryName;
    private String businessLogoLink;

    private Integer applyStatus;

    private List<JobTimeResponse> lstJobTime;
}
