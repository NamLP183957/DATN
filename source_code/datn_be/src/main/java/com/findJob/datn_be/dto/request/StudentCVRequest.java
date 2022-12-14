package com.findJob.datn_be.dto.request;

import com.findJob.datn_be.service.MessageService;
import lombok.Data;

@Data
public class StudentCVRequest {
    private String firstName;
    private String surName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String prize;
    private String certificate;
    // học vấn
    private String study;
    private String talent;
    private String weakness;
    private String hobby;
    private String additional;

    public String validate() {
        return MessageService.getMessage("OK");
    }
}
