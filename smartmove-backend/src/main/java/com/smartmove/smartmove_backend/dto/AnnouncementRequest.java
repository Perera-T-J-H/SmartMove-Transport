package com.smartmove.smartmove_backend.dto;

public record AnnouncementRequest(String title, String message, String priority, String expiryDate) {
}