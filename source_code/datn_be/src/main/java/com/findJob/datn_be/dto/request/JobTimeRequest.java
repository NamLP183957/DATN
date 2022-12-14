package com.findJob.datn_be.dto.request;

import lombok.Data;

import java.time.LocalTime;

@Data
public class JobTimeRequest {
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer dayOfWeek;
}
