package com.gemini11.buildupbackend.entity;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ResponseObject(
        LocalDateTime timestamp,
        HttpStatus statusCode,
        String errorMessage,
        Object data
) {
}
