package com.smartmove.smartmove_backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
public record Review(@Id String id, Long routeId, String routeLabel, Long passengerId, String passengerName,
                     Long tripId, Long vehicleId, String vehicleReg, Long driverId, String driverName,
                     Integer rating, String comment, String submitDate) {
}