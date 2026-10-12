package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.ReviewRequest;
import com.smartmove.smartmove_backend.dto.ReviewView;
import com.smartmove.smartmove_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired private ReviewService reviewService;

    @GetMapping
    public List<ReviewView> getReviews(@RequestParam(required = false) Long routeId) {
        return reviewService.getReviews(routeId);
    }

    @GetMapping("/search")
    public List<ReviewView> search(@RequestParam String keyword) { return reviewService.search(keyword); }

    @PostMapping
    public ReviewView submit(@RequestBody ReviewRequest request) { return reviewService.submit(request); }
}