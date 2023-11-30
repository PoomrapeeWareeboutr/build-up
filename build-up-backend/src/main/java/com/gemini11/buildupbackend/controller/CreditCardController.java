package com.gemini11.buildupbackend.controller;

import com.gemini11.buildupbackend.entity.CreditCardCreateDTO;
import com.gemini11.buildupbackend.entity.LoginTokenDTO;
import com.gemini11.buildupbackend.entity.ResponseObject;
import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.CreditCard;
import com.gemini11.buildupbackend.service.AccountService;
import com.gemini11.buildupbackend.service.CreditCardService;
import com.gemini11.buildupbackend.utility.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/creditCard")
public class CreditCardController {

    @Autowired
    CreditCardService creditCardService;

    @Autowired
    AccountService accountService;

    @GetMapping("/findAll")
    public ResponseEntity<List<CreditCard>> getAllCreditCard() {
        List<CreditCard> creditCards = new ArrayList<>();
        if (creditCardService.getCreditCards() == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        creditCardService.getCreditCards().forEach(creditCards::add);
        if (creditCards.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(creditCards, HttpStatus.OK);
        }
    }

    @GetMapping("/findCreditCardByAccountId/{id}")
    public ResponseEntity<List<CreditCard>> getCreditCardByAccountId(@PathVariable("id") int accountId) {
        List<CreditCard> creditCards = new ArrayList<>();
        if (creditCardService.getCreditCardsByAccountId(accountId) == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        creditCardService.getCreditCardsByAccountId(accountId).forEach(card -> {
            card.setAccount(null);
            creditCards.add(card);
        });

        if (creditCards.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(creditCards, HttpStatus.OK);
        }
    }

    @GetMapping("/findCreditCardByCreditCardId")
    public ResponseEntity<CreditCard> getCreditCardByCreditCardId(@PathVariable("id") int creditCardId) {
        CreditCard creditCard = creditCardService.getCreditCardById(creditCardId);
        if (creditCard == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(creditCard, HttpStatus.OK);
        }
    }

    @CrossOrigin
    @PostMapping("/findCreditCardByToken")
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
        Iterable<CreditCard> creditCard = creditCardService.getCreditCardsByAccountId(account.get().getAccountId());
        creditCard.forEach(card -> card.setAccount(null));
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.OK,
                "",
                creditCard
        ), HttpStatus.OK);
    }

    @PostMapping("/addCreditCard")
    public ResponseEntity<ResponseObject> addCreditCard(@RequestBody CreditCardCreateDTO creditCardDTO) {
        CreditCard newCreditCard = new CreditCard();
        Optional<Account> account = accountService.getAccountByUsername(
                new JwtHelper().extractUsernameFromToken(creditCardDTO.token())
        );

        if (account.isEmpty()) {
            return new ResponseEntity<>(new ResponseObject(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST,
                    "Account not found.",
                    null
            ), HttpStatus.BAD_REQUEST);
        }

        newCreditCard.setCardNumber(creditCardDTO.cardNumber());
        newCreditCard.setHolderName(creditCardDTO.holderName());
        newCreditCard.setExpirationDate(creditCardDTO.expirationDate());
        newCreditCard.setCvv(creditCardDTO.cvc());
        newCreditCard.setBalance(creditCardDTO.balance() == null ?
                100_000 : creditCardDTO.balance()
        );
        newCreditCard.setAccount(account.get());

        CreditCard creditCard = creditCardService.addCreditCard(newCreditCard);
        return new ResponseEntity<>(new ResponseObject(
                LocalDateTime.now(),
                HttpStatus.CREATED,
                "",
                creditCard
        ), HttpStatus.CREATED);
    }

    @PostMapping("/editCreditCard/{id}")
    public ResponseEntity<CreditCard> editCreditCard(@PathVariable("id") int id, @RequestBody CreditCard _creditcard) {
        CreditCard creditCard = creditCardService.editCreditCard(id, _creditcard);
        if (creditCard == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(creditCard, HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCreditCard(@PathVariable("id") int _id) {
        Integer id = creditCardService.deleteCreditCard(_id);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

}
