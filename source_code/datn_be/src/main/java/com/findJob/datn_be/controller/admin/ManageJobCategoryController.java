package com.findJob.datn_be.controller.admin;

import com.findJob.datn_be.model.job.JobCategory;
import com.findJob.datn_be.service.JobCategoryService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Admin')")
@RequestMapping("api/v1/admin/manageJobCategory")
public class ManageJobCategoryController {
    private final JobCategoryService jobCategoryService;

    @GetMapping
    public ResponseEntity<ServiceResult> getAllJobCategory() {
        return ResponseEntity.ok(jobCategoryService.getAllJobCategory());
    }

    @PostMapping
    public ResponseEntity<ServiceResult> updateJobCategory(@RequestBody JobCategory request) {
        return ResponseEntity.ok(jobCategoryService.updateJobCategory(request));
    }
}
