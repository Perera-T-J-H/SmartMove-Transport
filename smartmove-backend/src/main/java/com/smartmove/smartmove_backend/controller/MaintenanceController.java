package com.smartmove.smartmove_backend.controller;

import com.smartmove.smartmove_backend.dto.MaintenanceView;
import com.smartmove.smartmove_backend.entity.Maintenance;
import com.smartmove.smartmove_backend.service.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired private MaintenanceService maintenanceService;

    @GetMapping
    public List<MaintenanceView> getRecords(@RequestParam(required = false) Long employeeId) {
        return maintenanceService.getRecords(employeeId);
    }

    @PostMapping
    public MaintenanceView create(@RequestBody Maintenance record) { return maintenanceService.create(record); }

    @PutMapping("/{id}")
    public MaintenanceView update(@PathVariable Long id, @RequestBody Maintenance record) {
        return maintenanceService.update(id, record);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { maintenanceService.delete(id); }
}