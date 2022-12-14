package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.Appriciate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppriciateRepository extends JpaRepository<Appriciate, Long> {

}
