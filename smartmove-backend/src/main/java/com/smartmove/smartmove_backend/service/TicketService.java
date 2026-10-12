package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.TicketView;
import com.smartmove.smartmove_backend.entity.Payment;
import com.smartmove.smartmove_backend.entity.*;
import com.smartmove.smartmove_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TicketService {

    @Autowired private TicketRepository ticketRepository;
    @Autowired private TripRepository tripRepository;
    @Autowired private RouteRepository routeRepository;
    @Autowired private PassengerRepository passengerRepository;
    @Autowired private PaymentRepository paymentRepository;

    public Ticket book(Ticket req) {
        Trip trip = tripRepository.findById(req.getTripId())
                .orElseThrow(() -> new IllegalArgumentException("Trip not found."));
        if (!"Scheduled".equals(trip.getStatus())) {
            throw new IllegalArgumentException("This trip is not open for booking.");
        }
        if (!passengerRepository.existsById(req.getPassengerId())) {
            throw new IllegalArgumentException("Passenger not found.");
        }
        if (ticketRepository.existsByTripIdAndSeatNum(req.getTripId(), req.getSeatNum())) {
            throw new IllegalArgumentException("Seat " + req.getSeatNum() + " is already taken.");
        }
        Ticket t = new Ticket();
        t.setTripId(req.getTripId());
        t.setPassengerId(req.getPassengerId());
        t.setSeatNum(req.getSeatNum());
        t.setPrice(trip.getBasePrice());
        t.setBookingDate(LocalDate.now());
        return ticketRepository.save(t);
    }

    public List<TicketView> getTickets(Long passengerId) {
        List<Ticket> tickets = passengerId == null
                ? ticketRepository.findAll() : ticketRepository.findByPassengerId(passengerId);
        return tickets.stream().map(this::toView).toList();
    }

    private TicketView toView(Ticket t) {
        Trip trip = tripRepository.findById(t.getTripId()).orElse(null);
        Route r = (trip == null || trip.getRouteId() == null) ? null : routeRepository.findById(trip.getRouteId()).orElse(null);
        Passenger p = passengerRepository.findById(t.getPassengerId()).orElse(null);
        String payStatus = paymentRepository.findByTicketId(t.getTicketId()).map(Payment::getStatus).orElse(null);
        return new TicketView(t.getTicketId(), t.getTripId(), t.getSeatNum(), t.getPrice(),
                p == null ? null : p.getFirstName() + " " + p.getLastName(),
                r == null ? null : r.getOrigin() + " → " + r.getDestination(),
                trip == null ? null : trip.getDepaDatetime(),
                trip == null ? null : trip.getStatus(),
                payStatus);
    }
}