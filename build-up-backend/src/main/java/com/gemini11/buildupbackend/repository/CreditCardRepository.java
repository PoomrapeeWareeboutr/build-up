package com.gemini11.buildupbackend.repository;

import com.gemini11.buildupbackend.model.Account;
import com.gemini11.buildupbackend.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Integer> {
    Iterable<CreditCard> findByAccount(Optional<Account> account);
}
