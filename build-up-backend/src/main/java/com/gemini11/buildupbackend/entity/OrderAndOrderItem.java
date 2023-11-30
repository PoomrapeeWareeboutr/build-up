package com.gemini11.buildupbackend.entity;

import java.time.LocalDateTime;

public record OrderAndOrderItem(
        Integer orderId,
        Integer statusId,
        Integer orderItemId,
        Integer productId,
        String name,
        String description,
        String size,
        Double price,
        Integer itemQuantity,
        Boolean isBrandNew,
        LocalDateTime purchaseDate
) {
}
