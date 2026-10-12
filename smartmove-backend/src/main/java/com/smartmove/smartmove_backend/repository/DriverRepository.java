package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
}