package com.smartmove.smartmove_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TripView(Long tripId, Long routeId, String routeLabel,
                       Long vehicleId, String vehicleReg, String vehicleType, String acType, Integer capacity,
                       Long driverId, String driverName,
                       LocalDateTime depaDatetime, LocalDateTime arrivalDatetime,
                       BigDecimal basePrice, String status) {
}