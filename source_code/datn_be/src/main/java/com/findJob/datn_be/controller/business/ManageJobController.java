package com.findJob.datn_be.controller.business;

import com.findJob.datn_be.dto.request.JobRequest;
import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.JobService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Business')")
@RequestMapping("api/v1/business/manageJob")
public class ManageJobController {
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ServiceResult> getJobBelongBusiness(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(jobService.getJobBelongBusiness(userPrincipal.getEmail()));
    }

    @GetMapping("/{jobCode}")
    public ResponseEntity<ServiceResult> getJobByJobCode(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                         @PathVariable(name = "jobCode")String jobCode) {
        return ResponseEntity.ok(jobService.getJobDetail(jobCode));
    }

    @PostMapping
    public ResponseEntity<ServiceResult> updateJob(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                   @RequestBody JobRequest jobRequest) {
        return ResponseEntity.ok(jobService.updateJob(jobRequest, userPrincipal.getEmail()));
    }


}
