package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.business.BusinessDescription;
import com.findJob.datn_be.repository.custom.BusinessRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends JpaRepository<BusinessDescription, Long>, BusinessRepositoryCustom {
}
