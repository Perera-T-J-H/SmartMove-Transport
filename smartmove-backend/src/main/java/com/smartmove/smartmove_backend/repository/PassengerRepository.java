package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    Passenger findByEmail(String email);
}