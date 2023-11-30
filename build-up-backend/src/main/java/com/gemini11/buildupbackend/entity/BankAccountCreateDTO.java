package com.gemini11.buildupbackend.entity;

public record BankAccountCreateDTO(
        String bankName,
        String bankAccountNumber,
        String holderName,
        Double balance,
        Integer accountId,
        String token
) {
}
