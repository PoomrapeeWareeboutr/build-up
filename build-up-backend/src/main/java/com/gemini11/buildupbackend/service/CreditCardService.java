package com.gemini11.buildupbackend.service;

import com.gemini11.buildupbackend.model.CreditCard;

public interface CreditCardService {
    Iterable<CreditCard> getCreditCards();

    Iterable<CreditCard> getCreditCardsByAccountId(int accountId);

    CreditCard getCreditCardById(int id);

    CreditCard addCreditCard(CreditCard creditCard);

    Integer deleteCreditCard(int id);

    CreditCard editCreditCard(int id, CreditCard creditCard);
}
