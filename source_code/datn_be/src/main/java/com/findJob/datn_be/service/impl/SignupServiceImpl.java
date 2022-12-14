package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.SignupForm;
import com.findJob.datn_be.model.Role;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.security.email.MailSender;
import com.findJob.datn_be.security.jwt.JwtProvider;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.service.SignupService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.mail.MessagingException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {
    private final MailSender mailSender;
    private final JwtProvider jwtProvider;
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final UserAccountRepository userAccountRepository;

    @Value("${hostname}")
    private String hostname;

    @Transactional
    @Override
    public ServiceResult singupUser(SignupForm signupForm) {
        ServiceResult serviceResult = new ServiceResult();
        String validateMsg = signupForm.validate();
        if (!validateMsg.equals("OK")) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(validateMsg);
        } else {
            UserAccount userAccountDB = userAccountRepository.findByEmail(signupForm.getEmail());
            if (userAccountDB != null) {
                serviceResult.setMessage(MessageService.getMessage("singup.email.exist"));
                serviceResult.setStatus(Constants.ERROR_RESULT);
                return serviceResult;
            }

            UserAccount userAccount = new UserAccount();
            userAccount.setEmail(signupForm.getEmail());
            userAccount.setPassword(passwordEncoder.encode(signupForm.getPassword()));
//            userAccount.setRoles(Collections.singleton(Role.valueOf(signupForm.getRole())));
            userAccount.setRoles(Collections.singleton(Role.valueOf("Student")));
            userAccount.setActive(false);
            userAccount.setActivationCode(UUID.randomUUID().toString());
            userAccountRepository.save(userAccount);

            String subject = "Activation code";
            String template = "signup-templates";
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("signupUrl", "http://" + hostname + "/activate/" + userAccount.getActivationCode());

            try {
                mailSender.sendMessageHtml(userAccount.getEmail(), subject, template, attributes);
            } catch (Exception e) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(MessageService.getMessage("system.error"));
                return serviceResult;
            }
            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setMessage(MessageService.getMessage("signup.success"));
        }

        return serviceResult;
    }

    @Override
    public ServiceResult activateEmailCode(String code) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByActivationCode(code);

        if (userAccount == null) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("signup.activate.invalid.code"));
        } else {
            userAccount.setActivationCode(null);
            userAccount.setActive(true);
            userAccountRepository.save(userAccount);

            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setMessage(MessageService.getMessage("singup.activate.success"));
        }

        return serviceResult;
    }
}
