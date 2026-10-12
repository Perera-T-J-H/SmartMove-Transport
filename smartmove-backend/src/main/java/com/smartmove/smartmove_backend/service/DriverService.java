package com.smartmove.smartmove_backend.service;
import com.smartmove.smartmove_backend.entity.Driver;
import com.smartmove.smartmove_backend.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DriverService {
    @Autowired private DriverRepository driverRepository;
    public List<Driver> getAllDrivers() { return driverRepository.findAll(); }
    public Driver createDriver(Driver driver) { return driverRepository.save(driver); }
    public Driver updateDriver(Long id, Driver driver) {
        driver.setEmployeeId(id);
        return driverRepository.save(driver);
    }
    public void deleteDriver(Long id) { driverRepository.deleteById(id); }
}