package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.MaintenanceView;
import com.smartmove.smartmove_backend.entity.Employee;
import com.smartmove.smartmove_backend.entity.Maintenance;
import com.smartmove.smartmove_backend.entity.Vehicle;
import com.smartmove.smartmove_backend.repository.EmployeeRepository;
import com.smartmove.smartmove_backend.repository.MaintenanceRepository;
import com.smartmove.smartmove_backend.repository.MechanicRepository;
import com.smartmove.smartmove_backend.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MaintenanceService {

    @Autowired private MaintenanceRepository maintenanceRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private MechanicRepository mechanicRepository;

    public List<MaintenanceView> getRecords(Long employeeId) {
        List<Maintenance> records = (employeeId == null)
                ? maintenanceRepository.findAll()
                : maintenanceRepository.findByEmployeeId(employeeId);
        return records.stream().map(this::toView).toList();
    }

    public MaintenanceView create(Maintenance req) {
        validate(req);
        Maintenance m = new Maintenance();
        copy(m, req);
        return toView(maintenanceRepository.save(m));
    }

    public MaintenanceView update(Long id, Maintenance req) {
        validate(req);
        Maintenance m = maintenanceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Maintenance record not found."));
        copy(m, req);
        return toView(maintenanceRepository.save(m));
    }

    public void delete(Long id) {
        maintenanceRepository.deleteById(id);
    }

    private void validate(Maintenance m) {
        if (m.getVehicleId() == null || !vehicleRepository.existsById(m.getVehicleId())) {
            throw new IllegalArgumentException("Please choose a valid vehicle.");
        }
        if (m.getEmployeeId() == null || !mechanicRepository.existsById(m.getEmployeeId())) {
            throw new IllegalArgumentException("Please choose a valid mechanic.");
        }
        if (m.getServiceType() == null || m.getServiceType().isBlank()) {
            throw new IllegalArgumentException("Service type is required.");
        }
        if (m.getCost() != null && m.getCost().signum() < 0) {
            throw new IllegalArgumentException("Cost cannot be negative.");
        }
    }

    private void copy(Maintenance to, Maintenance from) {
        to.setVehicleId(from.getVehicleId());
        to.setEmployeeId(from.getEmployeeId());
        to.setServiceType(from.getServiceType().trim());
        to.setCost(from.getCost());

        to.setRepairedDate(from.getRepairedDate() == null ? LocalDate.now() : from.getRepairedDate());
    }

    private MaintenanceView toView(Maintenance m) {
        Vehicle v = vehicleRepository.findById(m.getVehicleId()).orElse(null);
        Employee e = employeeRepository.findById(m.getEmployeeId()).orElse(null);
        return new MaintenanceView(m.getMainId(), m.getVehicleId(),
                v == null ? null : v.getRegistrationNum(),
                m.getEmployeeId(),
                e == null ? null : e.getFirstName() + " " + e.getLastName(),
                m.getServiceType(), m.getCost(), m.getRepairedDate());
    }
}