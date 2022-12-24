package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.job.Job;
import com.findJob.datn_be.repository.custom.JobRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JobRepositoryCustom {

    List<Job> findByJobCodeAndStatus(String jobCode, Integer status);

    List<Job> findByJobCodeAndBusinessId(String jobCode, Long businessId);

    List<Job> findByIdAndBusinessId(Long jobId, Long businessId);
}
