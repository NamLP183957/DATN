package com.findJob.datn_be.util;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ServiceResult {
    private int status;
    private String message;
    private Object content;
}
