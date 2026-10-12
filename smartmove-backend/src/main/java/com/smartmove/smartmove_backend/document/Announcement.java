package com.smartmove.smartmove_backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "announcements")
public record Announcement(@Id String id, String title, String message, String priority,
                           String postedDate, String expiryDate, Boolean active) {
}