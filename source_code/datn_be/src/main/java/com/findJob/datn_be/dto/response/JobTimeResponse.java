package com.findJob.datn_be.dto.response;

import lombok.Data;

@Data
public class JobTimeResponse {
    private String id;
    private String startTime;
    private String endTime;
    private String dayOfWeek;
}
