package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.PYCRequest;
import com.findJob.datn_be.dto.response.ApplicantDetailResponse;
import com.findJob.datn_be.dto.response.ApplicantResponse;
import com.findJob.datn_be.model.Apply;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.model.job.Job;
import com.findJob.datn_be.model.student.StudentCV;
import com.findJob.datn_be.repository.ApplyRepository;
import com.findJob.datn_be.repository.JobRepository;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.repository.student.StudentCVRepository;
import com.findJob.datn_be.security.email.MailSender;
import com.findJob.datn_be.service.ApplyService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService {
    private final UserAccountRepository userAccountRepository;
    private final ApplyRepository applyRepository;
    private final JobRepository jobRepository;
    private final MailSender mailSender;

    @Override
    public ServiceResult getLstApplicant(String email) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount != null) {
            List<ApplicantResponse> lstApply = applyRepository.getLstApplicant(userAccount.getId());
            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setContent(lstApply);
        } else {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        }
        return serviceResult;
    }

    @Override
    public ServiceResult getApplicantDetail(String busiEmail, String jobCode, Long studentId) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount busiAccount = userAccountRepository.findByEmail(busiEmail);
        if (busiAccount != null) {
            ApplicantDetailResponse detailResponse = applyRepository.getApplicantDetail(busiAccount.getId(), jobCode, studentId);
            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setContent(detailResponse);
        } else {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        }
        return serviceResult;
    }

    @Override
    public ServiceResult approveOrReject(String email, PYCRequest request) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount != null) {
            String validMsg = validatePYCRequest(request, userAccount.getId());
            if (!Constants.OK.equals(validMsg)) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(validMsg);
                return serviceResult;
            } else {
                // Update to DB
                List<Apply> lstApply = applyRepository.getAppliesByStudentCVIdAndJobId(request.getStudentCVId(), request.getJobId());
                if (lstApply != null && lstApply.size() > 0) {
                    Apply apply = lstApply.get(0);
                    apply.setStatus(request.getStatus());
                    apply.setStartTime(new Date());
                    applyRepository.save(apply);
                }
                Job job = jobRepository.findById(request.getJobId()).get();
                String template = "";
                // Send mail to student
                if (request.getStatus() == Constants.CLOSE_APPLY) {
                    template = "reject-job";
                } else if (request.getStatus() == Constants.SUCCESS_APPLY) {
                    template = "approve-job";
                }
                String subject = "Result of apply job";
                Map<String, Object> attributes = new HashMap<>();
                attributes.put("jobName", job.getJobName());
                UserAccount studentAcc = userAccountRepository.getById(request.getStudentCVId());

                try {
                    mailSender.sendMessageHtml(studentAcc.getEmail(), subject, template, attributes);
                    ApplicantDetailResponse detailResponse = applyRepository.getApplicantDetail(userAccount.getId(), job.getJobCode(), request.getStudentCVId());
                    System.out.println(detailResponse.toString());
                    serviceResult.setContent(detailResponse);
                    serviceResult.setStatus(Constants.SUCCESS_RESULT);

                    if (request.getStatus() == Constants.CLOSE_APPLY) {
                        serviceResult.setMessage(MessageService.getMessage("apply.reject.success"));
                    } else if (request.getStatus() == Constants.SUCCESS_APPLY) {
                        serviceResult.setMessage(MessageService.getMessage("apply.approve.success"));
                    }
                } catch (Exception e) {
                    serviceResult.setStatus(Constants.ERROR_RESULT);
                    serviceResult.setMessage(MessageService.getMessage("system.error"));
                    return serviceResult;
                }
            }
        } else {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        }
        return serviceResult;
    }

    private String validatePYCRequest(PYCRequest request, Long businessId) {
        StringBuilder errorMsg = new StringBuilder();
        boolean isValid = true;

        Long jobId = request.getJobId();
        Long studentCVId = request.getStudentCVId();

        List<Job> lstJob = jobRepository.findByIdAndBusinessId(jobId, businessId);
        if (lstJob == null || lstJob.size() == 0) {
            errorMsg.append(MessageService.getMessage("job.not.belong.business") + ", ");
            isValid = false;
        }

        UserAccount userAccount = userAccountRepository.getById(studentCVId);
        if (userAccount == null) {
            errorMsg.append(MessageService.getMessage("user.not.exist") + ", ");
            isValid = false;
        }

        if (isValid) {
            return Constants.OK;
        } else {
            return errorMsg.substring(0, errorMsg.length() - 2);
        }
    }
}
