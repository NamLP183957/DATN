package com.findJob.datn_be.dto.request;

import com.findJob.datn_be.model.Role;
import com.findJob.datn_be.service.MessageService;
import com.google.common.base.Enums;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class SignupForm {
    private String email;
    private String password;
    private String confirmPassword;

    // Student, Business, Admin
//    private String role;

    private MessageService messageService = new MessageService();

    public String validate() {
        String message = "";
        if (!email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            message += messageService.getMessage("singup.email.invalid") + "\n";
        }
        if (!password.equals(confirmPassword)) {
            message += messageService.getMessage("signup.password.not-match") + "\n";
        }
        if (password.length() < 8 || password.length() > 15) {
            message += messageService.getMessage("signup.password.invalid.length") + "\n";
        }
//        if (!Enums.getIfPresent(Role.class, role).isPresent()) {
//            message += messageService.getMessage("signup.user-type.invalid") + "\n";
//        }


        if (message.equals("")) {
            message = messageService.getMessage("signup.validate.ok");
        }

        return message;
    }
}
