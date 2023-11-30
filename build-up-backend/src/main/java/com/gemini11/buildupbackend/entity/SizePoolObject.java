package com.gemini11.buildupbackend.entity;

public record SizePoolObject(
        String size,
        Boolean isBrandNew,
        Integer id,
        String name,
        String description,
        Double price
) {
}