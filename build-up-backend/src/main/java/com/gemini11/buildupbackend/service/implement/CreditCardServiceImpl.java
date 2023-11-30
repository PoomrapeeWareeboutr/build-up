package com.gemini11.buildupbackend.service.implement;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.CreditCard;
import com.gemini11.buildupbackend.repository.AccountRepository;
import com.gemini11.buildupbackend.repository.CreditCardRepository;
import com.gemini11.buildupbackend.service.CreditCardService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CreditCardServiceImpl implements CreditCardService {

    @Autowired
    CreditCardRepository creditCardRepository;

    @Autowired
    AccountRepository accountRepository;

    @Override
    public Iterable<CreditCard> getCreditCards() {
        try {
            return creditCardRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Iterable<CreditCard> getCreditCardsByAccountId(int accountId) {
        try {
            Optional<Account> user = accountRepository.findByAccountId(accountId);
            if (user.isPresent()) {
                return creditCardRepository.findByAccount(user);
            } else {
                return Collections.emptyList();
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public CreditCard getCreditCardById(int id) {
        return creditCardRepository.findById(id).orElse(null);
    }

    @Override
    public CreditCard addCreditCard(CreditCard creditCard) {
        try {
            return creditCardRepository.save(creditCard);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Integer deleteCreditCard(int id) {
        try {
            creditCardRepository.deleteById(id);
            return id;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public CreditCard editCreditCard(int id, CreditCard creditCard) {
        Optional<CreditCard> creditCard1 = creditCardRepository.findById(id);

        if (creditCard1.isPresent()) {
            CreditCard creditCard2 = creditCard1.get();
            creditCard2.setAccount(creditCard.getAccount());
            creditCard2.setCardNumber(creditCard.getCardNumber());
            creditCard2.setCvv(creditCard.getCvv());
            creditCard2.setExpirationDate(creditCard.getExpirationDate());
            creditCard2.setHolderName(creditCard.getHolderName());
            creditCard2.setBalance(creditCard.getBalance());
            return creditCardRepository.save(creditCard2);
        } else {
            return null;
        }
    }
}
