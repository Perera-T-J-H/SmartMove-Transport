package com.smartmove.smartmove_backend.repository;

import com.smartmove.smartmove_backend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}