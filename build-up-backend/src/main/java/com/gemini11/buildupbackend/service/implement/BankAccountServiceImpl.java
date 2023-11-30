package com.gemini11.buildupbackend.service.implement;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.BankAccount;
import com.gemini11.buildupbackend.repository.AccountRepository;
import com.gemini11.buildupbackend.repository.BankAccountRepository;
import com.gemini11.buildupbackend.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class BankAccountServiceImpl implements BankAccountService {

    @Autowired
    BankAccountRepository bankAccountRepository;

    @Autowired
    AccountRepository accountRepository;

    @Override
    public List<BankAccount> getAllBankAccount() {
        try {
            return bankAccountRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<BankAccount> getBankAccountByAccountId(int accountId) {
        try {
            Optional<Account> account = accountRepository.findByAccountId(accountId);
            if (account.isPresent()) {
                return bankAccountRepository.findByAccount(account);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public BankAccount getBankAccountById(int id) {
        return bankAccountRepository.findById(id).orElse(null);
    }

    @Override
    public BankAccount addBankAccount(BankAccount bankAccount) {
        try {
            return bankAccountRepository.save(bankAccount);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public BankAccount editBankAccount(int id, BankAccount bankAccount) {
        Optional<BankAccount> bankAccount1 = bankAccountRepository.findById(id);

        try {
            if (bankAccount1.isPresent()) {
                BankAccount bankAccount2 = bankAccount1.get();
                bankAccount2.setAccount(bankAccount.getAccount());
                bankAccount2.setBankAccountNumber(bankAccount.getBankAccountNumber());
                bankAccount2.setHolderName(bankAccount2.getHolderName());
                bankAccount2.setBankName(bankAccount2.getBankName());
                return bankAccountRepository.save(bankAccount2);
            } else {
                return new BankAccount();
            }
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public Integer deleteBankAccount(int id) {
        try {
            bankAccountRepository.deleteById(id);
            return id;
        } catch (Exception e) {
            return null;
        }
    }
}
