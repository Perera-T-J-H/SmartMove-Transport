package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByRouteId(Long routeId);
    List<Trip> findByDriverId(Long driverId);
    List<Trip> findByStatus(String status);
}