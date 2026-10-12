package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.ProfileUpdateRequest;
import com.smartmove.smartmove_backend.entity.Passenger;
import com.smartmove.smartmove_backend.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/passengers")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @GetMapping
    public List<Passenger> getAllPassengers() {
        return passengerService.getAllPassengers();
    }

    @PostMapping("/register")
    public Passenger register(@RequestBody Passenger passenger) {
        return passengerService.register(passenger);
    }

    @PutMapping
    public Passenger updateProfile(@RequestBody ProfileUpdateRequest request) {
        return passengerService.updateProfile(request);
    }

    @DeleteMapping("/{id}")
    public void deletePassenger(@PathVariable Long id) {
        passengerService.deletePassenger(id);
    }
}