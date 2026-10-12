package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.LoginResponse;
import com.smartmove.smartmove_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestParam String email, @RequestParam String password) {
        return authService.login(email, password);
    }
}