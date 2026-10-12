package com.smartmove.smartmove_backend.dto;

public record ReviewView(String feedbackId, String passengerName, String routeLabel,
                         Integer rating, String comment, String submitDate) {
}