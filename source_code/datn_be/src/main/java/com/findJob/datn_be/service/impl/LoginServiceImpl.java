package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.LoginRequest;
import com.findJob.datn_be.dto.response.LoginResponse;
import com.findJob.datn_be.model.Role;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.security.jwt.JwtProvider;
import com.findJob.datn_be.service.LoginService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.RoleUtil;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {
    private final AuthenticationManager authenticationManager;
    private final UserAccountRepository userAccountRepository;
    private final JwtProvider jwtProvider;

    @Override
    public ServiceResult login(LoginRequest request) {
        ServiceResult serviceResult = new ServiceResult();
        String validMessage = request.validate();
        if (!MessageService.getMessage("OK").equals(validMessage)) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(validMessage);
        } else {
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
                );
                UserAccount userAccount = userAccountRepository.findByEmail(request.getEmail());
                String roles = RoleUtil.convertRoleToString(userAccount.getRoles());
                String token = jwtProvider.createToken(request.getEmail(), roles);
                LoginResponse loginResponse = new LoginResponse(request.getEmail(), token, roles);

                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setMessage(MessageService.getMessage("login.success"));
                serviceResult.setContent(loginResponse);
            } catch (Exception e) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(MessageService.getMessage("login.fail"));
                return serviceResult;
            }

        }
        return serviceResult;
    }
}
