package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.entity.Vehicle;
import com.smartmove.smartmove_backend.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired private VehicleService vehicleService;

    @GetMapping
    public List<Vehicle> getAllVehicles() { return vehicleService.getAllVehicles(); }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) { return vehicleService.createVehicle(vehicle); }

    @PutMapping("/{id}")
    public Vehicle updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle) { return vehicleService.updateVehicle(id, vehicle); }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) { vehicleService.deleteVehicle(id); }
}