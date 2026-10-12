package com.smartmove.smartmove_backend.dto;

import java.time.LocalDate;
import java.util.List;

public record EmployeeView(Long employeeId, String firstName, String lastName, String email,
                           List<String> contactNumbers, String role, String status, LocalDate hireDate,
                           String licenseNum, String expertiseArea) {
}