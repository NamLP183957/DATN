package com.findJob.datn_be.dto.request;

import lombok.Data;

@Data
public class PYCRequest {
    private Long jobId;
    private Long studentCVId;
    private Integer status; // 0: tu choi, 1: that bai
}
