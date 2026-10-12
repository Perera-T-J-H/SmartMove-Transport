package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.document.Announcement;
import com.smartmove.smartmove_backend.dto.AnnouncementRequest;
import com.smartmove.smartmove_backend.dto.AnnouncementView;
import com.smartmove.smartmove_backend.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Comparator;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired private AnnouncementRepository announcementRepository;

    public List<AnnouncementView> getActive() {
        String today = LocalDate.now().toString();
        return announcementRepository.findByActive(true).stream()
                .filter(a -> a.expiryDate() == null || a.expiryDate().compareTo(today) >= 0)
                .sorted(Comparator.comparing(Announcement::postedDate, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::toView).toList();
    }

    public AnnouncementView create(AnnouncementRequest req) {
        if (req.title() == null || req.title().isBlank() || req.message() == null || req.message().isBlank()) {
            throw new IllegalArgumentException("Title and message are required.");
        }
        String expiry = null;
        if (req.expiryDate() != null && !req.expiryDate().isBlank()) {
            try {
                expiry = LocalDate.parse(req.expiryDate().trim()).toString();
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Expiry date must look like 2026-12-31.");
            }
        }
        String priority = "high".equalsIgnoreCase(req.priority()) ? "high" : "normal";
        Announcement saved = announcementRepository.save(new Announcement(null, req.title().trim(),
                req.message().trim(), priority, LocalDate.now().toString(), expiry, true));
        return toView(saved);
    }

    public void delete(String id) {
        announcementRepository.deleteById(id);
    }

    private AnnouncementView toView(Announcement a) {
        return new AnnouncementView(a.id(), a.title(), a.message(), a.postedDate(), a.priority());
    }
}