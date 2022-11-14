package com.findJob.datn_be.mapper;

import com.findJob.datn_be.dto.request.SignupForm;
import com.findJob.datn_be.model.UserAccount;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAccountMapper {
    private ModelMapper modelMapper;

    UserAccount convertToEntity(SignupForm signupForm) {
        UserAccount userAccount = new UserAccount();
        userAccount.setEmail(signupForm.getEmail());

        return userAccount;
    }
}
