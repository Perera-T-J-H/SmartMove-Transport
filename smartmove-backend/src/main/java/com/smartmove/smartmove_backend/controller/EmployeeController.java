package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.EmployeeRequest;
import com.smartmove.smartmove_backend.dto.EmployeeView;
import com.smartmove.smartmove_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeView> getAllEmployees() { return employeeService.getAllEmployees(); }

    @PostMapping
    public EmployeeView createEmployee(@RequestBody EmployeeRequest request) { return employeeService.createEmployee(request); }

    @PutMapping("/{id}")
    public EmployeeView updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequest request) {
        return employeeService.updateEmployee(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) { employeeService.deleteEmployee(id); }
}