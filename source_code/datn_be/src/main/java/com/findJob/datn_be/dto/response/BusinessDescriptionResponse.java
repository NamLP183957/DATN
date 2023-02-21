package com.findJob.datn_be.dto.response;

import lombok.Data;

@Data
public class BusinessDescriptionResponse {
    private Long id;

    private String name;
    private String description;
    private String logoFileName;

    private Long businessId;
}
