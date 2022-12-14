package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.AppriciateJobRequest;
import com.findJob.datn_be.model.Apply;
import com.findJob.datn_be.model.Appriciate;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.repository.ApplyRepository;
import com.findJob.datn_be.repository.AppriciateRepository;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.service.AppriciateService;
import com.findJob.datn_be.service.FileService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppriciateServiceImpl implements AppriciateService {
    private final AppriciateRepository appriciateRepository;
    private final UserAccountRepository userAccountRepository;
    private final ApplyRepository applyRepository;
    private final FileService fileService;

    @Override
    @Transactional
    public ServiceResult appriciateJob(String email, Long jobId, AppriciateJobRequest request, MultipartFile file) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null) {
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        } else {
            String validReq = request.isValid();
            if (!MessageService.getMessage("OK").equals(validReq)) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(validReq);
                return serviceResult;
            } else {
                if (file == null) {
                    List<Apply> lstApply = applyRepository.getAppliesByStudentCVIdAndJobId(userAccount.getId(), jobId);
                    if (lstApply != null && lstApply.size() > 0) {
                        String appriciateFileLink = fileService.uploadFile(file);
                        Appriciate appriciate = new Appriciate(lstApply.get(0).getId(), request.getContent(), request.getRate(), appriciateFileLink);
                        appriciateRepository.save(appriciate);
                    } else {
                        serviceResult.setStatus(Constants.ERROR_RESULT);
                        serviceResult.setMessage(MessageService.getMessage("appriciate.student.apply.invalod"));
                        return serviceResult;
                    }
                } else {
                    serviceResult.setStatus(Constants.ERROR_RESULT);
                    serviceResult.setMessage(MessageService.getMessage("appriciate.file.invalid"));
                    return serviceResult;
                }
            }
        }

        return serviceResult;
    }
}
