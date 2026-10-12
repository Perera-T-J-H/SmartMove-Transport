package com.smartmove.smartmove_backend.dto;

public record LoginResponse(Long id, String firstName, String lastName, String email, String role) {
}