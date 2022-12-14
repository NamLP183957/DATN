package com.findJob.datn_be.mapper.student;

import com.findJob.datn_be.dto.request.StudentCVRequest;
import com.findJob.datn_be.model.student.StudentCV;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudentCVMapper {
    private final ModelMapper modelMapper;

    public StudentCV convertToEntity(StudentCVRequest request, Long studentId) {
        StudentCV studentCV = modelMapper.map(request, StudentCV.class);
        studentCV.setStudentId(studentId);
        return studentCV;
    }

    public void convertToEntity(StudentCV studentCVDB, StudentCVRequest request) {
        studentCVDB.setFirstName(request.getFirstName());
        studentCVDB.setSurName(request.getSurName());
        studentCVDB.setLastName(request.getLastName());
        studentCVDB.setPhoneNumber(request.getPhoneNumber());
        studentCVDB.setAddress(request.getAddress());
        studentCVDB.setPrize(request.getPrize());
        studentCVDB.setCertificate(request.getCertificate());
        studentCVDB.setStudy(request.getStudy());
        studentCVDB.setTalent(request.getTalent());
        studentCVDB.setWeakness(request.getWeakness());
        studentCVDB.setHobby(request.getHobby());
        studentCVDB.setAdditional(request.getAdditional());
    }
}
