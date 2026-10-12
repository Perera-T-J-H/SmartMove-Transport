package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.PaymentView;
import com.smartmove.smartmove_backend.entity.Passenger;
import com.smartmove.smartmove_backend.entity.Payment;
import com.smartmove.smartmove_backend.entity.Ticket;
import com.smartmove.smartmove_backend.repository.PassengerRepository;
import com.smartmove.smartmove_backend.repository.PaymentRepository;
import com.smartmove.smartmove_backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {

    @Autowired private PaymentRepository paymentRepository;
    @Autowired private TicketRepository ticketRepository;
    @Autowired private PassengerRepository passengerRepository;

    public Payment pay(Payment req) {
        Ticket ticket = ticketRepository.findById(req.getTicketId())
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found."));

        if (!"Cash".equals(req.getPayType()) && !"Card".equals(req.getPayType())) {
            throw new IllegalArgumentException("Payment method must be Cash or Card.");
        }
        if (paymentRepository.existsByTicketId(ticket.getTicketId())) {
            throw new IllegalArgumentException("This ticket is already paid.");
        }

        Payment p = new Payment();
        p.setTicketId(ticket.getTicketId());
        p.setPayType(req.getPayType());
        p.setAmount(ticket.getPrice());
        p.setPayDate(LocalDate.now());
        p.setStatus("Paid");
        return paymentRepository.save(p);
    }

    public List<PaymentView> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::toView).toList();
    }

    private PaymentView toView(Payment p) {
        Ticket t = ticketRepository.findById(p.getTicketId()).orElse(null);
        Passenger pass = (t == null) ? null : passengerRepository.findById(t.getPassengerId()).orElse(null);
        return new PaymentView(p.getPaymentId(), p.getTicketId(),
                pass == null ? null : pass.getFirstName() + " " + pass.getLastName(),
                p.getAmount(), p.getPayType(), p.getPayDate(), p.getStatus());
    }
}