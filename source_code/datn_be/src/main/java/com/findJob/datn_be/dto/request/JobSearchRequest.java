package com.findJob.datn_be.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class JobSearchRequest {
    private List<String> lstBusinessName;
    private List<String> lstCategoryName;
    private String jobName;
}
