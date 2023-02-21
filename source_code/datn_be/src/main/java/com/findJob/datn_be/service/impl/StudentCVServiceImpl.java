package com.findJob.datn_be.service.impl;

import com.findJob.datn_be.dto.request.StudentCVRequest;
import com.findJob.datn_be.mapper.student.StudentCVMapper;
import com.findJob.datn_be.model.UserAccount;
import com.findJob.datn_be.model.student.StudentCV;
import com.findJob.datn_be.repository.UserAccountRepository;
import com.findJob.datn_be.repository.student.StudentCVRepository;
import com.findJob.datn_be.service.FileService;
import com.findJob.datn_be.service.MessageService;
import com.findJob.datn_be.service.StudentCVSerivce;
import com.findJob.datn_be.util.Constants;
import com.findJob.datn_be.util.ServiceResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class StudentCVServiceImpl implements StudentCVSerivce {
    private final UserAccountRepository userAccountRepository;
    private final StudentCVRepository studentCVRepository;
    private final StudentCVMapper mapper;
    private final FileService fileService;

    @Override
    public ServiceResult updateCV(StudentCVRequest request, String userEmail) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(userEmail);
        if (userAccount == null){
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        } else {
            String validMessage = request.validate();
            if (!MessageService.getMessage("OK").equals(validMessage)) {
                serviceResult.setStatus(Constants.ERROR_RESULT);
                serviceResult.setMessage(validMessage);
            } else {
                StudentCV studentCVDB = studentCVRepository.findByStudentId(userAccount.getId());
                if (studentCVDB != null) {
                    mapper.convertToEntity(studentCVDB, request);
                } else {
                    studentCVDB = mapper.convertToEntity(request, userAccount.getId());
                }
                studentCVRepository.save(studentCVDB);
                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setMessage(MessageService.getMessage("student.cv.update.success"));
                serviceResult.setContent(studentCVDB);
            }
        }

        return serviceResult;
    }

    @Override
    public ServiceResult getCV(String email) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null){
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        } else {
            StudentCV studentCV = studentCVRepository.findByStudentId(userAccount.getId());
            if (studentCV == null) {
                serviceResult.setStatus(Constants.WARN_RESULT);
                serviceResult.setMessage(MessageService.getMessage("student.cv.null"));
            } else {
                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setContent(studentCV);
            }
        }

        return serviceResult;
    }

    @Override
    public ServiceResult updateAvatar(MultipartFile file, String email) {
        ServiceResult serviceResult = new ServiceResult();
        UserAccount userAccount = userAccountRepository.findByEmail(email);
        if (userAccount == null){
            serviceResult.setStatus(Constants.ERROR_RESULT);
            serviceResult.setMessage(MessageService.getMessage("unaothorize"));
        } else {
            if (file != null) {
                String avatarLink = fileService.uploadFile(file);
                StudentCV studentCVDB = studentCVRepository.findByStudentId(userAccount.getId());
                if (studentCVDB != null) {
                    studentCVDB.setAvatarFileName(avatarLink);
                    studentCVRepository.save(studentCVDB);
                } else {
                    StudentCV newStudentCV = new StudentCV();
                    newStudentCV.setStudentId(userAccount.getId());
                    newStudentCV.setAvatarFileName(avatarLink);
                    studentCVRepository.save(newStudentCV);
                }

                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setMessage(MessageService.getMessage("student.cv.update.avatar.success"));
                serviceResult.setContent(avatarLink);
            } else {
                serviceResult.setStatus(Constants.SUCCESS_RESULT);
                serviceResult.setMessage(MessageService.getMessage("student.cv.update.avatar.fail"));
            }

        }

        return serviceResult;
    }
}
