package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    Account createAccount(Account account);

    List<Account> getAccounts();

    Optional<Account> getAccountByUsername(String username);

    void deleteAccountByUsername(String username);

    void deleteById(int id);

    Optional<Account> getAccountById(Integer id);
}
