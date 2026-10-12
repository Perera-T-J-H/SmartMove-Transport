package com.smartmove.smartmove_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MaintenanceView(Long mainId, Long vehicleId, String vehicleReg,
                              Long employeeId, String mechanicName,
                              String serviceType, BigDecimal cost, LocalDate repairedDate) {
}