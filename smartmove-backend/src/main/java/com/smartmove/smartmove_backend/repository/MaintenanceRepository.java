package com.smartmove.smartmove_backend.repository;

import com.smartmove.smartmove_backend.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {

    List<Maintenance> findByEmployeeId(Long employeeId);
}