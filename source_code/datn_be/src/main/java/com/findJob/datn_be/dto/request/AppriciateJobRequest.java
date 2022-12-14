package com.findJob.datn_be.dto.request;

import com.findJob.datn_be.service.MessageService;
import lombok.Data;

@Data
public class AppriciateJobRequest {
    private String content;
    private Double rate;
    private Long jobId;

    public AppriciateJobRequest(String content, Double rate) {
        this.content = content;
        this.rate = rate;
    }

    public String isValid() {
        boolean valid = true;
        StringBuilder msg = new StringBuilder();

        if (rate < 0 || rate > 5) {
            msg.append("appriciate.rate.invalid");
            valid = false;
        }

        if (!valid) {
            return MessageService.getMessage("OK");
        }

        else return msg.toString();
    }
}
