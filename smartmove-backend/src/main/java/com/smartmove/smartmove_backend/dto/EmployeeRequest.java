package com.smartmove.smartmove_backend.dto;

import java.util.List;

public record EmployeeRequest(String firstName, String lastName, String email, List<String> contactNumbers,
                              String role, String status, String licenseNum, String expertiseArea, String password) {
}