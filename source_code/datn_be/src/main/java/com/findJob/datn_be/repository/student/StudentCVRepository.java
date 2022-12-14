package com.findJob.datn_be.repository.student;

import com.findJob.datn_be.model.student.StudentCV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentCVRepository extends JpaRepository<StudentCV, Long> {
    StudentCV findByStudentId(Long studentId);
}
