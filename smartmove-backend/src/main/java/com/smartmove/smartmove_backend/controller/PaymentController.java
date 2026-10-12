package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.PaymentView;
import com.smartmove.smartmove_backend.entity.Payment;
import com.smartmove.smartmove_backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired private PaymentService paymentService;

    @GetMapping
    public List<PaymentView> getAllPayments() { return paymentService.getAllPayments(); }

    @PostMapping
    public Payment pay(@RequestBody Payment payment) { return paymentService.pay(payment); }
}