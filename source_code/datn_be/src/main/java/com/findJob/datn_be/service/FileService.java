package com.findJob.datn_be.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    public String uploadFile(MultipartFile file);
    public Object readFile(String fileName);
}
