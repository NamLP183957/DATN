package com.findJob.datn_be.repository;

import com.findJob.datn_be.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    UserAccount findByEmail(String email);

    UserAccount findByActivationCode(String code);
}
