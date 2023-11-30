package com.gemini11.buildupbackend.repository;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {

    List<BankAccount> findByAccount(Optional<Account> account);

}
