package com.findJob.datn_be.dto.request;

import com.findJob.datn_be.service.MessageService;
import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;

    public String validate() {
        String message = "";
        if (!email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            message += MessageService.getMessage("singup.email.invalid") + "\n";
        }

        if ("".equals(message)) {
            message = MessageService.getMessage("OK");
        }
        return message;
    }
}
