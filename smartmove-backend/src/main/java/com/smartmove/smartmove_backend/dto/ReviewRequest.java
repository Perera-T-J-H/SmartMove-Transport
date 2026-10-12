package com.smartmove.smartmove_backend.dto;

public record ReviewRequest(Long passengerId, Long tripId, Integer rating, String comment) {
}