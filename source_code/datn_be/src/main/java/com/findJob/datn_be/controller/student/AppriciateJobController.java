package com.findJob.datn_be.controller.student;

import com.findJob.datn_be.dto.request.AppriciateJobRequest;
import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.AppriciateService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Student')")
@RequestMapping("api/v1/student/appriciateJob")
public class AppriciateJobController {
    private final AppriciateService appriciateService;

    @PostMapping
    public ResponseEntity<ServiceResult> appriciateJob(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                       @RequestPart(name = "file") MultipartFile file,
                                                       @RequestPart(name = "appriciate")AppriciateJobRequest request) {
        return ResponseEntity.ok(appriciateService.appriciateJob(userPrincipal.getEmail(), request.getJobId(), request, file));
    }
}
