package com.smartmove.smartmove_backend.controller;
import com.smartmove.smartmove_backend.entity.Driver;
import com.smartmove.smartmove_backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    @Autowired private DriverService driverService;
    @GetMapping
    public List<Driver> getAllDrivers() { return driverService.getAllDrivers(); }
    @PostMapping
    public Driver createDriver(@RequestBody Driver driver) { return driverService.createDriver(driver); }
    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable Long id, @RequestBody Driver driver) { return driverService.updateDriver(id, driver); }
    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable Long id) { driverService.deleteDriver(id); }
}