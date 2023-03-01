package com.findJob.datn_be.dto.request;

import lombok.Data;

@Data
public class JobTimeRequest2 {
    private Long id;
    private Integer startTimeHour;
    private Integer startTimeMin;
    private Integer endTimeHour;
    private Integer endTimeMin;
    private Integer dayOfWeek;
}
