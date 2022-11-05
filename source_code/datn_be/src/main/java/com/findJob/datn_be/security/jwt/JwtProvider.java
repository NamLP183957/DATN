package com.findJob.datn_be.security.jwt;

import com.findJob.datn_be.exception.JwtAuthenticationException;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public interface JwtProvider {
    public String createToken(String username, String role);
    public boolean validateToken(String token) throws JwtAuthenticationException;
    public Authentication getAuthentication(String token);
    public String getUsername(String token);
    public String resolveToken(HttpServletRequest request);
}
