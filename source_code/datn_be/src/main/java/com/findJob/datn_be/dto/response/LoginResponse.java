package com.findJob.datn_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {
    private String email;
    private String token;
    private String roles;

    public LoginResponse(String email, String token, String roles) {
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}
