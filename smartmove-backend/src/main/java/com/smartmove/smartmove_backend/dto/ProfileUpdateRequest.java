package com.smartmove.smartmove_backend.dto;

import java.util.List;

public record ProfileUpdateRequest(Long id, String firstName, String lastName, String email,
                                   String password, String role, List<String> contactNumbers) {
}