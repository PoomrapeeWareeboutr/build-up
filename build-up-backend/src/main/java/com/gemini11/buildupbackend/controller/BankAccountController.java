package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.entity.BankAccountCreateDTO;
import com.gemini11.buildupbackend.entity.LoginTokenDTO;
import com.gemini11.buildupbackend.entity.ResponseObject;
import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.BankAccount;
import com.gemini11.buildupbackend.service.AccountService;
import com.gemini11.buildupbackend.service.BankAccountService;
import com.gemini11.buildupbackend.utility.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/bankAccount")
public class BankAccountController {

    @Autowired
    BankAccountService bankAccountService;

    @Autowired
    AccountService accountService;

    @GetMapping("/findAll")
    public ResponseEntity<List<BankAccount>> getAllProducts() {
        if (bankAccountService.getAllBankAccount() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        List<BankAccount> bankAccounts = new ArrayList<>(bankAccountService.getAllBankAccount());
        if (bankAccounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(bankAccounts, HttpStatus.OK);
        }
    }

    @GetMapping("/findBankAccountByAccountId/{id}")
    public ResponseEntity<List<BankAccount>> getBankAccountByAccountId(@PathVariable("id") int accountId) {
        List<BankAccount> bankAccounts = new ArrayList<>();
        if (bankAccountService.getBankAccountByAccountId(accountId) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        bankAccountService.getBankAccountByAccountId(accountId).forEach(bankAccounts::add);
        if (bankAccounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(bankAccounts, HttpStatus.OK);
        }
    }

    @GetMapping("/findBankAccountById/{id}")
    public ResponseEntity<BankAccount> getBankAccountById(@PathVariable("id") int bankAccountId) {
        BankAccount bankAccount = bankAccountService.getBankAccountById(bankAccountId);
        if (bankAccount == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(bankAccount, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/findBankAccountByToken")
    public ResponseEntity<ResponseObject> getCreditCardByToken(@RequestBody LoginTokenDTO tokenDTO) {
        String username = new JwtHelper().extractUsernameFromToken(tokenDTO.token());
        if (username == null) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "",
                    null
            ), HttpStatus.BAD_REQUEST);
        }
        Optional<Account> account = accountService.getAccountByUsername(username);
        if (account.isEmpty()) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "",
                    null
            ), HttpStatus.BAD_REQUEST);
        }
        Iterable<BankAccount> bankAccounts = bankAccountService.getBankAccountByAccountId(account.get().getAccountId());
        bankAccounts.forEach(card -> card.setAccount(null));
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                bankAccounts
        ), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/addBankAccount")
    public ResponseEntity<ResponseObject> addBankAccount(@RequestBody BankAccountCreateDTO bankAccountCreateDTO) {
        BankAccount newBankAccount = new BankAccount();
        Optional<Account> account = accountService.getAccountByUsername(
                new JwtHelper().extractUsernameFromToken(bankAccountCreateDTO.token())
        );

        if (account.isEmpty()) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "Account not found.",
                    null
            ), HttpStatus.BAD_REQUEST);
        }

        newBankAccount.setBankAccountNumber(bankAccountCreateDTO.bankAccountNumber());
        newBankAccount.setBankName(bankAccountCreateDTO.bankName());
        newBankAccount.setHolderName(bankAccountCreateDTO.holderName());
        newBankAccount.setBalance(bankAccountCreateDTO.balance() == null ?
                100_000 : bankAccountCreateDTO.balance()
        );
        newBankAccount.setAccount(account.get());

        BankAccount bankAccount = bankAccountService.addBankAccount(newBankAccount);
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.CREATED,
                "",
                bankAccount
        ), HttpStatus.CREATED);
    }

    @PutMapping("/editBankAccount/{id}")
    public ResponseEntity<BankAccount> editBankAccount(@PathVariable("id") int id, @RequestBody BankAccount _bankAccount) {
        BankAccount bankAccount = bankAccountService.editBankAccount(id, _bankAccount);
        if (bankAccount == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bankAccount, HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteBankAccount(@PathVariable("id") int _id) {
        Integer id = bankAccountService.deleteBankAccount(_id);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
