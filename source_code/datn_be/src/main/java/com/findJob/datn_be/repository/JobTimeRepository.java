package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.job.JobTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobTimeRepository extends JpaRepository<JobTime, Long> {
    List<JobTime> findByJobId(Long jobId);
}
