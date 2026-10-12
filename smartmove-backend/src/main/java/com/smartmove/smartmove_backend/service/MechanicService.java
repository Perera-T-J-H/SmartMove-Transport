package com.smartmove.smartmove_backend.service;
import com.smartmove.smartmove_backend.entity.Mechanic;
import com.smartmove.smartmove_backend.repository.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MechanicService {
    @Autowired private MechanicRepository mechanicRepository;
    public List<Mechanic> getAllMechanics() { return mechanicRepository.findAll(); }
    public Mechanic createMechanic(Mechanic mechanic) { return mechanicRepository.save(mechanic); }
    public Mechanic updateMechanic(Long id, Mechanic mechanic) {
        mechanic.setEmployeeId(id);
        return mechanicRepository.save(mechanic);
    }
    public void deleteMechanic(Long id) { mechanicRepository.deleteById(id); }
}