package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.EmployeeRequest;
import com.smartmove.smartmove_backend.dto.EmployeeView;
import com.smartmove.smartmove_backend.entity.Driver;
import com.smartmove.smartmove_backend.entity.Employee;
import com.smartmove.smartmove_backend.entity.Mechanic;
import com.smartmove.smartmove_backend.repository.DriverRepository;
import com.smartmove.smartmove_backend.repository.EmployeeRepository;
import com.smartmove.smartmove_backend.repository.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private DriverRepository driverRepository;
    @Autowired private MechanicRepository mechanicRepository;

    public List<EmployeeView> getAllEmployees() {
        return employeeRepository.findAll().stream().map(this::toView).toList();
    }

    @Transactional
    public EmployeeView createEmployee(EmployeeRequest req) {
        validate(req);
        String email = req.email().trim().toLowerCase();
        if (employeeRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("This email is already used by another employee.");
        }
        if (req.password() == null || req.password().isBlank()) {
            throw new IllegalArgumentException("A password is required for a new employee.");
        }

        Employee e = new Employee();
        fill(e, req, email);
        e.setHireDate(LocalDate.now());
        e = employeeRepository.save(e);
        saveRoleRow(e.getEmployeeId(), req);
        employeeRepository.flush();
        return toView(e);
    }

    @Transactional
    public EmployeeView updateEmployee(Long id, EmployeeRequest req) {
        validate(req);
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found."));
        if (!e.getRole().equals(req.role().trim().toUpperCase())) {
            throw new IllegalArgumentException("The role of an existing employee cannot be changed.");
        }
        String email = req.email().trim().toLowerCase();
        Employee other = employeeRepository.findByEmail(email);
        if (other != null && !other.getEmployeeId().equals(id)) {
            throw new IllegalArgumentException("This email is already used by another employee.");
        }

        fill(e, req, email);
        employeeRepository.save(e);
        saveRoleRow(id, req);
        employeeRepository.flush();
        return toView(e);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        driverRepository.deleteById(id);
        mechanicRepository.deleteById(id);
        employeeRepository.deleteById(id);
        employeeRepository.flush();
    }


    private void validate(EmployeeRequest req) {
        if (req.firstName() == null || req.firstName().isBlank() || req.lastName() == null || req.lastName().isBlank()) {
            throw new IllegalArgumentException("First name and last name are required.");
        }
        if (req.email() == null || req.email().isBlank()) {
            throw new IllegalArgumentException("Email is required.");
        }
        String role = req.role() == null ? "" : req.role().trim().toUpperCase();
        if (!role.equals("ADMIN") && !role.equals("DRIVER") && !role.equals("MECHANIC")) {
            throw new IllegalArgumentException("Role must be ADMIN, DRIVER or MECHANIC.");
        }
        if (req.status() != null && !req.status().equals("Active") && !req.status().equals("Inactive")) {
            throw new IllegalArgumentException("Status must be Active or Inactive.");
        }
        if (role.equals("DRIVER") && (req.licenseNum() == null || req.licenseNum().isBlank())) {
            throw new IllegalArgumentException("A licence number is required for a driver.");
        }
    }

    private void fill(Employee e, EmployeeRequest req, String email) {
        e.setFirstName(req.firstName().trim());
        e.setLastName(req.lastName().trim());
        e.setEmail(email);
        e.setRole(req.role().trim().toUpperCase());
        e.setStatus(req.status() == null ? "Active" : req.status());
        if (req.password() != null && !req.password().isBlank()) {
            e.setPassword(req.password());
        }
        e.getContactNumbers().clear();
        if (req.contactNumbers() != null) {
            req.contactNumbers().stream().filter(n -> n != null && !n.isBlank())
                    .forEach(n -> e.getContactNumbers().add(n.trim()));
        }
    }

    private void saveRoleRow(Long id, EmployeeRequest req) {
        String role = req.role().trim().toUpperCase();
        if (role.equals("DRIVER")) {
            Driver d = driverRepository.findById(id).orElseGet(Driver::new);
            d.setEmployeeId(id);
            d.setLicenseNum(req.licenseNum().trim());
            driverRepository.save(d);
        } else if (role.equals("MECHANIC")) {
            Mechanic m = mechanicRepository.findById(id).orElseGet(Mechanic::new);
            m.setEmployeeId(id);
            m.setExpertiseArea(req.expertiseArea() == null ? null : req.expertiseArea().trim());
            mechanicRepository.save(m);
        }
    }

    private EmployeeView toView(Employee e) {
        String license = driverRepository.findById(e.getEmployeeId()).map(Driver::getLicenseNum).orElse(null);
        String expertise = mechanicRepository.findById(e.getEmployeeId()).map(Mechanic::getExpertiseArea).orElse(null);
        return new EmployeeView(e.getEmployeeId(), e.getFirstName(), e.getLastName(), e.getEmail(),
                List.copyOf(e.getContactNumbers()), e.getRole(), e.getStatus(), e.getHireDate(), license, expertise);
    }
}