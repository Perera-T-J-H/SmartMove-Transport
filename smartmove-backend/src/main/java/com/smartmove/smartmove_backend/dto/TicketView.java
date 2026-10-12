package com.smartmove.smartmove_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TicketView(Long ticketId, Long tripId, String seatNum, BigDecimal price,
                         String passengerName, String routeLabel,
                         LocalDateTime depaDatetime, String tripStatus, String paymentStatus) {
}