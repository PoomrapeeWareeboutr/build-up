package com.gemini11.buildupbackend.entity;

import java.util.List;
import java.util.Optional;

public record BuyerCheckoutDTO(
        Optional<Integer> creditCardId,
        Optional<Integer> bankAccountId,
        Integer shippingAddressId,
        List<ItemAndQuantity> items,
        String token,
        Double totalPrice
) {
}
