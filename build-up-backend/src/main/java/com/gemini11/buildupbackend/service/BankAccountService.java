package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.BankAccount;

import java.util.List;

public interface BankAccountService {

    List<BankAccount> getAllBankAccount();

    List<BankAccount> getBankAccountByAccountId(int accountId);

    BankAccount getBankAccountById(int id);

    BankAccount addBankAccount(BankAccount bankAccount);

    BankAccount editBankAccount(int id, BankAccount bankAccount);

    Integer deleteBankAccount(int id);

}
