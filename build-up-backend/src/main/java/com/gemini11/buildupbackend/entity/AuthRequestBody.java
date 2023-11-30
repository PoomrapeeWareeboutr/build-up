package com.gemini11.buildupbackend.entity;

public record AuthRequestBody(
        String username,
        String password
) {
}
