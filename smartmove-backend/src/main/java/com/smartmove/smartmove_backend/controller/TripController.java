package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.TripView;
import com.smartmove.smartmove_backend.entity.Trip;
import com.smartmove.smartmove_backend.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired private TripService tripService;

    @GetMapping
    public List<TripView> getTrips(@RequestParam(required = false) Long routeId,
                                   @RequestParam(required = false) Long driverId) {
        return tripService.getTrips(routeId, driverId);
    }

    @GetMapping("/active")
    public List<TripView> getActiveTrips() { return tripService.getActiveTrips(); }

    @GetMapping("/{id}/booked-seats")
    public List<String> getBookedSeats(@PathVariable Long id) { return tripService.getBookedSeats(id); }

    @PostMapping
    public TripView createTrip(@RequestBody Trip trip) { return tripService.createTrip(trip); }

    @PutMapping("/{id}")
    public TripView updateTrip(@PathVariable Long id, @RequestBody Trip trip) { return tripService.updateTrip(id, trip); }

    @PatchMapping("/{id}/status")
    public TripView updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return tripService.updateStatus(id, body.get("status"));
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) { tripService.deleteTrip(id); }
}