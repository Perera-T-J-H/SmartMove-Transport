package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTripId(Long tripId);
    List<Ticket> findByPassengerId(Long passengerId);
    boolean existsByTripIdAndSeatNum(Long tripId, String seatNum);
}