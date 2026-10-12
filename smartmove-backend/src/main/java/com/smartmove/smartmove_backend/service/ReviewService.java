package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.document.Review;
import com.smartmove.smartmove_backend.dto.ReviewRequest;
import com.smartmove.smartmove_backend.dto.ReviewView;
import com.smartmove.smartmove_backend.entity.*;
import com.smartmove.smartmove_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Service
public class ReviewService {

    @Autowired private ReviewRepository reviewRepository;          // MongoDB
    @Autowired private TripRepository tripRepository;              // Oracle
    @Autowired private TicketRepository ticketRepository;
    @Autowired private PassengerRepository passengerRepository;
    @Autowired private RouteRepository routeRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private EmployeeRepository employeeRepository;

    public List<ReviewView> getReviews(Long routeId) {
        return toViews(routeId == null ? reviewRepository.findAll() : reviewRepository.findByRouteId(routeId));
    }

    public List<ReviewView> search(String keyword) {
        return toViews(reviewRepository.findByCommentContainingIgnoreCase(keyword == null ? "" : keyword.trim()));
    }

    public ReviewView submit(ReviewRequest req) {
        if (req.passengerId() == null || req.tripId() == null) {
            throw new IllegalArgumentException("Passenger and trip are required.");
        }
        if (req.rating() == null || req.rating() < 1 || req.rating() > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5.");
        }
        if (req.comment() == null || req.comment().isBlank()) {
            throw new IllegalArgumentException("Please write a comment.");
        }

        Trip trip = tripRepository.findById(req.tripId()).orElseThrow(() -> new IllegalArgumentException("Trip not found."));
        Passenger p = passengerRepository.findById(req.passengerId()).orElseThrow(() -> new IllegalArgumentException("Passenger not found."));

        boolean booked = ticketRepository.findByPassengerId(p.getPassengerId()).stream()
                .anyMatch(t -> t.getTripId().equals(trip.getTripId()));
        if (!booked) {
            throw new IllegalArgumentException("You can only review a trip you booked.");
        }
        if (reviewRepository.existsByPassengerIdAndTripId(p.getPassengerId(), trip.getTripId())) {
            throw new IllegalArgumentException("You have already reviewed this trip.");
        }

        Route r = trip.getRouteId() == null ? null : routeRepository.findById(trip.getRouteId()).orElse(null);
        Vehicle v = trip.getVehicleId() == null ? null : vehicleRepository.findById(trip.getVehicleId()).orElse(null);
        Employee d = trip.getDriverId() == null ? null : employeeRepository.findById(trip.getDriverId()).orElse(null);

        Review saved = reviewRepository.save(new Review(null, trip.getRouteId(),
                r == null ? null : r.getOrigin() + " → " + r.getDestination(),
                p.getPassengerId(), p.getFirstName() + " " + p.getLastName(),
                trip.getTripId(), trip.getVehicleId(), v == null ? null : v.getRegistrationNum(),
                trip.getDriverId(), d == null ? null : d.getFirstName() + " " + d.getLastName(),
                req.rating(), req.comment().trim(), LocalDate.now().toString()));
        return toView(saved);
    }

    private List<ReviewView> toViews(List<Review> reviews) {
        return reviews.stream()
                .sorted(Comparator.comparing(Review::submitDate, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::toView).toList();
    }

    private ReviewView toView(Review r) {
        return new ReviewView(r.id(), r.passengerName(), r.routeLabel(), r.rating(), r.comment(), r.submitDate());
    }
}