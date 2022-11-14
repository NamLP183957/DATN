package com.findJob.datn_be.controller;

import com.findJob.datn_be.dto.request.SignupForm;
import com.findJob.datn_be.service.SignupService;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/signup")
public class SignupController {

    private final SignupService signupService;

    @PostMapping
    public ResponseEntity<ServiceResult> signupUser(@RequestBody SignupForm signupForm) {
        return ResponseEntity.ok(signupService.singupUser(signupForm));
    }

    @GetMapping("/activate/{code}")
    public ResponseEntity<ServiceResult> activateEmailCode(@PathVariable String code) {
        return ResponseEntity.ok()
    }
}
