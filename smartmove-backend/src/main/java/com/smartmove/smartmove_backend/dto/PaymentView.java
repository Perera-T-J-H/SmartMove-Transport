package com.smartmove.smartmove_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record PaymentView(Long paymentId, Long ticketId, String passengerName,
                          BigDecimal amount, String payType, LocalDate payDate, String status) {
}