package com.smartmove.smartmove_backend.controller;
import com.smartmove.smartmove_backend.entity.Mechanic;
import com.smartmove.smartmove_backend.service.MechanicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {
    @Autowired private MechanicService mechanicService;
    @GetMapping
    public List<Mechanic> getAllMechanics() { return mechanicService.getAllMechanics(); }
    @PostMapping
    public Mechanic createMechanic(@RequestBody Mechanic mechanic) { return mechanicService.createMechanic(mechanic); }
    @PutMapping("/{id}")
    public Mechanic updateMechanic(@PathVariable Long id, @RequestBody Mechanic mechanic) { return mechanicService.updateMechanic(id, mechanic); }
    @DeleteMapping("/{id}")
    public void deleteMechanic(@PathVariable Long id) { mechanicService.deleteMechanic(id); }
}