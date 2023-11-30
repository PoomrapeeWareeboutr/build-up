package com.gemini11.buildupbackend.repository;

import com.gemini11.buildupbackend.model.Account;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AccountRepository extends JpaRepository<Account, Integer> {

    Account findByUsername(String username);

    Optional<Account> findByAccountId(int accountId);

    @Transactional
    void deleteByUsername(String username);
}
