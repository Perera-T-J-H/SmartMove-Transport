package com.smartmove.smartmove_backend.repository;
import com.smartmove.smartmove_backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    boolean existsByTicketId(Long ticketId);
    Optional<Payment> findByTicketId(Long ticketId);
}