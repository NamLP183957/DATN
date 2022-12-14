package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.Apply;
import com.findJob.datn_be.model.job.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {
    List<Apply> getAppliesByStudentCVIdAndStatus(Long studentId, Integer status);
    List<Apply> getAppliesByStudentCVIdAndJobId(Long studentId, Long jobId);
}
