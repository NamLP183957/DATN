package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.JobRequest;
import com.findJob.datn_be.dto.request.JobSearchRequest;
import com.findJob.datn_be.dto.response.JobResponse;
import com.findJob.datn_be.mapper.JobMappper;
import com.findJob.datn_be.model.Apply;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.model.job.Job;
import com.findJob.datn_be.model.job.JobTime;
import com.findJob.datn_be.repository.ApplyRepository;
import com.findJob.datn_be.repository.JobRepository;
import com.findJob.datn_be.repository.JobTimeRepository;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.security.email.MailSender;
import com.findJob.datn_be.service.JobService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final UserAccountRepository userAccountRepository;
    private final ApplyRepository applyRepository;
    private final MailSender mailSender;
    private final JobTimeRepository jobTimeRepository;
    private final JobMappper jobMappper;

    @Override
    public ServiceResult getAllJob() {
        ServiceResult serviceResult = new ServiceResult();
        List<JobResponse> lstJobResponse = jobRepository.getAllJob();
        serviceResult.setStatus(Constants.SUCCESS_RESULT);
        serviceResult.setContent(lstJobResponse);
        return serviceResult;
    }

    @Override
    public ServiceResult searchJob(JobSearchRequest request) {
        ServiceResult serviceResult = new ServiceResult();
        List<JobResponse> lstJobResponse = jobRepository.getAllJob();
        List<String> lstBusinessName = request.getLstBusinessName();
        List<String> lstCategoryName = request.getLstCategoryName();
        String jobName = request.getJobName();

        if (lstBusinessName != null && lstBusinessName.size() > 0) {

        }

        if (lstCategoryName != null && lstCategoryName.size() > 0) {

        }

        if (jobName != null && "".equals(jobName)) {

        }
        return serviceResult;
    }

    @Override
    public ServiceResult getJobDetail(String jobCode) {
        ServiceResult serviceResult = new ServiceResult();
        List<JobResponse> lstJobResponse = jobRepository.getJobDetail(jobCode);
        serviceResult.setStatus(Constants.SUCCESS_RESULT);
        if (lstJobResponse != null && lstJobResponse.size() > 0) {
            serviceResult.setContent(lstJobResponse.get(0));
        }

        return serviceResult;
    }

    @Override
    @Transactional
    public ServiceResult applyJob(String email, String jobCode) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        List<Job> jobs = jobRepository.findByJobCodeAndStatus(jobCode, Constants.OPEN_JOB);
        if (userAccount == null) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        } else {
            if (jobs == null || jobs.size() == 0) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(MessageService.getMessage("job.code.invalid"));
                return serviceResult;
            }
            Job job = jobs.get(0);
            UserAccount businessAcc = userAccountRepository.findById(job.getBusinessId()).get();
            List<JobTime> lstApplyingJobTime = jobTimeRepository.findByJobId(job.getId());
            // Kiem tra xem sinh vien co dang o trong mot cong viec nao khong
            // Neu co thi kiem tra thoi gian cua cong viec apply co trung voi cong viec hien tai hay khong
            String validTimeJob = isValidTimeJob(userAccount.getId(), lstApplyingJobTime);
            if (!Constants.OK.equals(validTimeJob)) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(validTimeJob);
            } else {
                Apply apply = new Apply(userAccount.getId(), job.getId(), new Date(), Constants.APPLYING);
                applyRepository.save(apply);
                System.out.println("save successfull");
                 // Gui mail thong bao cho doanh nghiep
                String subject = "FIND JOB - ỨNG VIÊN ỨNG TUYỂN";
                String template = "apply-job";
                Map<String, Object> attributes = new HashMap<>();
                attributes.put("applicant", userAccount.getEmail());
                attributes.put("jobName", job.getJobCode() + " - " + job.getJobName());

                try {
                    System.out.println("before send email");
                    mailSender.sendMessageHtml(businessAcc.getEmail(), subject, template, attributes);
                    System.out.println("after send email");
                } catch (Exception e) {
                    serviceResult.setStatus(Constants.ERROR_RESULT);
                    serviceResult.setMessage(MessageService.getMessage("system.error"));
                    return serviceResult;
                }
                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setMessage(MessageService.getMessage("job.apply.success"));
            }
        }

        return serviceResult;
    }

    private String isValidTimeJob(Long studentId, List<JobTime> applyingJobtime) {
        // @TODO
        List<Apply> lstDoingApply = applyRepository.getAppliesByStudentCVIdAndStatus(studentId, Constants.SUCCESS_APPLY);
        if (lstDoingApply != null && lstDoingApply.size() > 0) {
            for (Apply doingApply : lstDoingApply) {
                Job doingJob = jobRepository.findById(doingApply.getJobId()).get();
                if (doingJob != null) {
                    List<JobTime> doingJobTime = jobTimeRepository.findByJobId(doingJob.getId());
                    if (!noConflictJobTime(doingJobTime, applyingJobtime)) {
                        return MessageService.getMessage("job.apply.fail.jobtime.invalid");
                    }
                }
            }
        }
        return Constants.OK;
    }

    private boolean noConflictJobTime(List<JobTime> lstDoingJobTime, List<JobTime> lstApplyingJobTime) {
        LocalTime doingStartTime, doingEndTime, applyingStartTime, applyingEndTime;
        for (JobTime doingJobTime : lstDoingJobTime) {
            for (JobTime applyingJobTime : lstApplyingJobTime) {
                if (doingJobTime.getDayOfWeek().equals(applyingJobTime.getDayOfWeek())) {
                    doingStartTime = doingJobTime.getStartTime();
                    doingEndTime = doingJobTime.getEndTime();
                    applyingStartTime = applyingJobTime.getStartTime();
                    applyingEndTime = applyingJobTime.getEndTime();
                    if ( (doingStartTime.isAfter(applyingStartTime) || doingStartTime.equals(applyingStartTime))
                            && (doingStartTime.isBefore(applyingEndTime) || doingStartTime.equals(applyingEndTime))) {
                        return false;
                    }
                    if ( (doingEndTime.isAfter(applyingStartTime) || doingEndTime.equals(applyingStartTime))
                            && (doingEndTime.isBefore(applyingEndTime) || doingEndTime.equals(applyingEndTime))) {
                        return false;
                    }
                    if ( (applyingStartTime.isBefore(doingStartTime) || applyingStartTime.equals(doingStartTime))
                            && (applyingEndTime.isAfter(doingEndTime) || applyingEndTime.equals(doingEndTime))) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    @Override
    public ServiceResult getJobBelongBusiness(String email) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
            return serviceResult;
        } else {
            List<JobResponse> lstJobResponse = jobRepository.getAllJobBelongBusiness(userAccount.getId());
            serviceResult.setStatus(Constants.SUCCESS_RESULT);
            serviceResult.setContent(lstJobResponse);
        }
        return serviceResult;
    }

    @Override
    @Transactional
    public ServiceResult updateJob(JobRequest jobRequest, String email) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);

        if (userAccount != null) {
            Long jobReqId = jobRequest.getId();
            Job updateJob = new Job();
            List<JobTime> lstJobTime;
            if (jobReqId == null) {
                // Cap nhat job
                updateJob = jobRepository.findById(jobReqId).get();
                if (updateJob != null) {
                    jobMappper.convertToEntity(updateJob, jobRequest);
                    lstJobTime = jobMappper.convertJobTimesToLstEntity(jobReqId, jobRequest.getLstJobTime());
                    jobRepository.save(updateJob);
                    for (JobTime jobTime : lstJobTime) {
                        jobTimeRepository.save(jobTime);
                    }
                } else {
                    serviceResult.setStatus(Constants.ERROR_RESULT);
                    serviceResult.setMessage(MessageService.getMessage("job.id.invalid"));
                    return serviceResult;
                }
            } else {
                // Them moi job
                jobMappper.convertToEntity(updateJob, jobRequest);
                jobRepository.save(updateJob);
                lstJobTime = jobMappper.convertJobTimesToLstEntity(updateJob.getId(), jobRequest.getLstJobTime());
                for (JobTime jobTime : lstJobTime) {
                    jobTimeRepository.save(jobTime);
                }
            }
        } else {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        }

        return serviceResult;
    }
}
