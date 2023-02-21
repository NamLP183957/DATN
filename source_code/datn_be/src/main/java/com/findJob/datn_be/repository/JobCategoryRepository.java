package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.job.JobCategory;
import com.findJob.datn_be.repository.custom.JobCategoryRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Long>, JobCategoryRepositoryCustom {
}
