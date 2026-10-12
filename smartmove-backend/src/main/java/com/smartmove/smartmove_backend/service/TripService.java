package com.smartmove.smartmove_backend.service;

import com.smartmove.smartmove_backend.dto.TripView;
import com.smartmove.smartmove_backend.entity.*;
import com.smartmove.smartmove_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TripService {

    @Autowired private TripRepository tripRepository;
    @Autowired private RouteRepository routeRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private TicketRepository ticketRepository;


    public TripView toView(Trip t) {
        Route r = t.getRouteId() == null ? null : routeRepository.findById(t.getRouteId()).orElse(null);
        Vehicle v = t.getVehicleId() == null ? null : vehicleRepository.findById(t.getVehicleId()).orElse(null);
        Employee d = t.getDriverId() == null ? null : employeeRepository.findById(t.getDriverId()).orElse(null);
        return new TripView(
                t.getTripId(), t.getRouteId(),
                r == null ? null : r.getOrigin() + " → " + r.getDestination(),
                t.getVehicleId(),
                v == null ? null : v.getRegistrationNum(),
                v == null ? null : v.getVehicleType(),
                v == null ? null : v.getAcType(),
                v == null ? null : v.getCapacity(),
                t.getDriverId(),
                d == null ? null : d.getFirstName() + " " + d.getLastName(),
                t.getDepaDatetime(), t.getArrivalDatetime(), t.getBasePrice(), t.getStatus());
    }

    public List<TripView> getTrips(Long routeId, Long driverId) {
        List<Trip> trips;
        if (routeId != null) {

            trips = tripRepository.findByRouteId(routeId).stream()
                    .filter(t -> "Scheduled".equals(t.getStatus())).toList();
        } else if (driverId != null) {
            trips = tripRepository.findByDriverId(driverId);
        } else {
            trips = tripRepository.findAll();
        }
        return trips.stream().map(this::toView).toList();
    }

    public List<TripView> getActiveTrips() {
        return tripRepository.findByStatus("Scheduled").stream().map(this::toView).toList();
    }

    public List<String> getBookedSeats(Long tripId) {
        return ticketRepository.findByTripId(tripId).stream().map(Ticket::getSeatNum).toList();
    }

    public TripView createTrip(Trip trip) {
        trip.setTripId(null);
        return toView(tripRepository.save(trip));
    }

    public TripView updateTrip(Long id, Trip data) {
        Trip t = tripRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Trip not found."));
        t.setRouteId(data.getRouteId());
        t.setVehicleId(data.getVehicleId());
        t.setDriverId(data.getDriverId());
        t.setDepaDatetime(data.getDepaDatetime());
        t.setArrivalDatetime(data.getArrivalDatetime());
        t.setBasePrice(data.getBasePrice());
        t.setStatus(data.getStatus());
        return toView(tripRepository.save(t));
    }

    public TripView updateStatus(Long id, String status) {
        Trip t = tripRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Trip not found."));
        t.setStatus(status);
        return toView(tripRepository.save(t));
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}