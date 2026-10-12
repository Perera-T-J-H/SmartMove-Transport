package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.LoginResponse;
import com.smartmove.smartmove_backend.entity.Employee;
import com.smartmove.smartmove_backend.entity.Passenger;
import com.smartmove.smartmove_backend.repository.EmployeeRepository;
import com.smartmove.smartmove_backend.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public LoginResponse login(String email, String password) {
        String cleanEmail = email.trim().toLowerCase();

        // passenger?
        Passenger p = passengerRepository.findByEmail(cleanEmail);
        if (p != null && password.equals(p.getPassword())) {
            return new LoginResponse(p.getPassengerId(), p.getFirstName(), p.getLastName(), p.getEmail(), "PASSENGER");
        }

        // employee?
        Employee e = employeeRepository.findByEmail(cleanEmail);
        if (e != null && password.equals(e.getPassword())) {
            return new LoginResponse(e.getEmployeeId(), e.getFirstName(), e.getLastName(), e.getEmail(), e.getRole());
        }

        throw new IllegalArgumentException("Invalid email or password.");
    }
}