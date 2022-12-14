package com.findJob.datn_be.controller.student;

import com.findJob.datn_be.dto.request.StudentCVRequest;
import com.findJob.datn_be.model.student.StudentCV;
import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.StudentCVSerivce;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Student')")
@RequestMapping("api/v1/student/cv")
public class CVController {

    private final StudentCVSerivce service;

    @PostMapping
    public ResponseEntity<ServiceResult> updateCV(@RequestBody StudentCVRequest request,
                                                  @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(service.updateCV(request, userPrincipal.getEmail()));
    }

    @GetMapping
    public ResponseEntity<ServiceResult> getCV(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(service.getCV(userPrincipal.getEmail()));
    }

    @PostMapping("/avatar")
    public ResponseEntity<ServiceResult> updateData(@RequestPart(name = "file")MultipartFile file,
                                                    @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(service.updateAvatar(file, userPrincipal.getEmail()));
    }
}
