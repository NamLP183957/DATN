package com.findJob.datn_be.dto.request;

import com.findJob.datn_be.dto.response.JobTimeResponse;
import com.findJob.datn_be.model.job.JobTime;
import com.findJob.datn_be.service.MessageService;
import lombok.Data;

import java.util.List;

@Data
public class JobRequest {
    private Long id;
    private String jobCode;
    private String jobName;
    private String description;
    private String requirement;
    private String workAddress;
    // Tính bằng VND
    private Integer salary;
    private Integer status;
    private String note;

    // Tính bằng ngày
    private Integer rangeDay;
    private Long jobCategoryId;
    private Long businessId;

    private List<JobTimeRequest> lstJobTime;

    public String validate() {
        boolean valid = true;
        StringBuilder msg = new StringBuilder();
        // validate job time
        if (lstJobTime == null || lstJobTime.size() == 0) {
            msg.append(MessageService.getMessage("job.lsgJobTime.required") + "\n");
            valid = false;
        }

        if (lstJobTime != null && lstJobTime.size() > 0) {
            for (JobTimeRequest jobTime : lstJobTime) {
                if (jobTime.getDayOfWeek() < 2 || jobTime.getDayOfWeek() > 7) {
                    msg.append(MessageService.getMessage("job.dayOfWeek.invalid") + "\n");
                    valid = false;
                }
                if (jobTime.getStartTime().isAfter(jobTime.getEndTime())) {
                    msg.append(MessageService.getMessage("job.jobTime.startTime.endTime.invalid"));
                }
            }
        }

        if (valid) {
            return MessageService.getMessage("OK");
        }

        return msg.toString();
    }
}
