package com.findJob.datn_be.controller.student;

import com.findJob.datn_be.dto.request.ApplyRequest;
import com.findJob.datn_be.dto.request.JobSearchRequest;
import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.JobService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Student')")
@RequestMapping("api/v1/student/applyJob")
public class ApplyJobController {

    private final JobService jobService;

    @GetMapping
    // @TODO: Nghien cuu thuat toan phu hop voi ung vien
    public ResponseEntity<ServiceResult> getAllJob(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(jobService.getAllJob());
    }

    @PostMapping("/search")
    public ResponseEntity<ServiceResult> searchjob(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                   @RequestBody JobSearchRequest request) {
        return ResponseEntity.ok(jobService.searchJob(request));
    }

    @GetMapping("/{jobCode}")
    public ResponseEntity<ServiceResult> getJobDetail(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                      @PathVariable("jobCode")String jobCode) {
        return ResponseEntity.ok(jobService.getJobDetail(jobCode));
    }

    @PostMapping()
    public ResponseEntity<ServiceResult> applyJob(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                  @RequestBody ApplyRequest req) {
        System.out.println("jobCode: " + req.getJobCode() + "/");
        return ResponseEntity.ok(jobService.applyJob(userPrincipal.getEmail(), req.getJobCode()));
    }
}
