package com.findJob.datn_be.controller.business;

import com.findJob.datn_be.dto.request.PYCRequest;
import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.ApplyService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Business')")
@RequestMapping("api/v1/business/manageApplicant")
public class ManageApplicant {
    private final ApplyService applyService;

    @GetMapping
    public ResponseEntity<ServiceResult> getLstApplicant(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(applyService.getLstApplicant(userPrincipal.getEmail()));
    }

    @PostMapping
    public ResponseEntity<ServiceResult> approveOrRejectApplicant(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                                  @RequestBody PYCRequest request) {
        return ResponseEntity.ok(applyService.approveOrReject(userPrincipal.getEmail(), request));
    }
}
