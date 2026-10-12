package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.AnnouncementRequest;
import com.smartmove.smartmove_backend.dto.AnnouncementView;
import com.smartmove.smartmove_backend.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired private AnnouncementService announcementService;

    @GetMapping("/active")
    public List<AnnouncementView> getActive() { return announcementService.getActive(); }

    @PostMapping
    public AnnouncementView create(@RequestBody AnnouncementRequest request) { return announcementService.create(request); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { announcementService.delete(id); }
}