package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.entity.Vehicle;
import com.smartmove.smartmove_backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleService {

    @Autowired private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        validate(vehicle);
        vehicle.setVehicleId(null);
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle data) {
        validate(data);
        Vehicle v = vehicleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Vehicle not found."));
        v.setRegistrationNum(data.getRegistrationNum());
        v.setVehicleType(data.getVehicleType());
        v.setManuYear(data.getManuYear());
        v.setModel(data.getModel());
        v.setStatus(data.getStatus());
        v.setCapacity(data.getCapacity());
        v.setFuelType(data.getFuelType());
        v.setAcType(data.getAcType());
        v.setRouteType(data.getRouteType());
        return vehicleRepository.save(v);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    private void validate(Vehicle v) {
        if (v.getRegistrationNum() == null || v.getRegistrationNum().isBlank()) {
            throw new IllegalArgumentException("Registration number is required.");
        }
        if (v.getCapacity() == null || v.getCapacity() <= 0) {
            throw new IllegalArgumentException("Capacity must be more than 0.");
        }
    }
}