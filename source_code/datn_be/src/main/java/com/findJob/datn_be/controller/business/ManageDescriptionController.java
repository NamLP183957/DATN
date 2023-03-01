package com.findJob.datn_be.controller.business;


import com.findJob.datn_be.security.UserPrincipal;
import com.findJob.datn_be.service.BusinessDescriptionService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('Business')")
@RequestMapping("api/v1/business/manageDescription")
public class ManageDescriptionController {

    private BusinessDescriptionService service;
    
    @GetMapping
    public ResponseEntity<ServiceResult> getBusinessDescription(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(service.getBusinessDescription(userPrincipal.getEmail()));
    }
}
